//Header Component
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

import Icon from "@mdi/react";
import { mdiHomeVariantOutline } from "@mdi/js";

// TODO have a placeholder for name?
const Header = () => {
  const loggedIn = Auth.loggedIn();
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || {};

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      <div>
        <h1>
          Welcome To Clarify
          {(loggedIn && !loading) ? `, ${me.firstName} ${me.lastName}!` : "!"}
        </h1>
      </div>
      <nav>
        {loggedIn ? (
          <a href="/" onClick={logout}>
            Logout
          </a>
        ) : (
          <>
            <Link to="/signup" className="">
              Sign Up
            </Link>
            <Link to="/login" className="">
              Login
            </Link>
          </>
        )}
        <Link to="/" className="">
          <span>
            <Icon path={mdiHomeVariantOutline} size={2} />
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
