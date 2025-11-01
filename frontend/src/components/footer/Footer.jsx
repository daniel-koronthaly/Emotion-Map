import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} style={{alignItems: 'center', height: 50, paddingLeft: 15, color: "lightgray"}}>
      <p>Created by Daniel Koronthály</p>
    </footer>
  );
};

export default Footer;