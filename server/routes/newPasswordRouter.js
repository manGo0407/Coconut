const { Router } = require("express");
const router = new Router();
const {User} = require('../db/models');
const bcrypt = require('bcrypt');

router.post('/:token', async(req,res) => {
    const {token} = req.params;
    console.log(token);
  try {
    const user = await User.findOne({ where: {
        resetToken: token,
    }  
    })

    if (user) {
        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetToken = undefined;
        user.resetTokenExp = undefined;
        await user.save();
        res.json({ msg: "Вы успешно поменяли пароль!" });
    } else {
        res.json({err:`Что-то пошло не так, не удалоcь изменить пароль`});
      }
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
