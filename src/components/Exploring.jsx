import React from "react";
import { exploring } from "../data";

export default function Exploring() {
  return (
    <section id="exploring" className="section">
      <h2 className="section-title">What I'm Exploring</h2>
      <div className="grid grid-4">
        {exploring.map((item) => (
          <div className="explore-card" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
