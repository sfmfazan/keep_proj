import React from "react";
import "./Footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer>
      <div className="footer-info">
        <p>&copy; {year} YourApp</p>
        <p>Version 1.0.0</p>
        <p>Developed by Fazan</p>
      </div>
     
    </footer>
  );
};

export default Footer;
