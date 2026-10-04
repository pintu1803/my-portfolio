import React, { useState } from "react";
import { experience } from "../data";
import "./Experience.css";

function Logo({ company, logo }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="xp-logo" aria-hidden="true">
      {logo && !failed ? (
        <img src={logo} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span>{company.charAt(0)}</span>
      )}
    </div>
  );
}

const num = (i) => String(i + 1).padStart(2, "0");

export default function Experience() {
  // the most recent role starts expanded
  const [open, setOpen] = useState(() => new Set(experience[0] ? [experience[0].company] : []));

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <section id="experience" className="section xp">
      <h2 className="section-title">Experience</h2>

      <ul className="xp-list">
        {experience.map((e, idx) => {
          const bullets = e.bullets?.length ? e.bullets : e.achievement ? [e.achievement] : [];
          const first = bullets[0];
          const rest = bullets.slice(1);
          const canExpand = rest.length > 0;
          const isOpen = canExpand && open.has(e.company);
          const panelId = `xp-panel-${idx}`;

          return (
            <li className={`xp-item${isOpen ? " is-open" : ""}`} key={e.company}>
              <div className="xp-rail">
                <Logo company={e.company} logo={e.logo} />
              </div>

              <div className="xp-content">
                <div className="xp-head">
                  <h3 className="xp-company">
                    {e.link ? (
                      <a href={e.link} target="_blank" rel="noreferrer">
                        {e.company}
                      </a>
                    ) : (
                      e.company
                    )}
                  </h3>

                  <span className="xp-dates">{e.dates}</span>
                </div>

                <p className="xp-role">{e.role}</p>
                {e.blurb && <p className="xp-blurb">{e.blurb}</p>}

                {e.tech?.length > 0 && (
                  <ul className="xp-chips" aria-label={`Stack used at ${e.company}`}>
                    {e.tech.map((t) => (
                      <li className="xp-chip" key={t}>
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                {first && (
                  <ul className="xp-bullets">
                    <li className={canExpand ? "is-toggle" : undefined}>
                      {canExpand ? (
                        <button
                          type="button"
                          className="xp-bullet-btn"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggle(e.company)}
                        >
                          <span className="xp-num" aria-hidden="true">{num(0)}</span>
                          <span>
                            <span className="xp-text">{first}</span>
                            <span className="xp-hint">
                              {isOpen ? "show less" : `+${rest.length} more`}
                            </span>
                          </span>
                        </button>
                      ) : (
                        <>
                          <span className="xp-num" aria-hidden="true">{num(0)}</span>
                          <span>{first}</span>
                        </>
                      )}
                    </li>
                  </ul>
                )}

                {canExpand && (
                  <div id={panelId} className={`xp-more${isOpen ? " is-open" : ""}`}>
                    <div className="xp-more-inner">
                      <ul className="xp-bullets xp-more-list">
                        {rest.map((b, i) => (
                          <li key={i}>
                            <span className="xp-num" aria-hidden="true">{num(i + 1)}</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}