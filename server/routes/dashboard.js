const router = require("express").Router();
const db = require("../db");

router.get("/stats", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS totalOrders FROM orders", (e, r1) => {
    stats.totalOrders = r1[0].totalOrders;

    db.query("SELECT COUNT(*) AS totalProducts FROM products", (e, r2) => {
      stats.totalProducts = r2[0].totalProducts;

      db.query("SELECT COUNT(*) AS totalMaintenance FROM maintenance_requests", (e, r3) => {
        stats.totalMaintenance = r3[0].totalMaintenance;

        db.query(
          "SELECT SUM(price) AS totalSales FROM products",
          (e, r4) => {
            stats.totalSales = r4[0].totalSales || 0;
            res.json(stats);
          }
        );
      });
    });
  });
});

module.exports = router;
router.get("/latest-orders", (req, res) => {
  db.query(
    "SELECT * FROM orders ORDER BY created_at DESC LIMIT 5",
    (err, result) => res.json(result)
  );
});
router.get("/latest-maintenance", (req, res) => {
  db.query(
    "SELECT * FROM maintenance_requests ORDER BY created_at DESC LIMIT 5",
    (err, result) => res.json(result)
  );
});
