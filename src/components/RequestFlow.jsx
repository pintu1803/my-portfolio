import React from "react";
import { prefersReducedMotion } from "./Motion";

const NODES = ["Client", "API", "Queue", "Worker", "DB"];
const X0 = 54;
const STEP = 163;
const BOX_W = 96;
const BOX_H = 30;
const LANE_Y = 33;
const DUR = 4.8; // seconds for a packet to cross the whole lane
const PERIOD = DUR / 2; // a new packet leaves every PERIOD seconds
const START = 0.6;

const centers = NODES.map((_, i) => X0 + i * STEP);
const X1 = centers[centers.length - 1];
const LANE = `M${X0} ${LANE_Y} H${X1}`;

/* A request travelling Client → API → Queue → Worker → DB. Packets slide behind each
   box (hiding for a beat, like processing) and each box flashes when one arrives. */
export default function RequestFlow() {
  const reduced = prefersReducedMotion();
  return (
    <div className="flow" aria-hidden="true">
      <svg viewBox="0 0 760 62" focusable="false">
        <path className="flow-lane" d={LANE} />
        {!reduced &&
          [0, PERIOD].map((offset) => (
            <circle key={offset} r="3.5" className="flow-packet">
              <animateMotion
                path={LANE}
                dur={`${DUR}s`}
                begin={`${START + offset}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        {NODES.map((name, i) => (
          <g
            key={name}
            className="flow-node"
            style={{ "--hit": `${(START + ((centers[i] - X0) / (X1 - X0)) * DUR).toFixed(2)}s` }}
          >
            <rect x={centers[i] - BOX_W / 2} y={LANE_Y - BOX_H / 2} width={BOX_W} height={BOX_H} rx="4" />
            <text x={centers[i]} y={LANE_Y + 4} textAnchor="middle">
              {name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}