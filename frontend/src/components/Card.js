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
                padding: "20px",
                backgroundColor: "#1e293b",
                color: "#e3f2fd",
                margin: "20px 0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                alignItems: "center",
            }}
        >
            <div>
                <h3 style={{ color: "#90caf9", marginBottom: "10px" }}>{courseTitle}</h3>
                <p style={{ color: "rgb(181, 153, 54)", fontWeight: "bold" }}>
                    <strong>Slot:</strong> {slot}
                </p>
                <p style={{ color: getPercentageColor(attendancePercentage) }}>
                    <strong>Attendance:</strong> {attendancePercentage}%
                </p>
                <p style={{ color: "rgb(174, 94, 173)", fontWeight: "bold" }}>
                    <strong>Required Hours:</strong> {requiredClasses}
                </p>
                <p style={{ color: "rgb(182, 107, 107)", fontWeight: "bold" }}>
                    <strong>Margin Hours:</strong> {marginClasses}
                </p>
            </div>
            <div style={{ textAlign: "right" }}>
                <div style={{ marginBottom: "10px" }}>
                    <h4 style={{ color: "#4fc3f7" }}>{category}</h4>
                    <p style={{ fontStyle: "italic" }}>{facultyName}</p>
                </div>
                <div>
                    <p>
                        <strong>Total Hours:</strong> {hoursConducted}
                    </p>
                    <p>
                        <strong>Hours Absent:</strong> {hoursAbsent}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;
