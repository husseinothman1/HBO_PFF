const router = require("express").Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { name, phone, brand, issue } = req.body;

  db.query(
    "INSERT INTO maintenance_requests (name, phone, brand, issue) VALUES (?,?,?,?)",
    [name, phone, brand, issue],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Maintenance request submitted" });
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM maintenance_requests", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
