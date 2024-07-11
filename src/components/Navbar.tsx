import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>Credential Manager</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-credential">Add Credential</Link>
        <Link to="/view-credentials">View Credentials</Link>
      </div>
    </nav>
  );
};

export default Navbar;
