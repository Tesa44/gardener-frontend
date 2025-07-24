import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>🌱 Gardener</div>
        <ul className={styles.navLinks}>
          <li>Features</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className={styles.authButtons}>
          <Link to="/login" className={styles.login}>
            Login
          </Link>
          <Link to="/register" className={styles.register}>
            Register
          </Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Organize Your Garden Like Never Before</h1>
          <p>
            Keep track of all your plants, watering schedules, and garden
            inventory with our intuitive plant management system.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primary}>Start Growing</button>
            <button className={styles.secondary}>Watch Demo</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="hero.jpg" alt="garden and flowers"></img>
        </div>
      </section>

      <section className={styles.features}>
        <h2>Everything You Need for Plant Care</h2>
        <p>Simple tools to help your garden thrive</p>
        <div className={styles.featureCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📁</div>
            <h3>Plant Inventory</h3>
            <p>
              Keep detailed records of all your plants including species,
              location, and care notes.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>💧</div>
            <h3>Watering Schedule</h3>
            <p>
              Never forget to water again with automated reminders and tracking.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📈</div>
            <h3>Growth Tracking</h3>
            <p>
              Monitor your plants' progress with photos and growth measurements
              over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
