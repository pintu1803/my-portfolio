import React from "react";
import { prefersReducedMotion } from "./Motion";

/* A hand-drawn stroke that "writes itself". The path is drawn with a stroke-dashoffset
   animation (pathLength=1 normalises any path to 0..1), and an optional pen tip rides
   along the same path so it looks like someone is holding the pen. */
export function Scribble({
  id,
  d,
  viewBox,
  className = "",
  delay = 0,
  duration = 1,
  pen = false,
}) {
  const reduced = prefersReducedMotion();
  return (
    <svg
      className={`scribble ${className}`}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ "--delay": `${delay}s`, "--dur": `${duration}s` }}
    >
      <path id={id} d={d} pathLength="1" />
      {pen && !reduced && (
        <circle r="3.2" className="scribble-pen" opacity="0">
          <animateMotion
            dur={`${duration}s`}
            begin={`${delay}s`}
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".4 0 .2 1"
            fill="remove"
          >
            <mpath href={`#${id}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.04;0.96;1"
            dur={`${duration}s`}
            begin={`${delay}s`}
            fill="remove"
          />
        </circle>
      )}
    </svg>
  );
}

/* Loose doodles in the margin: loop, arrow, star, zig-zag. Fixed pixel size, wide screens only. */
const DOODLES = [
  { d: "M180 44 C200 14 252 22 246 58 C240 94 188 88 194 58 C199 34 232 42 229 60", delay: 2.4, dur: 1.2 },
  { d: "M268 168 C228 146 174 154 132 192 M132 192 L152 188 M132 192 L139 171", delay: 2.9, dur: 1.1 },
  { d: "M210 234 L225.3 281 L185.3 252 L234.7 252 L194.7 281 Z", delay: 3.4, dur: 1.0 },
  { d: "M58 352 l14 -17 l14 17 l14 -17 l14 17 l14 -17 l14 17", delay: 3.8, dur: 0.9 },
];

export function Doodles() {
  return (
    <div className="doodles" aria-hidden="true">
      <svg viewBox="0 0 300 420" width="300" height="420" focusable="false">
        {DOODLES.map((p) => (
          <path
            key={p.d}
            d={p.d}
            pathLength="1"
            style={{ "--delay": `${p.delay}s`, "--dur": `${p.dur}s` }}
          />
        ))}
      </svg>
    </div>
  );
}