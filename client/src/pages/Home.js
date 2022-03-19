//Home Page
import React from "react";
import Welcome from "../components/Welcome";
import ProjectList from "../components/ProjectList";
import Auth from "../utils/auth";

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <div className="d-flex w-100 m-0 row">
      {loggedIn ? (
        <>
          <div className="col-md-3 p-0 bg-grey">
            <ProjectList />
          </div>
          <div className="d-none d-md-block col-md-9 p-0">
            <Welcome />
          </div>
        </>
      ) : (
        <>
          <div className="d-none d-md-block p-0">
            <Welcome />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
