import React from "react";
import { profile } from "../data";

export default function Nav({ onOpenCommandMenu }) {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="nav">
      <a href="#hero" className="nav-logo">
        {initials}
      </a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#exploring">Exploring</a>
      </div>
      <button className="nav-cmdk" onClick={onOpenCommandMenu}>
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </button>
    </nav>
  );
}
