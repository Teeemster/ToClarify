// Header Component
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

import Icon from "@mdi/react";
import { mdiHomeVariantOutline } from "@mdi/js";

const Header = () => {
  const loggedIn = Auth.loggedIn();
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || {};
  const { pathname } = useLocation();

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1 className="fs-5 fw-bold m-3">
            <Link to="/">
            {loggedIn ? "Welcome to Clarify" : "To Clarify"}
            {loggedIn && !loading && `, ${me.firstName}!`}
            </Link>
          </h1>
        </div>
        <div className="col d-flex justify-content-end align-items-center">
          <nav className="nav fw-bold d-flex justify-content-end ">
            {loggedIn ? (
              <>
                <div className="nav-item d-flex align-items-center mx-2">
                  <a href="/" onClick={logout} className="my-1">
                    Logout
                  </a>
                </div>
                <div className="nav-item d-flex align-items-center mx-2">
                  <Link
                    to="/"
                    className={pathname === "/" ? "my-1 active" : "my-1"}
                  >
                    <Icon path={mdiHomeVariantOutline} size={1.5} />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="nav-item d-flex align-items-center mx-3">
                  <Link
                    to="/login"
                    className={pathname === "/login" ? "my-1 active" : "my-1"}
                  >
                    Login
                  </Link>
                </div>
                <div className="nav-item d-flex align-items-center mx-3">
                  <Link
                    to="/signup"
                    className={pathname === "/signup" ? "my-1 active" : "my-1"}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
