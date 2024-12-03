import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      {/* <img
        src="/public/download.png"
        alt="WorldWise logo"
        className={styles.logo}
      /> */}
      <h2 className={styles.logo}>🎥Movie Booking</h2>
    </Link>
  );
}

export default Logo;
