const { Router } = require('express');
const { Tour, Order, User } = require('../db/models');
const router = new Router();

router.get('/myActiveTours', async (req, res) => {
  const { id } = req.session.user;
  try {
    const tours = await Tour.findAll({ where: { ownerId: id } });
    res.json(tours);
  } catch (error) {
    console.log(error);
  }
});

router.get('/all', async (req, res) => {
  console.log(req.session);
  const { id } = req?.session.user;
  try {
    const applications = await Order.findAll({
      include: [
        {
          model: Tour,
        },
        {
          model: User,
          as: 'user',
          attributes: ["login", 'id', 'firstName', 'lastName']
        },
        {
          model: User,
          as: 'contact',
          attributes: ["login", 'id']
        },
      ],
    });
    res.json(applications);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
