import React from "react";

function AttendanceTable({ data }) {
    return (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                margin: "20px auto",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <thead>
                <tr style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Course Title</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Faculty Name</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Attendance %</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Hours Conducted</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Hours Absent</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Required Classes</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Margin Classes</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr
                            key={index}
                            style={{
                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                                textAlign: "center",
                            }}
                        >
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.courseTitle}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.facultyName}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.attendancePercentage}%</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.hoursConducted}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.hoursAbsent}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.requiredClasses}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.marginClasses}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default AttendanceTable;
