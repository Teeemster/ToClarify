// Task Page
import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

const Task = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main>
      <p>Task Page</p>
    </main>
  );
};

export default Task;
