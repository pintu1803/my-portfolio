import React from "react";
import { profile } from "../data";

export default function GitHubStats() {
  return (
    <section id="github" className="section">
      <h2 className="section-title">GitHub</h2>
      <div className="github-card">
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&theme=transparent&hide_border=true`}
          alt="GitHub stats"
        />
      </div>
    </section>
  );
}
