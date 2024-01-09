// Header.js
import React from "react";
import styles from "./Header.module.css";

export function Header({ }) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerText}>
        <h1>TORONTO FOOD BASKET</h1>
      </div>
    </div>
  );
}

export default Header;
