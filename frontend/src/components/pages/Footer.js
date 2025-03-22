import React from "react";
import "../style/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p
          className="footer-title"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Goodwood Community Center
        </p>
        <p className="footer-contact">123 Main Street, Goodwood</p>
        <p className="footer-contact">Email: info@goodwood.com</p>
        <p className="footer-contact">Phone: +123456789</p>
      </div>

      <div className="footer-center">
        <p className="footer-contact">Opening Hours</p>
        <p className="footer-contact">Monday to Friday: 9:00 AM - 5:00 PM</p>
        <p className="footer-contact">Hobart, Tasmania</p>
      </div>

      <div className="footer-right">
        <img
          src="/goodwood_logo1.png"
          alt="Goodwood Logo"
          className="footer-logo"
        />

        <div className="social-media">
          <span>Follow us:</span>
          <a
            href="https://www.facebook.com/GoodwoodCommunityCentreTas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.facebook.com/GoodwoodCommunityCentreTas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.facebook.com/GoodwoodCommunityCentreTas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://www.facebook.com/GoodwoodCommunityCentreTas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
