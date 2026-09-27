import React from "react";
import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="footer-name">{profile.name}</p>
        <p className="footer-tagline">{profile.title}</p>
      </div>
      <div className="footer-links">
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
