import React from 'react';
import { NavLink } from 'react-router-dom'
import './Logo.css';
import logo from '../../images/logo/Logo.svg';

function Logo(){
  return(
    <NavLink
      to="/"
      className={({ isActive }) => isActive? "logo_active": "logo"}
    >
      <img className="logo-image" src={logo} alt="Чёрный кружок" />
    </NavLink>
  );
}

export default Logo;
