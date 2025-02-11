import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../lib/utils";
import { useAuth } from "./AuthContext";
import toast, { Toaster } from 'react-hot-toast';
const Register = () => {
  const [email, setEmail] = useState("");
  const [passKey, setPassKey] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {assignToken} = useAuth()

  const handleRegister = async (e) => {
    e.preventDefault();
    const validateEmail = () => {
      if (!email) {
        setEmailError("Email is required");
        return false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError("Invalid email format");
        return false;
      } else {
        setEmailError("");
        return true;
      }
    };
    const validatePassword = () => {
      if (!passKey) {
        setPasswordError("Password is required");
        return false;
      } else {
        setPasswordError("");
        return true;
      }
    };
    console.log(passKey, email);
    setErrorMessage("");
    setIsLoading(true);
    if (validateEmail(email) && validatePassword(passKey)) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/applicant/create-applicant",
          {
            email,
            passKey,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          setCookie("token", response.data.token, 30);
          assignToken(response.data.token)
          navigate("/");
        } else {
          setErrorMessage(response.data.message || "Register failed.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
    }
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
          {emailError && (
            <p style={{ color: "red", marginBottom: "15px" }}>{emailError}</p>
          )}
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
          {passwordError && (
            <p style={{ color: "red", marginBottom: "15px" }}>
              {passwordError}
            </p>
          )}
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
        {errorMessage && (
          toast.error(errorMessage)
        )}
      </form>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Have you already activated your account? <Link to="/login">Sign in here</Link>
      </p>
    </div>
  );
};

export default Register;
