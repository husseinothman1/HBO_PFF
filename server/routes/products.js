const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET SINGLE PRODUCT
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    }
  );
});

// ADD NEW PRODUCT
router.post("/", upload.single("img"), (req, res) => {
  const { name, price } = req.body;
  const img = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO products (name, price, img) VALUES (?, ?, ?)",
    [name, price, img],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, name, price, img });
    }
  );
});

module.exports = router;
