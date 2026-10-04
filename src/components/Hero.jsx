import React from "react";
import { profile, stats } from "../data";
import HeroBackDrop from "./HeroBackDrop";
import { Scribble, Doodles } from "./Scribble";
import Terminal from "./Terminal";
import RequestFlow from "./RequestFlow";
import "./Hero.css";

const [lead, ...restTitle] = profile.title.split("|").map((s) => s.trim());

export default function Hero() {
  return (
    <section id="hero" className="hero-stage">
      <HeroBackDrop />
      <Doodles />

      <div className="hero">
        <span className="badge">{profile.location}</span>

        <h1>
          <span className="scribble-host">
            {profile.name}
            <Scribble
              id="scribble-name"
              className="scribble--underline"
              viewBox="0 0 300 18"
              d="M4 12 C60 4 120 14 180 8 S280 6 296 10 M14 16 C90 9 170 16 270 11"
              delay={0.4}
              duration={1.1}
              pen
            />
          </span>
        </h1>

        <p className="hero-title">
          <span className="scribble-host">
            {lead}
            <Scribble
              id="scribble-title"
              className="scribble--circle"
              viewBox="0 0 200 50"
              d="M24 9 C70 -1 170 3 191 21 C206 39 120 50 60 46 C14 43 -3 24 29 10 C62 -2 132 5 162 15"
              delay={1.7}
              duration={1.1}
            />
          </span>
          {restTitle.map((t) => (
            <React.Fragment key={t}>
              <span className="hero-sep"> | </span>
              {t}
            </React.Fragment>
          ))}
        </p>

        <Terminal />

        <div className="hero-actions">
          <a className="btn btn-primary" href="#work">
            View Work
          </a>
          <a className="btn btn-secondary" href="#hire">
            Hire Me
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

        <RequestFlow />
      </div>
    </section>
  );
}