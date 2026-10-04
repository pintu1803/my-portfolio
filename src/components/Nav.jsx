import React from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
import { profile } from "../data";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Github", href: "#github" },
  { label: "Exploring", href: "#exploring" },
  { label: "Hire Me", href: "#hire" },
];

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .join("")
  .toUpperCase();

export default function Nav({ onOpenCommandMenu, theme, onToggleTheme }) {
  const next = theme === "dark" ? "light" : "dark";

  return (
    <nav className="nav" aria-label="Primary">
      <a className="nav-logo" href="#hero">
        {initials}
      </a>

      <div className="nav-links">
        {LINKS.map(({ label, href }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <button
          type="button"
          className="theme-toggle"
          aria-label={`Switch to ${next} theme`}
          title={`Switch to ${next} theme`}
          onClick={onToggleTheme}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
        <button type="button" className="nav-cmdk" onClick={onOpenCommandMenu} aria-label="Open command menu">
          <kbd>Ctrl K</kbd>
        </button>
      </div>
    </nav>
  );
}