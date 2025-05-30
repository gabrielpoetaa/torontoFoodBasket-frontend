// Header.js
import React from "react";
import styles from "./Header.module.css";
import logo from "../images/foodBasketLogo-white.webp";

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="Toronto Food Basket logo" />
      </div>
    </div>
  );
}

export default Header;
