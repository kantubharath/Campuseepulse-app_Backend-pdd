const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

router.get("/counts", async (req, res) => {
  try {
    const categories = [
      "Academic & Learning", "Sports & Fitness", "Arts & Culture",
      "Technology", "Career & Development", "Social & Networking",
      "Volunteering", "Clubs & Organizations",
    ];
    const counts = {};
    for (const category of categories) {
      const snapshot = await db.collection("events").where("category", "==", category).get();
      counts[category] = snapshot.size;
    }
    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;