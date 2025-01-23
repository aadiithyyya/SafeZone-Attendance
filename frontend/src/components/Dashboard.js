import React, { useState } from "react";
import Header from "./Header";
import Card from "./Card";
import CircularProgressCard from "./CircularProgressCard";

import Button from "./Button";
import { fetchAttendanceData } from "../api/attendance";

function Dashboard() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const attendanceData = await fetchAttendanceData();
            setData(attendanceData);
        } catch (err) {
            setError(err.message || "Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: "#121212", minHeight: "100vh", padding: "20px" }}>
            <Header title="SRM SafeZone" />
            <h5 style={{color: "#fff", textAlign:"center"}}>Created by Aadithya 😉</h5>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
                <Button onClick={fetchData} disabled={loading} loading={loading} />
                {error && <p style={{ color: "#e57373" }}>{error}</p>}
            </div>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            {data.length > 0 ? (
    data.map((item, index) => (
        <React.Fragment key={index}>
            <Card
                courseTitle={item.courseTitle}
                slot={item.slot}
                category={item.category}
                facultyName={item.facultyName}
                attendancePercentage={item.attendancePercentage}
                hoursConducted={item.hoursConducted}
                hoursAbsent={item.hoursAbsent}
                marginClasses={item.marginClasses}
                requiredClasses={item.requiredClasses}
            />
            <CircularProgressCard
                courseTitle={item.courseTitle}
                attendancePercentage={item.attendancePercentage}
            />
        </React.Fragment>
    ))
) : (
    <p style={{ textAlign: "center", color: "#90caf9" }}>
        No data available. Please fetch attendance.
    </p>
)}

</div>

        </div>
    );
}

export default Dashboard;
