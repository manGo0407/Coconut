const { Router } = require("express");
const router = new Router();
const { Order, Tour, User } = require("../db/models");

router.post("/:id", async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  const { peoples, firstName, lastName } = req.body;
  console.log(peoples);

  try {
    let order = await Order.findOne({ where: { userId: user.id, tourId: id } });
    const tour = await Tour.findByPk(id);
    const oneUser = await User.findOne({where: {id: user.id}})
    if (!order) {
      order = await Order.create({
        userId: user.id,
        tourId: id,
        statusPay: false,
        contactId: tour.ownerId,
        statusAccept: false,
        peoplesBooked: peoples,
        statusBooked: true,
      });
      if(user) {
        oneUser.update({lastName, firstName});
      }
      console.log('order', order,'user', user);
      if (tour.remaindQuantity > 0) {
        tour.remaindQuantity -= peoples;
        let sum = Number(tour.reservedQuantity) + Number(peoples);
        tour.reservedQuantity = sum;
        await tour.save();
        const responseObj = { order, oneUser };
        res.json(responseObj);
      } else {
        res.json({
          err: `Вы можете забронировать только ${tour.remaindQuantity} мест`,
        });
      }
    } else {
      res.status(500).json({ err: "Такой заказ уже создан!" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    order.statusAccept = true;
    await order.save();
    res.json(order);
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    order.statusPay = true;
    await order.save();
    res.json(order);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Order.destroy({ where: { id } });
    res.json(id)
  } catch (error) {
    console.log(error);
  }
});

router.get("/myOrders", async (req, res) => {
  const { id } = req.session.user;
  try {
    const orders = await Order.findAll({
      where: { userId: id, statusPay: false },
      include: { model: Tour },
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
});

router.get("/paidOrders", async (req, res) => {
  const { id } = req.session.user;
  try {
    const orders = await Order.findAll({
      where: { userId: id, statusPay: true },
      include: { model: Tour },
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        userId: user.id,
        tourId: id,
        statusPay: false,
        statusBooked: true,
      },
      include: {
        model: Tour,
        attributes: ["maxPeoples"],
      },
    });
    console.log(order);
    res.json(order);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
