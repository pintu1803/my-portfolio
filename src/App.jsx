import React, { useState, useEffect, useLayoutEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Experience from "./components/Experience";
import GitHubStats from "./components/GitHubStats";
import Exploring from "./components/Exploring";
import Footer from "./components/Footer";
import CommandMenu from "./components/CommandMenu";
import "./App.css";

const SECTION_ORDER = ["hero", "work", "experience", "github", "exploring"];

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    function handleKey(e) {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
        return;
      }

      if (cmdOpen) return;

      if (e.key === "j" || e.key === "k") {
        const positions = SECTION_ORDER.map(
          (id) => document.getElementById(id)?.offsetTop ?? 0
        );
        const current = window.scrollY;

        if (e.key === "j") {
          const next = positions.find((p) => p > current + 10);
          if (next !== undefined) {
            window.scrollTo({ top: next, behavior: "smooth" });
          }
        } else {
          const prevPositions = positions.filter((p) => p < current - 10);
          const prev = prevPositions[prevPositions.length - 1];
          if (prev !== undefined) {
            window.scrollTo({ top: prev, behavior: "smooth" });
          }
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [cmdOpen]);

  return (
    <div className="app">
      <Nav onOpenCommandMenu={() => setCmdOpen(true)} />
      <Hero />
      <Work />
      <Experience />
      <GitHubStats />
      <Exploring />
      <Footer />
      <CommandMenu open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <button
        type="button"
        className="theme-toggle"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      >
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
}