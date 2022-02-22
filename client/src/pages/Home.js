//Home Page
import React from "react";
import Welcome from "../components/Welcome";
import ProjectList from "../components/ProjectList";

const Home = () => {
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
