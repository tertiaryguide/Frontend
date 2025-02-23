import "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login";
import "./App.css";
import PrivateRoutes from "./components/private-routes";
import { Toaster } from "react-hot-toast";
import Preview from "./pages/preview";
import PersonalInformationPage from "./pages/persoalInformation";
import EducationPage from "./pages/education";
import SupportingPage from "./pages/supporting";
import Register from "./pages/register";
import { AuthProvider } from "./contexts/AuthContext";
import FileUpload from "./pages/file-upload";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/preview" element={<Preview />} />
            <Route path="/personal-info" element={<PersonalInformationPage />} />
            <Route path="/academic-info" element={<EducationPage />} />
            <Route path="/guardian-info" element={<SupportingPage />} />
            <Route path="/upload-documents" element={<FileUpload />} />

          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
