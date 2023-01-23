import React from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import "./index.css";
import { useToken, useAuthContext } from "./auth";
import Dropdown from 'react-bootstrap/Dropdown';
import LogoutButton from "./LogoutForm.js"


function Nav() {
  const { token, isLoggedIn } = useAuthContext();
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Ani-Reactor
          </NavLink>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <span className="navbar-toggler-icon"></span>
            </Dropdown.Toggle>

            <Dropdown.Menu>


              <div className="" id="navbarSupportedContent" aria-labelledby="dropdown">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {isLoggedIn ? (<></>) :
                    <li className="nav-item">
                      <NavLink className="nav-link text-black" aria-current="page" to="/signup">
                        Sign Up
                      </NavLink>
                    </li>
                  }
                </ul>
                <div className="navbar-end">

                  {isLoggedIn ? (
                    <>
                      <NavLink className="btn" to="/AccountDetailView">
                        View Account
                      </NavLink>
                      <NavLink className="btn" to="/AccountEditForm">Edit Profile</NavLink>
                      <NavLink className="btn" to="#">Watchlist</NavLink>
                      <NavLink className="btn" to="#">Favorites List</NavLink>
                    </>
                  ) : <></>}
                </div>
              </div>


              <div className="navbar-item mb-2">
                {isLoggedIn ? (
                  <LogoutButton />
                ) : (
                  <NavLink className="btn btn-primary ms-2 mb-2" to="/login">
                    Login
                  </NavLink>
                )}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
