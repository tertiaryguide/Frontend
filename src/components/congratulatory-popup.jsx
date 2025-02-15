import React from "react";
import partyImage from "../../public/icons/party.png";

const CongratulatoryPopUp = ({ isVisible, onClose }) => {
  if (!isVisible) return null; // Don't render the modal if it's not visible

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // Ensure it appears above other elements
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "90%", // Responsive width
          maxHeight: "500px",
          position: "relative",
        }}
      >
        <img
          src={partyImage}
          alt="party"
          style={{ width: "200px", marginBottom: "20px" }}
        />
        <h2 style={{ color: "#333", margin: "0 0 10px" }}>Congratulations!</h2>
        <p style={{ color: "#555", fontSize: "16px" }}>
          Your data has successfully been saved. You will now finish your
          application 50X faster.
        </p>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default CongratulatoryPopUp;
