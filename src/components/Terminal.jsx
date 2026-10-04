import React, { useEffect, useMemo, useState } from "react";
import { experience, profile } from "../data";
import { prefersReducedMotion } from "./Motion";

const stack = [...new Set(experience.flatMap((e) => e.tech || []))].slice(0, 6).join(" · ");
const role = profile.title
  .split("|")
  .slice(0, 2)
  .map((s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"))
  .join(" · ");

const SCRIPT = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: role },
  { kind: "cmd", text: "cat stack.txt" },
  { kind: "out", text: stack },
  { kind: "cmd", text: "./tagline.sh" },
  { kind: "out", text: profile.tagline },
];

function Lines({ upTo, partial, cursor }) {
  // lines before `upTo` are complete; line `upTo` shows `partial` characters
  return SCRIPT.map((line, i) => {
    if (i > upTo) return null;
    const text = i === upTo ? line.text.slice(0, partial) : line.text;
    const isLast = i === upTo;
    return (
      <div key={i} className={line.kind === "cmd" ? "term-cmd" : "term-out"}>
        {line.kind === "cmd" && <span className="term-prompt">$</span>}
        <span>{text}</span>
        {cursor && isLast && <span className="cursor" />}
      </div>
    );
  });
}

/* Types a short shell session. Click it to skip. A hidden full copy reserves the
   final height so nothing below jumps while it types. */
export default function Terminal() {
  const reduced = prefersReducedMotion();
  const [p, setP] = useState(() => (reduced ? { i: SCRIPT.length, c: 0 } : { i: 0, c: -10 }));
  const done = p.i >= SCRIPT.length;

  useEffect(() => {
    if (done) return;
    const step = SCRIPT[p.i];
    const cmd = step.kind === "cmd";
    const finished = p.c >= step.text.length;
    const delay = p.c < 0 ? 60 : finished ? (cmd ? 160 : 140) : cmd ? 32 : 6;
    const id = setTimeout(() => {
      if (finished) setP({ i: p.i + 1, c: 0 });
      else setP({ i: p.i, c: p.c + (cmd ? 1 : 3) });
    }, delay);
    return () => clearTimeout(id);
  }, [p, done]);

  const skip = () => setP({ i: SCRIPT.length, c: 0 });
  const ghost = useMemo(() => <Lines upTo={SCRIPT.length - 1} partial={Infinity} />, []);

  return (
    <div className="term" onClick={skip} title={done ? undefined : "Click to skip"}>
      <span className="sr-only">{profile.tagline}</span>
      <div className="term-ghost" aria-hidden="true">{ghost}</div>
      <div className="term-live" aria-hidden="true">
        {done ? (
          <Lines upTo={SCRIPT.length - 1} partial={Infinity} cursor />
        ) : (
          <Lines upTo={p.i} partial={Math.max(p.c, 0)} cursor />
        )}
      </div>
    </div>
  );
}