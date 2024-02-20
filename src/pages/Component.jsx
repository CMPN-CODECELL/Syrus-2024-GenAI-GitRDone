import React from "react";
import styles from "./Component.module.css"; // Import your CSS module
export default function Component() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <a className={styles.logo} href="#">
          <img
            alt="Mountain"
            className={styles["logo-icon"]}
            src="/images/logo.jpg"
          />
          <span className={styles["logo-text"]}>Git-R-Done</span>
        </a>
        <nav className={styles.nav}>
          <a className={styles["nav-link"]} href="#">
            Home
          </a>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={`${styles.section} ${styles["section-1"]}`}>
          <div className={styles.container}>
            <div className={styles["text-center"]}>
              <h1 className={styles.title}>Welcome to Git-R-Done</h1>
              <p className={styles.subtitle}>
                Welcome to our cutting-edge smart education solution, designed
                to revolutionize your learning experience. Immerse yourself in
                the future of education with our advanced Artificial
                Intelligence algorithms. Our AI solution is meticulously crafted
                to enhance comprehension, engagement, and overall knowledge
                retention. Elevate your educational journey and embrace the
                power of intelligent learning with us.
              </p>
              <a className={styles["cta-link"]} href="#">
                Get Started
              </a>
              <a className={styles["cta-link"]} href="#">
                Learn more
              </a>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles["section-2"]}`}>
          <div className={styles.container}>
            <h2 className={styles.title}>Our Main Features</h2>
            <div className={styles["feature-grid"]}>
              <FeatureCard
                title="Generate Pdf To summary"
                description="Unveil the essence of any document with a click – Generate insightful summaries from PDFs effortlessly!."
                imageSrc="/images/pdf-to-summary.png"
                sectionNumber={1}
                link="/pdf-to-summary"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
import { Link } from "react-router-dom";

function FeatureCard({ title, description, imageSrc, link, sectionNumber }) {
  const isTextOnLeft = sectionNumber % 2 === 1;

  return (
    <div className={styles["feature-card"]}>
      <div className={styles["feature-content"]}>
        {isTextOnLeft ? (
          <>
            <div className={styles["text-content"]}>
              <h3 className={styles["feature-title"]}>{title}</h3>
              <p className={styles["feature-description"]}>{description}</p>
              <Link to={link} className={styles["cta-button"]}>
                Open Link
              </Link>
            </div>
            <img
              src={imageSrc}
              alt={title}
              className={styles["feature-image"]}
            />
          </>
        ) : (
          <>
            <img
              src={imageSrc}
              alt={title}
              className={styles["feature-image"]}
            />
            <div className={styles["text-content"]}>
              <h3 className={styles["feature-title"]}>{title}</h3>
              <p className={styles["feature-description"]}>{description}</p>
              <Link to={link} className={styles["cta-button"]}>
                Open Link
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
