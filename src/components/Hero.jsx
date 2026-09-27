import React from "react";
import { profile, stats } from "../data";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <span className="badge">Open to work</span>
      <h1>{profile.name}</h1>
      <p className="hero-title">{profile.title}</p>
      <p className="hero-tagline">
        <span className="prompt">$</span> {profile.tagline}
        <span className="cursor" aria-hidden="true" />
      </p>

      <div className="hero-actions">
        <a href="#work" className="btn btn-primary">
          View Work
        </a>
        <a
          href={profile.github}
          className="btn btn-secondary"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>

      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
