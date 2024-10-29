const { Router } = require("express");
const bcrypt = require("bcrypt");
const mailer = require("./nodemailer");
const pfpMulter = require("../middleware/pfpMulter");
const router = new Router();

const { User } = require("../db/models");

router.post("/register", async (req, res) => {
  console.log(req.body);
  const {
    login,
    email,
    password,
    role,
    firstName,
    lastName,
    experience,
    age,
    aboutMe,
  } = req.body;

  try {
    const allUser = await User.findOne({ where: { email } });
    if (!login) {
      res.json({ error: "Введите login!" });
    }
    if (!email) {
      res.json({ error: "Введите Ваш @mail!" });
    }
    if (!password) {
      res.json({ error: "Введите пароль!" });
    }

    if (allUser) {
      res.json({ error: "Такой пользователь уже существует!" });
    } else {
      const message = {
        from: "Mailer test  <test_test_6767@mail.ru>",
        to: req.body.email,
        subject:
          "Congratulations! You have successfully registered on our site",
        text: `Поздравляем ${req.body.login}, Вы успешно зарегистрировались на нашем сайте!

        Данное письмо не требует ответа`,
      };
      mailer(message);
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        login,
        email,
        password: hash,
        role,
        firstName,
        lastName,
        experience,
        age,
        aboutMe,
        checkedByAdmin: false,
      });
      req.session.user = {
        id: user.id,
        login: user.login,
        email: user.email,
        role: user.role,
      };
      req.session.save(() => {
        res.json({
          id: user.id,
          login: user.login,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          experience: user.experience,
          age: user.age,
          aboutMe: user.aboutMe,
          isAdmin: user.isAdmin,
        });
      });
    }
  } catch (error) {
    console.log("Ошибка при регистрации User", error);
  }
});
router.post("/register/multer", pfpMulter.single("image"), async (req, res) => {
  const data = JSON.parse(req.body.rest);
  const {
    login,
    email,
    password,
    role,
    firstName,
    lastName,
    experience,
    age,
    aboutMe,
  } = data;

  try {
    const allUser = await User.findOne({ where: { email } });
    if (!login) {
      res.json({ error: "Введите login!" });
    }
    if (!email) {
      res.json({ error: "Введите Ваш @mail!" });
    }
    if (!password) {
      res.json({ error: "Введите пароль!" });
    }

    if (allUser) {
      res.json({ error: "Такой пользователь уже существует!" });
    } else {
      const message = {
        from: "Mailer test  <test_test_6767@mail.ru>",
        to: req.body.email,
        subject:
          "Congratulations! You have successfully registered on our site",
        text: `Поздравляем ${req.body.login}, Вы успешно зарегистрировались на нашем сайте!

        Данное письмо не требует ответа`,
      };
      mailer(message);
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        login,
        email,
        password: hash,
        role,
        photoUser: req.file.filename,
        firstName,
        lastName,
        experience,
        age,
        aboutMe,
        checkedByAdmin: false,
      });
      req.session.user = {
        id: user.id,
        login: user.login,
        email: user.email,
        role: user.role,
      };
      req.session.save(() => {
        res.json({
          id: user.id,
          login: user.login,
          role: user.role,
          photoUser: user.photoUser,
          firstName: user.firstName,
          lastName: user.lastName,
          experience: user.experience,
          age: user.age,
          aboutMe: user.aboutMe,
          isAdmin: user.isAdmin,
        });
      });
    }
  } catch (error) {
    console.log("Ошибка при регистрации User", error);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    if (!email) {
      res.json({ error: "Введите Ваш @mail!" });
    }
    if (!password) {
      res.json({ error: "Введите пароль!" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.json({ error: "Такой пользователь не найден! Зарегистрируйтесь!" });
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        req.session.user = {
          id: user.id,
          login: user.login,
          email: user.email,
          role: user.role,
        };
        req.session.save(() => {
          res.json({
            id: user.id,
            login: user.login,
            role: user.role,
            photoUser: user.photoUser,
            firstName: user.firstName,
            lastName: user.lastName,
            experience: user.experience,
            age: user.age,
            aboutMe: user.aboutMe,
            isAdmin: user.isAdmin,
          });
        });
      } else {
        res.json({ error: "Неверный пароль" });
      }
    }
  } catch (error) {
    console.log("Ошибка при входе на сайт", error);
  }
});

router.get("/logout", (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie("Cookie").end();
    });
  } catch (error) {
    console.log("Ошибка в logout", error);
  }
});

// glyg;ui

router.put("/changes", async (req, res) => {
  // const { login, firstName, lastName, experience, aboutMe, age } = req.body;
  const { user } = req.session;
  try {
    const userSession = await User.findByPk(user.id);
    const userUpdate = await userSession.update({
      login: req.body.login || userSession.login,
      firstName: req.body.firstName || userSession.firstName,
      lastName: req.body.lastName || userSession.lastName,
      experience: req.body.experience || userSession.experience,
      aboutMe: req.body.aboutMe || userSession.aboutMe,
      age: req.body.age || userSession.age,
      checkedByAdmin: false,
    });
    req.session.user = {
      id: userUpdate.id,
      login: userUpdate.login,
      email: userUpdate.email,
      role: userUpdate.role,
    };
    req.session.save(() => {
      res.json(userUpdate);
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/multer/changes", pfpMulter.single("image"), async (req, res) => {
  const data = JSON.parse(req.body.rest);
  const { user } = req.session;
  console.log(req.file);
  try {
    const userSession = await User.findByPk(user.id);
    const userUpdate = await userSession.update({
      login: data.login || userSession.login,
      firstName: data.firstName || userSession.firstName,
      lastName: data.lastName || userSession.lastName,
      experience: data.experience || userSession.experience,
      aboutMe: data.aboutMe || userSession.aboutMe,
      age: data.age || userSession.age,
      photoUser: req.file.filename,
      checkedByAdmin: false,
    });
    req.session.user = {
      id: userUpdate.id,
      login: userUpdate.login,
      email: userUpdate.email,
      role: userUpdate.role,
    };
    req.session.save(() => {
      res.json(userUpdate);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/checkSession", async (req, res) => {
  if (req.session.user) {
    const { id } = req?.session?.user;
    try {
      const user = await User.findByPk(id);
      res.json({
        id: user.id,
        login: user.login,
        role: user.role,
        photoUser: user.photoUser,
        firstName: user.firstName,
        lastName: user.lastName,
        experience: user.experience,
        age: user.age,
        aboutMe: user.aboutMe,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

router.put("/rate", async (req, res) => {
  const { grade, authorId } = req.body;
  console.log("grade", grade, "authorId", authorId);
  try {
    const user = await User.findOne({ where: { id: authorId } });
    if (user) {
      const newMarkQuantity = (user.markQuantity || 0) + grade;
      const increment = (user.quantity || 0) + 1;

      await User.update(
        { markQuantity: newMarkQuantity, quantity: increment },
        { where: { id: authorId } }
      );
      const rate = ((user.markQuantity || 0) / (user.quantity || 0)).toFixed(2);
      await User.update({ rating: rate }, { where: { id: authorId } });
      console.log("rate", rate);
      res.send("Рейтинг успешно обновлен.");
    } else {
      res.status(404).send("Пользователь не найден.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Произошла ошибка при обновлении рейтинга.");
  }
});

router.put("/rating", async (req, res) => {
  console.log("попал в ручку рейтинга2");
  const { authorId } = req.body;
  try {
    const user = await User.findOne({ where: { id: authorId } });
    if (user) {
      const rate = ((user.markQuantity || 0) / (user.quantity || 0)).toFixed(2);
      await User.update({ rating: rate }, { where: { id: authorId } });
      console.log("rate", rate);
      res.json({ rate, quantity: user.quantity });
    } else {
      res.status(404).send("Пользователь не найден.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Произошла ошибка при обновлении рейтинга.");
  }
});

module.exports = router;
