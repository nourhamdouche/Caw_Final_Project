import React from 'react';
import { FaWallet } from 'react-icons/fa'; 
import { NavLink } from 'react-router-dom'; // Import NavLink
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="app-title">
        <FaWallet className="wallet-icon" /> 
        Masroofy
      </h1>
      <nav className="nav-menu">
        <NavLink 
          to="/home" 
          className="nav-item" 
          activeClassName="active"
        >
          Home
        </NavLink>
        <NavLink 
          to="/add" 
          className="nav-item" 
          activeClassName="active"
        >
          Add Transaction
        </NavLink>
        <NavLink 
          to="/list" 
          className="nav-item" 
          activeClassName="active"
        >
          Transactions
        </NavLink>
        <NavLink 
          to="/reports" 
          className="nav-item" 
          activeClassName="active"
        >
          Reports
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
