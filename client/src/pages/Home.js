//Home Page
import React from "react";
import Welcome from "../components/Welcome";
import ProjectList from "../components/ProjectList";
import Auth from "../utils/auth";

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <>
      {loggedIn ? (
        <div className="d-flex w-100 m-0 row">
          <div className="col-md-3 p-0 bg-grey">
            <ProjectList />
          </div>
          <div className="d-none d-md-block col-md-9 p-0">
            <Welcome />
          </div>
        </div>
      ) : (
        <div className="d-flex w-100 m-0 mb-5 row">
          <div className="d-flex justify-content-center align-items-center my-5">
            <div className="col col-sm-8 col-md-6 col-xl-4">
              <Welcome />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
