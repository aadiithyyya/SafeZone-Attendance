const express = require('express');
const { fetchAttendance, getCachedAttendance } = require('../controllers/attendanceController');
const router = express.Router();

// Route to fetch updated attendance
router.post('/fetch', fetchAttendance);

// Route to get cached attendance
router.get('/cache', getCachedAttendance);

module.exports = router;
