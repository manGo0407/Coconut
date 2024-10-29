const { Router } = require('express');
const router = new Router();
const { Tour, User } = require("../db/models");
const multer = require('../middleware/multer');

router.get('/', async (req, res) => {
  try {
    const allTours = await Tour.findAll({ include: { model: User } });
    res.json(allTours);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/multer/:id', multer.single('image'), async (req, res) => {
  const data = JSON.parse(req.body.rest);
  const {
    name,
    price,
    description,
    duration,
    location,
    startOfTheTour,
    endOfTheTour,
    maxPeoples,
  } = data;
  const { id } = req.params;
  const { user } = req.session;
  console.log(req.session);
  // console.log(req.body,'----->req.body', id, '----->id');
  try {
    const oneTour = await Tour.findByPk(id);
    const editTour = await oneTour.update({
      name,
      price,
      tourPhoto: req.file.filename,
      description,
      duration,
      maxPeoples,
      startOfTheTour,
      endOfTheTour,
      location,
      ownerId: user.id,
    });
    res.json(editTour);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  const {
    name,
    price,
    description,
    duration,
    location,
    startOfTheTour,
    endOfTheTour,
    maxPeoples,
    tourPhoto,
  } = req.body;
  const { id } = req.params;
  const { user } = req.session;
  try {
    const oneTour = await Tour.findByPk(id);
    const editTour = await oneTour.update({
      name,
      price,
      tourPhoto,
      description,
      duration,
      maxPeoples,
      startOfTheTour,
      endOfTheTour,
      location,
      ownerId: user.id,
    });
    res.json(editTour);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findByPk(id);
    tour.adminAproved = true;
    await tour.save();
    res.json(tour);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const tour = await Tour.destroy({ where: { id } });
    console.log(tour);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/new/multer', multer.single('image'), async (req, res) => {
  const coords = JSON.parse(req.body.coords);
  const data = JSON.parse(req.body.rest);
  console.log(coords);
  const {
    title,
    description,
    location,
    startOfTheTour,
    endOfTheTour,
    price,
    limit,
    gatherTime,
  } = data;

  const startTourDate = Number(
    new Date(startOfTheTour).toString().slice(8, 10)
  );
  const endTourDate = Number(new Date(endOfTheTour).toString().slice(8, 10));
  console.log(startTourDate, endTourDate);
  const duration = endTourDate - startTourDate;
  console.log(duration);

  const { id } = req.session.user;
  try {
    if (!title) {
      res.json({ error: 'Пожалуйста, напишите название тура!' });
    } else if (!description) {
      res.json({ error: 'Пожалуйста, опишите тур!' });
    } else if (!location) {
      res.json({ error: 'Пожалуйста, напишите локацию тура!' });
    } else if (!startOfTheTour) {
      res.json({ error: 'Пожалуйста, укажите дату начала тура!' });
    } else if (!endOfTheTour) {
      res.json({ error: 'Пожалуйста, укажите дату окончания тура!' });
    } else if (!price) {
      res.json({ error: 'Пожалуйста, укажите стоимость тура на 1 чел' });
    } else if (!limit) {
      res.json({
        error: 'Пожалуйста, напишите на какое кол-во человек тур рассчитан!',
      });

    } else if (limit < 2) {
      res.json({ error: 'Кол-во человек в туре не может быть меньше двух' });

    } else {
      const check = await Tour.findOne({ where: { name: title } });
      if (!check) {
        const newTour = await Tour.create({
          ownerId: id,
          name: title,
          price,
          tourPhoto: req.file.filename,
          location,
          startOfTheTour,
          endOfTheTour,
          duration,
          maxPeoples: limit,
          description,
          longitude: coords[0],
          latitude: coords[1],
          remaindQuantity: limit,
          reservedQuantity: 0,
          gatherTime,
        });
        res.json(newTour);
      } else {
        console.log('popali v error');
        res.json({ error: 'Тур с таким названием уже существует!' });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/new', async (req, res) => {
  console.log(req.body);
  const { coords } = req.body;
  const {
    title,
    description,
    location,
    startOfTheTour,
    endOfTheTour,
    price,
    duration,
    limit,
  } = req.body.payload;

  const { id } = req.session.user;
  try {
    if (!title) {
      res.json({ error: 'Пожалуйста, напишите название тура!' });
    } else if (!description) {
      res.json({ error: 'Пожалуйста, опишите тур!' });
    } else if (!location) {
      res.json({ error: 'Пожалуйста, напишите локацию тура!' });
    } else if (!startOfTheTour) {
      res.json({ error: 'Пожалуйста, укажите дату начала тура!' });
    } else if (!endOfTheTour) {
      res.json({ error: 'Пожалуйста, укажите дату окончания тура!' });
    } else if (!price) {
      res.json({ error: 'Пожалуйста, укажите стоимость тура на 1 чел' });
    } else if (!duration) {
      res.json({ error: 'Пожалуйста, укажите длительность тура в днях!' });
    } else if (!limit) {
      res.json({
        error: 'Пожалуйста, напишите на какое кол-во человек тур рассчитан!',
      });
    } else if (limit < 2) {
      res.json({ error: 'Кол-во человек в туре не может быть меньше двух' });
    } else {
      const check = await Tour.findOne({ where: { name: title } });
      if (!check) {
        const newTour = await Tour.create({
          ownerId: id,
          name: title,
          price,
          location,
          startOfTheTour,
          endOfTheTour,
          maxPeoples: limit,
          duration,
          description,
          longitude: coords[0],
          latitude: coords[1],
          remaindQuantity: 0,
        });
        res.json(newTour);
      } else {
        console.log('popali v error');
        res.json({ error: 'Тур с таким названием уже существует!' });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  console.log('попал в параметризированный ГЕТ====>');
  const { id } = req.params;
  console.log('id v etoi ruchke', id);
  try {
    const oneTour = await Tour.findByPk(id);
    res.json(oneTour);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/ownerId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findOne({
      where: { id },
    });
    const author = await User.findOne({
      where: { id: tour.ownerId },
    });
    res.json(author);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
