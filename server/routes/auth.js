const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO admins (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Admin created successfully" });
    }
  );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE username = ?",
    [username],
    async (err, result) => {
      if (!result.length)
        return res.status(401).json({ message: "Admin not found" });

      const valid = await bcrypt.compare(password, result[0].password);
      if (!valid)
        return res.status(401).json({ message: "Wrong password" });

      const token = jwt.sign(
        { id: result[0].id },
        process.env.JWT_SECRET
      );

      res.json({ token });
    }
  );
});

module.exports = router;
