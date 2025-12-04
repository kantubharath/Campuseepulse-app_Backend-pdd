const express = require('express');
const router = express.Router();
const db = require("../config/firebase");

router.post("/record", async (req, res) => {
    console.log("Payment is being made");    
    try {
        const { userId, eventId, utrNumber, amount, status } = req.body;
        console.log("REquest body is", req.body);
        if (!userId || !eventId || !utrNumber || (amount !== 0 && !amount)) {
            console.log("Something is missing");
            return res.status(400).json({
                error: "Missing required fields",
            });
        }

        const paymentData = {
            userId,
            eventId,
            utrNumber,
            amount: parseFloat(amount),
            status,
            timestamp: new Date(),
        };

        await db.collection("payments").add(paymentData);
        res.status(201).json({
            message: "Payment added sucesfully",
            ...paymentData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/check/:userId/:eventId", async (req, res) => {
    try {
        const { userId, eventId } = req.params;
        const snapshot = await db.collection('payments')
            .where("userId", "==", userId)
            .where("eventId", '==', eventId)
            .get();
        const hasPayment = !snapshot.empty;
        res.json({ hasPayment });
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

module.exports = router;