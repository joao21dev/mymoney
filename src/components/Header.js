import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="headerbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MyMoney
        </Link>
      </div>
    </header>
  );
};

export default Header;
