require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add CORS for cross-origin requests
const cron = require('node-cron');
const { loginAndFetchAttendance } = require('./app/utils/scraper'); // Playwright-based scraper

const app = express();

// Cached attendance data
let cachedAttendance = [];

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Endpoint to fetch attendance data (uses preset credentials)
app.get('/api/attendance/fetch', async (req, res) => {
    try {
        console.log('Fetching attendance data...');
        const attendanceData = await loginAndFetchAttendance(
            process.env.EMAIL,
            process.env.PASSWORD
        );
        res.status(200).json(attendanceData);
    } catch (error) {
        console.error('Error fetching attendance:', error.message);
        res.status(500).json({ error: 'Failed to fetch attendance data. Please try again.' });
    }
});

// Endpoint to get cached attendance data
app.get('/api/attendance/cached', (req, res) => {
    if (cachedAttendance.length > 0) {
        console.log('Returning cached attendance data...');
        res.status(200).json(cachedAttendance);
    } else {
        console.error('No cached attendance data available.');
        res.status(404).json({ error: 'No cached attendance data available.' });
    }
});

// Scheduled task for daily attendance update
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily attendance update...');
    try {
        cachedAttendance = await loginAndFetchAttendance(
            process.env.EMAIL,
            process.env.PASSWORD
        );
        console.log('Attendance data updated successfully.');
    } catch (error) {
        console.error('Error updating attendance data:', error.message);
    }
});

// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
