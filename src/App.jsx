import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login";
import "./App.css";
import PrivateRoutes from "./components/private-routes";
import { Toaster } from "react-hot-toast";
import Preview from "./pages/preview";
import Register from "./pages/register";
import { AuthProvider } from "./contexts/AuthContext";
import AcademicInformationPage from "./pages/academic-info";
import GuardianInformationPage from "./pages/guardian-info";
import DocumentUpload from "./pages/upload-document";
import PersonalInformationPage from "./pages/personal-info";
import NotFound from "./pages/not-found"; // Import the NotFound component
import TestPage from "./pages/test";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/preview" element={<Preview />} />
            <Route path="/personal-info" element={<PersonalInformationPage />} />
            <Route path="/academic-info" element={<AcademicInformationPage />} />
            <Route path="/guardian-info" element={<GuardianInformationPage />} />
            <Route path="/upload-documents" element={<DocumentUpload />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* 404 route for any unmatched paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;