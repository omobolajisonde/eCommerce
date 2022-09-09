import React from "react";
import "./Header.scss";
import Nav from "./Nav";
import logo from "../../../assets/logo.png";
import NavPreview from "./NavPreview";
import { Link } from "react-router-dom";

const Header = ({ cartItemsQuantity }) => {
  return (
    <header className="header" id="top">
      <Link to="/" className="logo__link">
        <div className="logo">
          <img src={logo} alt="e-store logo" className="logo__logo" />
          <h1 className="logo__name">KS store</h1>
        </div>
      </Link>
      <Nav cartItemsQuantity={cartItemsQuantity} />
      {false && <NavPreview />}
    </header>
  );
};

export default Header;
