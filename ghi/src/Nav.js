import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
import { useToken } from "./auth";


function Nav() {
  const [token] = useToken();

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Ani-Reactor
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={token ? "d-none" : "nav-link"} to="login/">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" aria-current="page" to="/top100/">
                  Top 100
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" aria-current="page" to="Search/">
                  Search
                </NavLink>
              </li>
              <div className="dropdown" aria-current="page">
                <button
                  className="btn btn-outline-light dropdown-toggle mr-1"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-current="page"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Favorites
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link dropdown-item"
                      to="/favorites/"
                      id="dropdown"
                    >
                      View Favorites
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="favorites/new"
                      id="dropdown"
                    >
                      Add a Favorite
                    </NavLink>
                  </li>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle mr-1"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Watchlist
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link dropdown-item"
                      to="/watchlist/"
                      id="dropdown"
                    >
                      View Your Watchlist
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/watchlist/new"
                      id="dropdown"
                    >
                      Add to Your Watchlist
                    </NavLink>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
