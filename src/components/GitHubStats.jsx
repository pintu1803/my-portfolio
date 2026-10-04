import React, { useState, useEffect, useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { profile } from "../data";
import "./GitHubStats.css";

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function levelFor(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

// "2026-10-04" -> local Date (avoids the UTC off-by-one of new Date("2026-10-04"))
function parseDate(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function todayString() {
  const n = new Date();
  const p = (v) => String(v).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
}

// Split the flat day list into Sunday-first weeks, padding the first/last week with nulls.
function buildWeeks(days) {
  if (!days.length) return [];
  const cells = Array(parseDate(days[0].date).getDay()).fill(null).concat(days);
  while (cells.length % 7) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

// One label per month, placed on the first week that starts in that month.
function monthLabels(weeks) {
  const labels = [];
  let last = -1;
  weeks.forEach((week, w) => {
    const first = week.find(Boolean);
    if (!first) return;
    const month = parseDate(first.date).getMonth();
    if (month !== last) {
      labels.push({ w, name: parseDate(first.date).toLocaleString("en-US", { month: "short" }) });
      last = month;
    }
  });
  // drop a label that would collide with the next one
  return labels.filter((l, i) => !labels[i + 1] || labels[i + 1].w - l.w >= 3);
}

function summarize(days) {
  const total = days.reduce((sum, d) => sum + d.count, 0);
  const active = days.filter((d) => d.count > 0).length;
  const firstActive = days.findIndex((d) => d.count > 0);
  const span = firstActive === -1 ? 0 : days.length - firstActive;
  let longest = 0;
  let run = 0;
  days.forEach((d) => {
    run = d.count > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  });
  return { total, active, span, longest };
}

export default function GitHubStats() {
  const [data, setData] = useState(null);
  const [contributions, setContributions] = useState(null);
  const [error, setError] = useState(false);
  const [contribError, setContribError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${profile.githubUsername}`)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub user not found");
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true));

    fetch(`/api/github?username=${profile.githubUsername}`)
      .then((res) => {
        if (!res.ok) throw new Error("Contribution fetch failed");
        return res.json();
      })
      .then((result) => setContributions(result.contributions))
      .catch(() => setContribError(true));
  }, []);

  const days = useMemo(() => {
    const today = todayString();
    return (contributions || []).filter((d) => d.date <= today);
  }, [contributions]);
  const weeks = useMemo(() => buildWeeks(days), [days]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);
  const sum = useMemo(() => summarize(days), [days]);

  const hasContrib = days.length > 0;
  const stats = [
    { label: "Public Repos", value: data ? data.public_repos : error ? "—" : "…" },
    { label: "Total Contributions", value: hasContrib ? sum.total.toLocaleString() : "—" },
    { label: "Active Days", value: hasContrib ? `${sum.active}/${sum.span}` : "—" },
    { label: "Longest Streak", value: hasContrib ? `${sum.longest}d` : "—" },
  ];

  return (
    <section id="github" className="section gh">
      <h2 className="section-title">GitHub</h2>

      <div className="gh-stats">
        {stats.map((s) => (
          <div className="gh-stat" key={s.label}>
            <span className="gh-stat-value">{s.value}</span>
            <span className="gh-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="gh-panel">
        <div className="gh-panel-head">
          <h3 className="gh-panel-title">Contribution Activity</h3>
          <a className="gh-profile" href={profile.github} target="_blank" rel="noreferrer">
            View Profile <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        {contribError ? (
          <p className="gh-note">
            Contribution graph couldn&apos;t load. Locally, the <code>/api/github</code> function
            must be running (for example with <code>vercel dev</code>) with <code>GITHUB_TOKEN</code> set.
          </p>
        ) : !hasContrib ? (
          <p className="gh-note">Loading contributions…</p>
        ) : (
          <>
            <div className="gh-scroll">
              <div className="gh-chart" style={{ "--weeks": weeks.length }}>
                <div className="gh-months" aria-hidden="true">
                  {labels.map((l) => (
                    <span className="gh-month" key={l.w} style={{ gridColumn: l.w + 2 }}>
                      {l.name}
                    </span>
                  ))}
                </div>

                <div
                  className="gh-grid"
                  role="img"
                  aria-label={`${sum.total} contributions, ${sum.active} active days`}
                >
                  {DAY_LABELS.map((d, i) => (
                    <span className="gh-day" key={`label-${i}`}>
                      {d}
                    </span>
                  ))}
                  {weeks.flatMap((week, w) =>
                    week.map((day, i) =>
                      day ? (
                        <div
                          key={day.date}
                          className={`gh-cell level-${levelFor(day.count)}`}
                          title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                        />
                      ) : (
                        <div key={`empty-${w}-${i}`} className="gh-cell is-empty" />
                      )
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="gh-legend" aria-hidden="true">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} className={`gh-cell level-${l}`} />
              ))}
              <span>More</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}