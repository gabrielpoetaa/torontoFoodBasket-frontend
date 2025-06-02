// Header.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../images/foodBasketLogo-white.webp";

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <nav className="flex justify-end gap-12 mr-12 mt-6">
        {/* <Link to="/" className={styles.link}>
          Home
        </Link> */}
        <Link to="/dashboard" className={styles.link}>
          Dashboard
        </Link>
      </nav>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="Toronto Food Basket logo" />
        </div>
      </div>
    </div>
  );
}

export default Header;
