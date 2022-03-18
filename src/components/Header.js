import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [logado, setLogado] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  });
  const logout = () => {
    localStorage.removeItem("token");
    setLogado(false);
     window.location.reload();
  };
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MyMoney
        </Link>
        {logado && (
          <ul className="navbarmav mr-auto">
            <li to="/" className="nav-item " style={{ listStyleType: "none" }}>
              <button
                type="button"
                onClick={logout}
                className=" btn btn-danger"
              >
                Sair
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
