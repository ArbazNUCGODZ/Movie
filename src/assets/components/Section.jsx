import { Link } from "react-router-dom";
import styles from "../pages/Homepage.module.css";

function Section() {
  return (
    <main className={styles.homepage}>
      {/* <PageNav />
        <Outlet /> */}
      <section>
        <h1>
          Online Movie Tickets Booking
          <br />
          Design a movie ticket booking system
        </h1>
        <h2>
          Movies are a gateway to another world that give us that much needed
          break from real life. There’s nothing like a good movie to get your
          mind off of the daily grind.
        </h2>
        <Link to="/login" className="cta">
          Start Booking Now
        </Link>
      </section>
    </main>
  );
}

export default Section;
