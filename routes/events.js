const express = require('express');
const router = express.Router();
const db = require("../config/firebase");

const parseDate = (dateStr) => {
    const [month, day, year] = dateStr.split(" ");
    const monthMap = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    };
    return new Date(`${year}-${(monthMap[month] + 1).toString().padStart(2, "0")}-${day.padStart(2, "0")}`);
};

router.get("/all", async (req, res) => {
    try {
        const snapshot = await db.collection("events").get();
        const events = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        const now = new Date();
        const filteredEvents = events.filter((event) => parseDate(event.date) >= now);
        res.json(filteredEvents);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/trending", async (req, res) => {
    try {
        const snapshot = await db.collection("events").where("trending" , "==", true).get();
        const trendingEvents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const now = new Date();
        const filteredEvents = trendingEvents.filter((event) => parseDate(event.date) >= now);
        res.json(filteredEvents);
    } catch (err) {
        res.status(500).json({
            error: "Internal serer error",
        });
    }
});

router.get("/created/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const snapshot = await db.collection("events").where("creator", "==", uid).get();
        const allCreatedEvents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const now = new Date();
        const pastEvents = allCreatedEvents.filter((event) => parseDate(event.date) < now);
        console.log("All events are", allCreatedEvents);
        res.json({
            createdCount: allCreatedEvents.length,
            eventHistory: pastEvents.length,
            createdEvents: allCreatedEvents,
            pastEvents: pastEvents,
        });
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/registered/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const registrationSnapshot = await db.collection("registrations").where("userId", "==", uid).get();
        const eventIds = registrationSnapshot.docs.map((doc) => doc.data().eventId);
        if (eventIds.length === 0) return res.json({ events: [] });
        const eventSnapshot = await db.collection("events").get();
        const allEvents = eventSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const userEvents = allEvents.filter((event) => eventIds.includes(event.id));
        const now = new Date();
        const filteredEvs = userEvents.filter((event) => parseDate(event.date) < now);
        console.log("Filtered Evs are", filteredEvs);
        res.json({ events: filteredEvs });
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/by-category/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const snapshot = await db.collection("events").where("category", "==", category).get();
        const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.json(events);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/:eventId", async (req, res) => {
    try {
        const { eventId } = req.params;
        const eventDoc = await db.collection('events').doc(eventId).get();
        if (!eventDoc.exists) {
            const tentativeEventDoc = await db.collection('tentativeEvents').doc(eventId).get();
            if(!tentativeEventDoc.exists) {
                return res.status(404).json({
                    error: "Event not found",
                });
            }
            const eventData = tentativeEventDoc.data();
            return res.json(eventData);
        }
        const eventData = eventDoc.data();
        res.json(eventData);
    } catch (err) {
        console.error('Error in getting event by id: ', err);
        res.status(500).json({
            error: "failed to get event by id",
        });
    }
});

module.exports = router;