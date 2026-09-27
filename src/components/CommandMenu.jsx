import React, { useState, useEffect, useRef } from "react";
import { profile } from "../data";

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function CommandMenu({ open, onClose }) {
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    { label: "Go to Work", run: () => scrollToId("work") },
    { label: "Go to Experience", run: () => scrollToId("experience") },
    { label: "Go to Exploring", run: () => scrollToId("exploring") },
    { label: "Open GitHub", run: () => window.open(profile.github, "_blank") },
    {
      label: "Copy Email",
      run: () => navigator.clipboard.writeText(profile.email),
    },
  ];

  useEffect(() => {
    if (open) {
      setIndex(0);
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, actions.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        actions[index].run();
        onClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, index]);

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Type a command... (↑↓ to navigate, Enter to select)"
          readOnly
        />
        <ul className="cmdk-list">
          {actions.map((a, i) => (
            <li
              key={a.label}
              className={i === index ? "active" : ""}
              onMouseEnter={() => setIndex(i)}
              onClick={() => {
                a.run();
                onClose();
              }}
            >
              {a.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
