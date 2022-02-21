//Home Page
import React from "react";
import Welcome from "../components/Welcome";
import ProjectList from "../components/ProjectList";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECT } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const loggedIn = Auth.loggedIn();

  const project = data?.project || [];

  if (!Auth.loggedIn()) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="d-flex w-100 m-0 row">
      <div className="col-md-3 p-0 bg-grey">
        <ProjectList />
      </div>
      <div className="d-none d-md-block col-md-9 p-0">
        <Welcome />
      </div>
    </div>
  );
};

export default Home;
