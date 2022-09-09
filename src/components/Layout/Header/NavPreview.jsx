import React from "react";
import avatar from "../../../assets/naomi.jpg";
import "./NavPreview.scss";

const NavPreview = () => {
  return (
    <nav className="nav-preview">
      <div data-popup="user" className="account-preview">
        <figure className="account">
          <img src={avatar} alt="user avatar" className="account__img" />
          <figcaption className="account__desc">
            <span className="account__name">Naomi Scott</span>
            <span className="account__email">nascott@demo.com</span>
          </figcaption>
        </figure>
        <p className="account__info">
          Notification <span className="account__badge">3</span>
        </p>
        <p className="account__info">
          Cart <span className="account__badge">3</span>
        </p>
      </div>
    </nav>
  );
};

export default NavPreview;
