import React from "react";
import "bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProjectArea from "./components/ProjectArea";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
