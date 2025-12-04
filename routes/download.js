const express = require('express');
const router = express.Router();
const db = require('../config/firebase');
const PDFDocument = require('pdfkit');

router.get('/download-certificate/:userId/:eventId', async (req, res) => {
    const { userId, eventId } = req.params;

    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        const userData = userDoc.data();
        const fullName = userData.fullName || 'Unknown User';

        let eventDoc = await db.collection('events').doc(eventId).get();
        let eventData;
        if (!eventDoc.exists) {
            const tentativeEventDoc = await db.collection('tentativeEvents').doc(eventId).get();
            if (!tentativeEventDoc.exists) {
                return res.status(404).json({
                    error: "Event not found",
                });
            }
            eventData = tentativeEventDoc.data();
        } else {
            eventData = eventDoc.data();
        }

        const eventName = eventData.title || 'Unknown Event';
        const eventDate = eventData.date ? eventData.date : 'Unknown Date';

        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');
        res.setHeader('Content-Type', 'application/pdf');

        doc.pipe(res);
        doc.fontSize(25).text("Certification of Participation", { align: 'center' });
        doc.moveDown();
        doc.fontSize(18).text('This is to certify that', { align: 'center' });
        doc.moveDown();
        doc.fontSize(22).text(fullName, { align: 'center', bold: true });
        doc.moveDown();
        doc.fontSize(18).text(`has participated in the event`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(22).text(eventName, { align: 'center', bold: true });
        doc.moveDown();
        doc.fontSize(18).text('event held on', { align: 'center' });
        doc.moveDown();
        doc.fontSize(22).text(`${eventDate}`, { align: 'center', bold: true });
        doc.moveDown(2);
        doc.fontSize(14).text('Issued by Campus Pulse', { align: 'center' });
        doc.end();

    } catch (err) {
        console.error('Error in generating certificate: ', err);
        res.status(500).json({
            error: "failed to generate certificate",
        });
    }
});

module.exports = router;