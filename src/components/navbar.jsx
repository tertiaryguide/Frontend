import { Link } from 'react-router-dom';
import './css/navBar.css';

const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="./genericInformation.jsx" className="brand">Home</Link>
          <ul className="nav-links">
            <li><Link to="#" className="link">DashBoard</Link></li>
            <li><Link to="#" className="link">Pricing</Link></li>
            <li><Link to="#" className="link">FAQs</Link></li>
            <li><Link to="#" className="link">About</Link></li>
          </ul>
          <div className="auth-buttons">
            <button className="btn btn-outline">Login</button>
            <button className="btn btn-primary">Sign-up</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
