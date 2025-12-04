const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

router.get("/profile/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const userDoc = await db.collection("users").doc(uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        const data = userDoc.data();
        res.json({
            fullName: data.fullName || "Unknown User",
            university: data.collegeName || "Savitha",
            major: data.yearsOfStudy || "Not Specified",
            profileImage: data.collegeId
        });
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

module.exports = router;