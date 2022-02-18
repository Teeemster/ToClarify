//Home Page
import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

const Home = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main>
      <p>You are logged in.</p>
    </main>
  );
};

export default Home;
