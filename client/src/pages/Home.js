//Home Page
import React from "react";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PROJECT } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const loggedIn = Auth.loggedIn();

  const project = data?.project || [];

  if (!Auth.loggedIn()) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ProjectForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProjectList
              project={project}
              title="Your Projects"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
