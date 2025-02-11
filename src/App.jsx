import "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login";
import Preview from "./components/preview";
import GenericInformation from "./components/genericInformation";
import EducationalBackground from "./components/EducationalBackround";
import BackgroundInfor from "./components/backgroundInfor";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoutes from "./components/private-routes";
import Register from "./components/register";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <Router>
      <Toaster/>
      <AuthProvider>
        {" "}
        <Routes>
          <Route element={<PrivateRoutes />}>
            {" "}
            <Route path="/" element={<Preview />} />
            <Route path="/background" element={<GenericInformation />} />
            <Route path="/education" element={<EducationalBackground />} />
            <Route path="/supporting" element={<BackgroundInfor />} />{" "}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
