import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Nav.css";

function Nav() {
  return (
    <nav className="Nav">
      <NavLink  className="Inicio" to="/" exact> 
      <img src="https://cdn-icons-png.flaticon.com/512/188/188918.png" alt="pokebola inico" />
      </NavLink> 
      <NavLink className="Agregar" to="/add" exact>
        <h1>Agregar Pokemon</h1>
      </NavLink>
    </nav>
  );
}

export default Nav;