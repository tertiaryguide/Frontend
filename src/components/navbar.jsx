import { Link } from 'react-router-dom';
import './css/navBar.css';

const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <img src="public/Logomark.png" alt='logo' />
          <ul className="nav-links">
            <li><Link to="/background" className="link">Background</Link></li>
            <li><Link to="/education" className="link">Aspiration</Link></li>
            <li><Link to="/support" className="link">Support</Link></li>
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
