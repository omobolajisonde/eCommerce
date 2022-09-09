import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
const Nav = ({cartItemsQuantity}) => {
  return (
    <nav className="navigation">
      <ul className="nav">
        <li className="nav__item nav__item--cart">
          <NavLink to="/cart" className={({isActive})=> isActive ? "nav__link nav__link--active" : "nav__link"}>
            <span className="nav__badge">Cart</span>
            <ShoppingCartIcon
              sx={{
                width: "2.5rem",
                height: "2.5rem",
                ml:"0.5rem" 
              }}
            />
            <span className="cart-badge">{cartItemsQuantity}</span>
          </NavLink>
        </li>
        <li className="nav__item nav__item--user">
          <NavLink to="/account" className={({isActive})=> isActive ? "nav__link nav__link--active" : "nav__link"}>
            <span className="nav__badge">Account</span>
            <PersonIcon
              sx={{
                width: "2.5rem",
                height: "2.5rem",
                ml:"0.5rem"
              }}
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
