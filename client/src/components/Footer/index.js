//Footer Component
import React from "react";

const Footer = () => {
  let currentYear = new Date().getFullYear();
  return (
    <div>
      <p>
        &copy; {currentYear} By Hailey Thomas, Sophie Barrett, Angel Rios, and
        Jonathan Beach
        <span role="img" aria-label="thumbtack">
          📌
        </span>
      </p>
      <a
        href="https://github.com/Teeemster/Project3"
        target="_blank"
        rel="noreferrer"
      >
        View Project on GitHub
      </a>
    </div>
  );
};

export default Footer;
