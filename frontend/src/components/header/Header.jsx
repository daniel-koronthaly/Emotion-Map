import React, { useState } from "react";
import styles from "./Header.module.css";
import { FaGithub, FaFileCsv, FaBars, FaTimes } from "react-icons/fa";

const IconButton = ({ onClick, active, children }) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${active ? styles.active : ""}`}
  >
    {children}
  </button>
);

const Header = ({ currentPage, setCurrentPage, isDemographicSubmitted }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const buttons = [
    { label: "Main Page", page: isDemographicSubmitted ? "MainPage" : "Demographics" },
    { label: "Explanation", page: "Explanation" },
    { label: "About", page: "About" },
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMenuOpen(false); // close mobile menu when selecting
  };

  return (
    <header className={styles.header}>
      <h1
        className={styles.title}
        onClick={() => setCurrentPage("Welcome")}
      >
        Emotion Map
      </h1>

      {/* Desktop nav */}
      <nav className={styles.nav}>
        {buttons.map((b) => (
          <button
            key={b.page}
            className={`${styles.button} ${currentPage === b.page ? styles.active : ""}`}
            onClick={() => handleNavClick(b.page)}
          >
            {b.label}
          </button>
        ))}
        <nav style={{ marginLeft: "20px" }} className={styles.nav}>
          <IconButton onClick={() => handleNavClick("ExportToCsv")} active={currentPage === "ExportToCsv"}>
            <FaFileCsv size={20} />
          </IconButton>
          <IconButton onClick={() => window.open("https://github.com/daniel-koronthaly/Emotion-Map/", "_blank")}>
            <FaGithub size={20} />
          </IconButton>
        </nav>
      </nav>

      {/* Mobile hamburger */}
      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {buttons.map((b) => (
            <button
              key={b.page}
              className={`${styles.mobileButton} ${currentPage === b.page ? styles.active : ""}`}
              onClick={() => handleNavClick(b.page)}
            >
              {b.label}
            </button>
          ))}
          <IconButton onClick={() => handleNavClick("ExportToCsv")} active={currentPage === "ExportToCsv"}>
            <FaFileCsv size={20} />
          </IconButton>
          <IconButton onClick={() => window.open("https://github.com/daniel-koronthaly/Emotion-Map/", "_blank")}>
            <FaGithub size={20} />
          </IconButton>
        </div>
      )}
    </header>
  );
};

export default Header;
