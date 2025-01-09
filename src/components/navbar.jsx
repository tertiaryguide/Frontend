import React from 'react';
import './css/navBar.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <a href="#" className="brand">Home</a>
          <ul className="nav-links">
            <li><a href="#" className="link">DashBoard</a></li>
            <li><a href="#" className="link">Pricing</a></li>
            <li><a href="#" className="link">FAQs</a></li>
            <li><a href="#" className="link">About</a></li>
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

export default Header;
