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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/preview" element={<Preview />} />
            <Route path="/background" element={<PersonalInformationPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/supporting" element={<SupportingPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
