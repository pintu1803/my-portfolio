import React from "react";
import { experience } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experience.map((e) => (
          <div className="exp-row" key={e.company}>
            <div className="exp-header">
              <h3>
                {e.link ? (
                  <a href={e.link} target="_blank" rel="noreferrer">
                    {e.company}
                  </a>
                ) : (
                  e.company
                )}
              </h3>
              <span className="exp-dates">{e.dates}</span>
            </div>
            <p className="exp-role">{e.role}</p>
            <p className="exp-blurb">{e.blurb}</p>
            <p className="exp-achievement">{e.achievement}</p>
            <div className="chip-row">
              {e.tech.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
