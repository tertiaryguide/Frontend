import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie, setCookie } from "../../lib/utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Retrieve token from cookies on app load
  useEffect(() => {
    const storedToken = getCookie("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle error messages
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }, [errorMessage]);

  // Handle success messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }, [successMessage]);

  // Navigate after successful login
  useEffect(() => {
    // Redirect to /preview only if navigating from /login
    if (isLoggedIn && window.location.pathname === "/login") {
      navigate("/preview");
    }
  }, [isLoggedIn, navigate]);

  const login = async (email, passKey, setIsLoading) => {
    const validateEmail = () => {
      if (!email) {
        setErrorMessage("Email is required");
        return false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage("Invalid email format");
        return false;
      } else {
        setErrorMessage("");
        return true;
      }
    };

    const validatePassword = () => {
      if (!passKey) {
        setErrorMessage("Password is required");
        return false;
      } else {
        setErrorMessage("");
        return true;
      }
    };

    setErrorMessage("");
    setIsLoading(true);

    if (validateEmail(email) && validatePassword(passKey)) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/applicant/login",
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

        console.log("Login response:", response.data);

        if (response.data) {
          setCookie("token", response.data.token, 30); // Store token in cookie
          setCookie("userId", response.data.id, 30) // Store userId in cookie
          setSuccessMessage("Login successful");
          setIsLoggedIn(true);
        } else {
          setErrorMessage("Login failed.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  const register = async (email, passKey, setIsLoading) => {
    const validateEmail = () => {
      if (!email) {
        setErrorMessage("Email is required");
        return false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage("Invalid email format");
        return false;
      } else {
        setErrorMessage("");
        return true;
      }
    };

    const validatePassword = () => {
      if (!passKey) {
        setErrorMessage("Password is required");
        return false;
      } else {
        setErrorMessage("");
        return true;
      }
    };

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

        console.log("Activation response:", response.data);

        if (response.data) {
          setCookie("token", response.data.token, 30); // Store token in cookie
          setCookie("userId", response.data.id, 30) // Store userId in cookie
          setSuccessMessage("Account activation successful");
          setIsLoggedIn(true);
        } else {
          setErrorMessage("Account activation failed.");
        }
      } catch (error) {
        console.error("Error activating account in:", error);
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  const logout = () => {
    setIsLoggedIn(false);
    removeCookie("token"); // Remove token from cookie
    navigate("/login");
  };

  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie("token"));

  useEffect(() => {
    const storedToken = getCookie("token");
    setIsAuthenticated(!!storedToken);
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
