const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

router.get("/discussions", async (req, res) => {
    try {
        const snapshot = await db.collection("community").get();
        const discussions = snapshot.docs.map((doc) => {
            const createdAt = doc.data().createdAt ? doc.data().createdAt.toDate().toLocaleString() : "Unknown";
            return {
                id: doc.id,
                event: "Community Discussion",
                date: createdAt,
                posts: doc.data().posts || [],
            };
        });
        res.json(discussions);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

module.exports = router;