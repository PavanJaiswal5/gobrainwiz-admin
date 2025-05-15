import React from "react";

const Unauthorized = () => {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f9f9f9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Segoe UI, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        padding: "3rem",
        borderRadius: "10px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        maxWidth: "500px"
      }}>
        <h1 style={{ color: "#e63946", fontSize: "2.5rem", marginBottom: "1rem" }}>
          403 - Unauthorized
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          You don’t have permission to view this page.
        </p>
        <a href="/" style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "0.8rem 1.5rem",
          backgroundColor: "#1d3557",
          color: "#fff",
          borderRadius: "5px",
          textDecoration: "none",
          transition: "background 0.3s ease"
        }}
        onMouseOver={e => e.target.style.backgroundColor = "#457b9d"}
        onMouseOut={e => e.target.style.backgroundColor = "#1d3557"}
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
