import React from "react";
import "bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import Auth from "./utils/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Project from "./pages/Project";
import Task from "./pages/Task";
import ProjectSettings from "./pages/UpdateProject";

// connect to GraphQL and ApolloClient
const httpLink = createHttpLink({
  uri: "/graphql",
});

// retrieve token from localStorage and set http headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const loggedIn = Auth.loggedIn();

  return (
    <ApolloProvider client={client}>
      <Router>
        <div
          className={
            loggedIn
              ? "d-flex flex-column min-vh-100 text-white"
              : "hero d-flex flex-column min-vh-100 text-white"
          }
        >
          <header className={loggedIn && "bg-purple"}>
            <Header />
          </header>
          <main
            className={
              loggedIn
                ? "d-flex flex-grow-1 bg-dark-grey"
                : "d-flex flex-grow-1"
            }
          >
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<Signup />} />
              {loggedIn ? (
                <>
                  <Route
                    exact
                    path="/project/:projectId"
                    element={<Project />}
                  />
                  <Route
                    exact
                    path="/project/:projectId/task/:taskId"
                    element={<Task />}
                  />
                  <Route
                    exact
                    path="/project/:projectId/settings"
                    element={<ProjectSettings />}
                  />
                </>
              ) : (
                <Route path="*" element={<Home />} />
              )}
            </Routes>
          </main>
          <footer className={loggedIn && "bg-purple"}>
            <Footer />
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
