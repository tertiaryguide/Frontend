import { Link } from "react-router-dom";
import "./css/navBar.css";

const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="generic">
            <img src="public/Logomark.png" alt="logo" />
            <span style={{color: 'white'}}>
              <h1>Generic Form</h1>
              <h6 className="head6">Save Your Data to Minimize Repetition</h6>
            </span>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/background" className="link">
                Background
              </Link>
            </li>
            <li>
              <Link to="/education" className="link">
                Aspiration
              </Link>
            </li>
            <li>
              <Link to="/support" className="link">
                Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
