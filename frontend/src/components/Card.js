import React from "react";

function Card({
    courseTitle,
    slot,
    category,
    facultyName,
    attendancePercentage,
    hoursConducted,
    hoursAbsent,
    marginClasses,
    requiredClasses,
}) {
    const getPercentageColor = (percentage) =>
        percentage >= 75 ? "rgb(124, 162, 102)" : "#e57373";

    return (
        <div
            style={{
                border: "1px solid #1e3a8a",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#1e293b",
                color: "#e3f2fd",
                margin: "10px 0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
            }}
        >
            {/* Left Column */}
            <div style={{ flex: "1 1 45%", display: "flex", flexDirection: "column" }}>
                <h3 style={{ marginBottom: "10px", color: "#ccc" }}>{courseTitle}</h3>
                <p style={{ color: "rgb(181, 153, 54)", fontWeight: "bold" }}>
                    <strong>Slot:</strong> {slot}
                </p>
                <p style={{ color: getPercentageColor(attendancePercentage) }}>
                    <strong>Attendance:</strong> {attendancePercentage}%{" "}
                    {attendancePercentage >= 75 ? "👍" : "👎"}
                </p>
                <p style={{ color: "rgb(174, 94, 173)", fontWeight: "bold" }}>
                    <strong>Required Hours:</strong> {requiredClasses}
                </p>
                <p style={{ color: "rgb(182, 107, 107)", fontWeight: "bold" }}>
                    <strong>Margin Hours:</strong> {marginClasses}
                </p>
            </div>

            {/* Right Column */}
            <div
                style={{
                    flex: "1 1 45%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "right",
                    marginTop: "58px"
                }}
            >
                <p>
                    <strong>Category:</strong> {category}
                </p>
                <p>
                    <strong></strong> {facultyName}
                </p>
                <p>
                    <strong>Total Hours:</strong> {hoursConducted}
                </p>
                <p>
                    <strong>Hours Absent:</strong> {hoursAbsent}
                </p>
            </div>
        </div>
    );
}

export default Card;
