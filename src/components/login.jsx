import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/applicants/account", {
        email,
        passcode,
      });

      if (response.data.success) {
        // Save the user's ID in a cookie
        document.cookie = `userID=${response.data.userId}; path=/; secure; samesite=strict;`;
        console.log("Login successful:", response.data);

        navigate("/background");
      } else {
        setErrorMessage(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", height:"100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <form onSubmit={handleLogin} style={{ backgroundColor: "white",width: "400px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="passcode" style={{ display: "block", marginBottom: "5px" }}>
            Passcode
          </label>
          <input
            type="password"
            id="passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red", marginBottom: "15px" }}>{errorMessage}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
