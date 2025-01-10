import React from 'react'
import partyImage from './icons/party.png';

const Alert = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        maxHeight:"500px",
        margin: "50px auto",
      }}
    >
      <img src={partyImage} alt="party image" style={{ width: "200px", marginBottom: "20px" }} />
      <h2 style={{ color: "#333", margin: "0 0 10px" }}>Congratulations!</h2>
      <p style={{ color: "#555", fontSize: "16px" }}>
        Your data has successfully been saved. You will now finish your
        application 50X faster.
      </p>
    </div>
  )
}

export default Alert