import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Recime</h1>
        <p>
          Recime helps you discover recipes intelligently — by ingredient,
          cuisine, nutrition, and intent — without the noise.
        </p>
      </section>

      <section className="about-section">
        <h2>What is Recime?</h2>
        <p>
          Recime is a modern recipe discovery platform designed for people who
          want fast, flexible, and meaningful food inspiration. Whether you’re
          searching by a single ingredient or dialing in precise nutritional
          constraints, Recime adapts to how you think about cooking.
        </p>
      </section>

      <section className="about-section">
        <h2>Why Recime?</h2>
        <ul>
          <li>Search by ingredients, cuisine, and dietary preferences</li>
          <li>Smart autocomplete for faster discovery</li>
          <li>Clean, distraction-free interface</li>
          <li>Designed for exploration, not clutter</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Built With Intent</h2>
        <p>
          Recime is built with a focus on clarity, performance, and usability.
          Every interaction is designed to feel deliberate — from the search
          experience to how results are presented.
        </p>
      </section>

      <section className="about-footer">
        <p>
          Food discovery should feel inspiring, not overwhelming.
          <br />
          <strong>Recime</strong> keeps it simple.
        </p>
      </section>
    </div>
  );
};

export default About;
