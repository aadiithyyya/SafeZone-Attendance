export const fetchAttendanceData = async () => {
    const response = await fetch("https://safezone-attendence-checker-webapp2.onrender.com/api/attendance/fetch");
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    console.log("Frontend API Data:", data); // Log the API data
    return data.map((item) => {
        const hoursConducted = parseFloat(item.hoursConducted || 0);
        const hoursAbsent = parseFloat(item.hoursAbsent || 0);
        const attendancePercentage = parseFloat(item.attendancePercentage || 0);

        let marginCount = -1;
        let futureAbsent = hoursAbsent;
        let futureConducted = hoursConducted;

        if (attendancePercentage >= 75) {
            while ((futureConducted - futureAbsent) / futureConducted * 100 > 75) {
                marginCount++;
                futureAbsent++;
                futureConducted++;
            }
        }

        const requiredClasses =
            attendancePercentage < 75
                ? (0.75 * hoursConducted - (hoursConducted - hoursAbsent)) / 0.25
                : 0;

        return {
            ...item,
            hoursConducted, // Ensure these are passed
            hoursAbsent, // Ensure these are passed
            attendancePercentage,
            requiredClasses: requiredClasses >= 0 ? requiredClasses : 0,
            marginClasses: marginCount > 0 ? marginCount : 0,
        };
    });
};
