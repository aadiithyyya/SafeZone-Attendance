import React from "react";

function CircularProgressCard({
    courseTitle,
    attendancePercentage,
    requiredClasses,
    marginClasses,
}) {
    const getProgressColor = (percentage) =>
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
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
        >
            {/* Course Title */}
            <h3 style={{ marginBottom: "10px", color: "#90caf9" }}>{courseTitle}</h3>

            {/* Circular Progress Chart */}
            <div style={{ position: "relative", width: "120px", height: "120px", margin: "20px auto" }}>
                <svg width="120" height="120">
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#ccc"
                        strokeWidth="10"
                        style={{ opacity: 0.3 }}
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke={getProgressColor(attendancePercentage)}
                        strokeWidth="10"
                        strokeDasharray={`${(attendancePercentage / 100) * 314}, 314`}
                        strokeDashoffset="0"
                        transform="rotate(-90 60 60)"
                    />
                </svg>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                    }}
                >
                    <h4 style={{ margin: "0" }}>{attendancePercentage}%</h4>
                    <p style={{ fontSize: "12px", color: "#ccc" }}>Attendance</p>
                </div>
            </div>

            {/* Threshold Indicator */}
            <div style={{ margin: "10px 0", fontSize: "14px" }}>
                <span
                    style={{
                        color: attendancePercentage >= 75 ? "rgb(124, 162, 102)" : "#e57373",
                        fontWeight: "bold",
                    }}
                >
                    {attendancePercentage >= 75 ? "Safe Zone 👍" : "Critical Zone 👎"}
                </span>
            </div>

        </div>
    );
}

export default CircularProgressCard;
