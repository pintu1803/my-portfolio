import React from "react";
import { exploring } from "../data";
import "./Exploring.css";

// Prefer an explicit `keywords` array; otherwise split a blurb that is just a
// comma-separated list. Sentence blurbs stay as a paragraph.
function toKeywords(item) {
  if (item.keywords?.length) return item.keywords;
  const blurb = item.blurb;
  if (!blurb || /[.\u2014]/.test(blurb)) return null;
  const parts = blurb.split(",").map((t) => t.trim()).filter(Boolean);
  return parts.length >= 2 ? parts : null;
}

export default function Exploring() {
  return (
    <section id="exploring" className="section ex">
      <h2 className="section-title">What I'm Exploring</h2>
      <div className="ex-list">
        {exploring.map((item) => {
          const keywords = toKeywords(item);
          return (
            <div className="ex-card" key={item.title}>
              <h3 className="ex-title">{item.title}</h3>
              {keywords ? (
                <ul className="ex-chips" aria-label={`Topics: ${item.title}`}>
                  {keywords.map((k) => (
                    <li className="ex-chip" key={k}>
                      {k}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="ex-text">{item.blurb}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}