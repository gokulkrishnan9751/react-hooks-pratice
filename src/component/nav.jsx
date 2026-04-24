import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  function handleLogout() {
    sessionStorage.removeItem("profile");
  }
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/login" onClick={handleLogout}>
          <button className="logout-btn">Log out</button>
        </Link>
      </div>
    </nav>
  );
}
