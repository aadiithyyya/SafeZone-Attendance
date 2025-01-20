const { loginAndFetchAttendance } = require('../utils/scraper');

let cachedAttendance = []; // Cache attendance data

// Fetch attendance (manual update)
const fetchAttendance = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const attendanceData = await loginAndFetchAttendance(email, password);
        cachedAttendance = attendanceData; // Update cached data
        res.status(200).json({ updated: true, attendance: attendanceData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get cached attendance
const getCachedAttendance = (req, res) => {
    if (cachedAttendance.length > 0) {
        return res.status(200).json({ updated: false, attendance: cachedAttendance });
    }
    res.status(404).json({ error: 'No attendance data available. Please fetch it first.' });
};

module.exports = { fetchAttendance, getCachedAttendance };
