import React from "react";
import { projects } from "../data";

export default function Work() {
  return (
    <section id="work" className="section">
      <h2 className="section-title">Selected Work</h2>
      <div className="grid">
        {projects.map((p) => (
          <article className="card" key={p.name}>
            <div className="card-top">
              <span
                className={`status status-${p.status
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                {p.status}
              </span>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="card-link"
                >
                  ↗
                </a>
              )}
            </div>
            <h3>{p.name}</h3>
            {p.tagline && <p className="card-quote">&ldquo;{p.tagline}&rdquo;</p>}
            <p className="card-desc">{p.description}</p>
            {p.tech.length > 0 && (
              <div className="chip-row">
                {p.tech.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            {p.why && <p className="card-why">Why it matters: {p.why}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
