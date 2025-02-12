import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
const Register = () => {
  const [email, setEmail] = useState("");
  const [passKey, setPassKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {register} = useAuth()

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(email, passKey, setIsLoading)
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          backgroundColor: "white",
          width: "400px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Activate Account</h2>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="passKey"
            style={{ display: "block", marginBottom: "5px" }}
          >
            PassKey
          </label>
          <input
            type="password"
            id="passKey"
            value={passKey}
            onChange={(e) => setPassKey(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

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
          {isLoading ? "Creating account..." : "Register"}
        </button>
      </form>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Have you already activated your account? <Link to="/login">Sign in here</Link>
      </p>
    </div>
  );
};

export default Register;
