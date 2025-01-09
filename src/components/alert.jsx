import React from 'react'

const Alert = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <img
        src="../components/icons/party.png" // Replace with your image URL or import
        alt="Party Icon"
        style={{ width: "100px", marginBottom: "20px" }}
      />
      <h2 style={{ color: "#333", margin: "0 0 10px" }}>Congratulations!</h2>
      <p style={{ color: "#555", fontSize: "16px" }}>
        Your data has successfully been saved. You will now finish your
        application 50X faster.
      </p>
    </div>
  )
}

export default Alert