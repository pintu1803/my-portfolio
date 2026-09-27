import React, { useState, useEffect } from "react";
import { profile } from "../data";

function levelFor(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export default function GitHubStats() {
  const [data, setData] = useState(null);
  const [contributions, setContributions] = useState([]);
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

  return (
    <section id="github" className="section">
      <h2 className="section-title">GitHub</h2>

      {error && <p className="card-desc">Couldn&apos;t load GitHub stats.</p>}

      {!error && !data && <p className="card-desc">Loading GitHub stats…</p>}

      {data && (
        <div className="card github-card-inner">
          <div className="stats">
            <div className="stat">
              <span className="stat-value">{data.public_repos}</span>
              <span className="stat-label">Public Repos</span>
            </div>
            <div className="stat">
              <span className="stat-value">{data.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">{data.following}</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {new Date(data.created_at).getFullYear()}
              </span>
              <span className="stat-label">Member Since</span>
            </div>
          </div>

          {contribError ? (
            <p className="card-desc">
              Contribution graph didn&apos;t load — check the Vercel function
              logs for <code>/api/github</code> (likely a token or scope
              issue).
            </p>
          ) : (
            <div className="contrib-wrap">
              <div className="contrib-grid">
                {contributions.map((day) => (
                  <div
                    key={day.date}
                    className={`contrib-box level-${levelFor(day.count)}`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            </div>
          )}

          <a
            href={data.html_url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            View Profile
          </a>
        </div>
      )}
    </section>
  );
}
