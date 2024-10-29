const { Router } = require("express");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = new Router();

router.post("/", async (req, res) => {
  console.log("попал в ручку оплаты");
  console.log("req.body", req.body);
  const { id, amount, email, phone } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: "USD",
      description: `Order from ${email} - ${phone}`,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });
    if (payment) {
      res.status(200).json({ status: payment.status });
    } else {
      res.status(400).send(e.message);
    }
  } catch (e) {}
});

module.exports = router;
