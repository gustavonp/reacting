import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () =>{
  const activeStyle = { color: "#F15B2A" }

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink>{" | "}
      <NavLink to="/scenarios" activeStyle={activeStyle} exact>Scenarios</NavLink>{" | "}
      <NavLink to="/categories" activeStyle={activeStyle} exact>Categories</NavLink>{" | "}
      <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
    </nav>
  );
}

export default Header;
