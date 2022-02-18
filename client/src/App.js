import React, { useState } from "react";
import "bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import ProjectArea from "./components/ProjectArea";
import SignupForm from "./components/SignupForm";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// connect to GraphQL and ApolloClient
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
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
  const [loginUnselected, loginSelected] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
