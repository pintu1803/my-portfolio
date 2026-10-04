import React from "react";
import { projects } from "../data";
import "./Work.css";

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9 9 3" />
      <path d="M4 3h5v5" />
    </svg>
  );
}

export default function Work() {
  return (
    <section id="work" className="section work">
      <h2 className="section-title">Selected Work</h2>

      <div className="work-list">
        {projects.map((p) => {
          // "Live | AWS Hosted" -> pill "Live", small note "AWS Hosted"
          const [state, host] = (p.status || "").split("|").map((s) => s.trim());
          const slug = (state || "").toLowerCase().replace(/\s+/g, "-");

          return (
            <article className="work-row" key={p.name}>
              <div className="work-meta">
                {p.category && (
                  <p className="work-eyebrow">
                    <span className="work-dot" aria-hidden="true" />
                    {p.category}
                  </p>
                )}
                <h3 className="work-name">{p.name}</h3>
                {p.tagline && <p className="work-tagline">&ldquo;{p.tagline}&rdquo;</p>}
                {state && (
                  <div className="work-status">
                    <span className={`work-pill work-pill--${slug}`}>{state}</span>
                    {host && <span className="work-host">{host}</span>}
                  </div>
                )}
              </div>

              <div className="work-body">
                <div className="work-top">
                  <p className="work-desc">{p.description}</p>
                  {p.link && (
                    <a
                      className="work-live"
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${p.name} (opens in a new tab)`}
                    >
                      Live <ArrowIcon />
                    </a>
                  )}
                </div>

                {p.why && <p className="work-why">{p.why}</p>}

                {p.tech?.length > 0 && (
                  <>
                    <p className="work-stack-label">Stack</p>
                    <ul className="work-chips">
                      {p.tech.map((t) => (
                        <li className="work-chip" key={t}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}