import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie, setCookie } from "../../lib/utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie("token")); // Persistent state

  const navigate = useNavigate();

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
    if (
      isAuthenticated &&
      (window.location.pathname === "/" ||
        window.location.pathname === "/register")
    ) {
      navigate("/preview");
    }
  }, [isAuthenticated, navigate]);

  const login = async (email, passKey, setIsLoading) => {
    const validateEmail = () => {
      if (!email) {
        setErrorMessage("Email is required");
        return false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage("Invalid email format");
        return false;
      }
      return true;
    };

    const validatePassword = () => {
      if (!passKey) {
        setErrorMessage("Password is required");
        return false;
      }
      return true;
    };

    setErrorMessage("");
    setIsLoading(true);

    if (validateEmail() && validatePassword()) {
      try {
        const response = await axios.post(
          "https://tg-backend-snex.onrender.com/api/applicant/login",
          { email, passKey },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data) {
          setCookie("token", response.data.token, 30);
          setCookie("userId", response.data.id, 30);
          setSuccessMessage("Login successful");
          setIsAuthenticated(true); // ✅ Update authentication state
        } else {
          setErrorMessage("Login failed.");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const register = async (email, passKey, setIsLoading) => {
    setErrorMessage("");
    setIsLoading(true);

    if (!email || !passKey) {
      setErrorMessage("Email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://tg-backend-snex.onrender.com/api/applicant/create-applicant",
        { email, passKey },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data) {
        setCookie("token", response.data.token, 30);
        setCookie("userId", response.data.id, 30);
        setSuccessMessage("Account created successfully");
        setIsAuthenticated(true);
      } else {
        setErrorMessage("Account creation failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    removeCookie("token");
    removeCookie("userId");
    setIsAuthenticated(false);
    await axios.post("https://tg-backend-snex.onrender.com/api/logout");
    navigate("/");
  };

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
