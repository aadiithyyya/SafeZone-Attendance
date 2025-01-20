import React from "react";

function Header({ title }) {
    return (
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1 style={{ color: "#64b5f6", fontSize: "2.5rem" }}>{title}</h1>
        </header>
    );
}

export default Header;
