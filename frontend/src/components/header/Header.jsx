import styles from "./Header.module.css";
import { FaGithub, FaFileCsv } from "react-icons/fa";

const IconButton = ({ onClick, active, children }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${active ? styles.active : ""
        }`}
    >
      {children}
    </button>
  );
};

const Header = ({ currentPage, setCurrentPage, isDemographicSubmitted }) => {
  const buttons = [
    { label: "Main Page", page: isDemographicSubmitted ? "MainPage" : "Demographics" },
    { label: "Explanation", page: "Explanation" },
    { label: "About", page: "About" }
  ];

  return (
    <header className={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <h1 className={styles.title} onClick={() => setCurrentPage("Welcome")} style={{ marginLeft: 40 }}>
          Emotion Map
        </h1>
      </div>
      <nav style={{ marginRight: "20px" }} className={styles.nav}>
        {buttons.map((b, i) => (
          <button
            key={i}
            className={`${styles.button} ${currentPage === b.page ? styles.active : ""
              }`}
            onClick={() => setCurrentPage(b.page)}
          >
            {b.label}
          </button>
        ))}
        <nav style={{ marginLeft: "20px" }} className={styles.nav}>
          <IconButton onClick={() => setCurrentPage("ExportToCsv")} active={currentPage === "ExportToCsv"}><FaFileCsv size={20} /></IconButton>
          <IconButton onClick={() => window.open("https://github.com/daniel-koronthaly/Emotion-Map/", "_blank")}><FaGithub size={20} /></IconButton>
        </nav>
      </nav>
    </header>
  );
};

export default Header;
