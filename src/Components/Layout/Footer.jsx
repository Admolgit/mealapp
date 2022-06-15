import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="FooterContainer">
      <div className="footer">
        <div className="rows">
          <div className="child">
            <h1 className="about">About Us</h1>
            <div className="children">
              <Router>
                <Link className="nav-link" to="#">
                  Aim
                </Link>
                <Link className="nav-link" to="#">
                  Vison
                </Link>
                <Link className="nav-link" to="#">
                  Testimonials
                </Link>
              </Router>
            </div>
          </div>
          <div className="child">
            <h1>Services</h1>
            <div className="children">
              <Router>
                <Link className="nav-link" to="#">
                  African food
                </Link>
                <Link className="nav-link" to="#">
                  Foreign dishes
                </Link>
                <Link className="nav-link" to="#">
                  Catering
                </Link>
                <Link className="nav-link" to="#">
                  Party decoration
                </Link>
              </Router>
            </div>
          </div>
          <div className="child">
            <h1>Contact Us</h1>
            <div className="children">
              <Router>
                <Link className="nav-link" to="#">
                  Lagos
                </Link>
                <Link className="nav-link" to="#">
                  Enugu
                </Link>
                <Link className="nav-link" to="#">
                  Ibadan
                </Link>
                <Link className="nav-link" to="#">
                  Kano
                </Link>
              </Router>
            </div>
          </div>
          <div className="child">
            <h1 className="social">Social Media</h1>
            <div className="children">
              <Router>
                <Link className="nav-link" to="#">
                  <i className="fa fa-facebook">
                  <span style={{ marginLeft: "10px" }}>Facebook</span>
                  </i>
                </Link>
                <Link className="nav-link" to="#">
                <i className="fa fa-instagram">
                  <span style={{ marginLeft: "10px" }}>Instagram</span>
                </i>
                </Link>
                <Link className="nav-link" to="#">
                <i className="fa fa-twitter">
                  <span style={{ marginLeft: "10px" }}>Twitter</span>
                </i>
                </Link>
                <Link className="nav-link" to="#">
                <i className="fa fa-youtube">
                  <span style={{ marginLeft: "10px" }}>Youtube</span>
                </i>
                </Link>
              </Router>
            </div>
          </div>
        </div>
        <p className="foot-1">Ademola &copy; 2021</p>
      </div>
    </div>
  );
};

export default Footer;
