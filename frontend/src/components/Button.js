import React from "react";

function Button({ onClick, disabled, loading }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#1e3a8a",
                color: "#e3f2fd",
                border: "none",
                borderRadius: "5px",
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "background-color 0.3s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
        >
            {loading ? "Loading..." : "Fetch Attendance"}
        </button>
    );
}

export default Button;
