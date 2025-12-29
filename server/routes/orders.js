const router = require("express").Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { customer_name, phone, payment_method } = req.body;

  db.query(
    "INSERT INTO orders (customer_name, phone, payment_method) VALUES (?,?,?)",
    [customer_name, phone, payment_method],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Order placed successfully" });
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
