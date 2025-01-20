const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const cookiesPath = path.join(__dirname, 'session_cookies.json');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loginAndFetchAttendance = async (email, password) => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();

    // Load cookies if available
    if (fs.existsSync(cookiesPath)) {
        console.log('Loading cookies...');
        const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf8'));
        await context.addCookies(cookies);
    }

    const page = await context.newPage();

    try {
        console.log('Navigating to academia page...');
        await page.goto('https://academia.srmist.edu.in', { waitUntil: 'networkidle' });

        // Check if already signed in
        if (await page.url().includes('#WELCOME')) {
            console.log('Already signed in. Navigating to Attendance page...');
        } else {
            console.log('Not signed in. Proceeding with login...');
            
            // Step 1: Login using email
            const emailFrame = await page.frame({ url: /signin/ });
            if (!emailFrame) throw new Error('Email iframe not found.');

            console.log('Switched to email iframe:', emailFrame.url());
            await emailFrame.fill('#login_id', email);
            await emailFrame.click('#nextbtn');

            console.log('Waiting for password iframe...');
            await delay(3000);

            // Step 2: Enter password
            const passwordFrame = await page.frame({ url: /signin/ });
            if (!passwordFrame) throw new Error('Password iframe not found.');

            console.log('Switched to password iframe:', passwordFrame.url());
            await passwordFrame.fill('#password', password);
            await passwordFrame.click('#nextbtn');

            console.log('Waiting for navigation after login...');
            await page.waitForNavigation({ waitUntil: 'networkidle' });

            // Save cookies for reuse
            console.log('Saving session cookies...');
            const cookies = await context.cookies();
            fs.writeFileSync(cookiesPath, JSON.stringify(cookies));
        }

        console.log('Checking for 3-dotted menu...');
        if (await page.isVisible('.fa.fa-ellipsis-v')) {
            console.log('Expanding 3-dotted menu...');
            await page.click('.fa.fa-ellipsis-v');
            await delay(1000);
        }

        console.log('Navigating to Attendance page...');
        await page.click('a#tab_My_Time_Table_Attendance');
        await page.click('a#My_Attendance');

        console.log('Waiting for attendance data to load...');
        await page.waitForSelector('table[bgcolor="#FAFAD2"]', { state: 'visible', timeout: 20000 });

        console.log('Extracting attendance data...');
        const attendanceStats = await page.$$eval('table[bgcolor="#FAFAD2"] tbody tr', (rows) => {
            return Array.from(rows)
                .slice(1) // Skip header row
                .map((row) => ({
                    courseCode: row.cells[0]?.textContent?.trim() || 'N/A',
                    courseTitle: row.cells[1]?.textContent?.trim() || 'N/A',
                    category: row.cells[2]?.textContent?.trim() || 'N/A',
                    facultyName: row.cells[3]?.textContent?.trim() || 'N/A',
                    slot: row.cells[4]?.textContent?.trim() || 'N/A',
                    hoursConducted: parseFloat(row.cells[5]?.textContent?.trim()) || 0,
                    hoursAbsent: parseFloat(row.cells[6]?.textContent?.trim()) || 0,
                    attendancePercentage: parseFloat(row.cells[7]?.textContent?.trim()) || 0,
                    universityPracticalDetails: row.cells[8]?.textContent?.trim() || 'N/A',
                }));
        });
        

        console.log('Attendance Data:', attendanceStats);
        return attendanceStats;
    } catch (error) {
        console.error('Error:', error.message);
        await page.screenshot({ path: 'error_screenshot.png', fullPage: true });
        throw new Error('Failed to retrieve attendance data.');
    } finally {
        console.log('Closing browser...');
        await browser.close();
    }
};

module.exports = { loginAndFetchAttendance };
