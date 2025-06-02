import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/dashboard" className={styles.link}>
          Dashboard
        </Link>
      </div>
    </header>
  );
}

export default Header;
