const express = require("express");
const router = express.Router();
const db = require('../config/firebase');

router.get("/unread/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const snapshot = await db.collection("notifications")
            .where("userId", "==", uid)
            .where("read", "==", false)
            .get();
        const unreadCount = snapshot.size;
        res.json({ count: unreadCount });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

router.get("/all/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const snapshot = await db.collection("notifications").where("userId", "==", uid).get();
        const notifications = snapshot.docs.map((doc) => {
            const timestamp = doc.data().timestamp ? doc.data().timestamp.toDate() : "";
            if (!timestamp) return "Unknown time";
            const timeAgo = (() => {
                const now = new Date();
                const diffSeconds = Math.floor((now - timestamp) / 1000);
                const minutes = Math.floor(diffSeconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);
                if (days > 1) return `${days} days ago`;
                if (days === 1) return `Yesterday`;
                if (hours >= 1) return `${hours} hours ago`;
                if (minutes >= 1) return `${minutes} minutes ago`;
                return "Just now";
            })();
            return { id: doc.id, ...doc.data(), time: timeAgo };
        });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

module.exports = router;
