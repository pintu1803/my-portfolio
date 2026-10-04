import React from "react";
import { FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "../data";
import "./HireMe.css";

// last path segment of a profile URL, e.g. https://x.com/foo -> foo
const tail = (url) => (url ? url.replace(/\/+$/, "").split("/").pop() : "");

const contacts = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}?subject=Let%27s%20work%20together`,
    Icon: FiMail,
  },
  {
    label: "LinkedIn",
    value: tail(profile.linkedin) && `in/${tail(profile.linkedin)}`,
    href: profile.linkedin,
    Icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "X",
    value: tail(profile.x) && `@${tail(profile.x)}`,
    href: profile.x,
    Icon: FaXTwitter,
    external: true,
  },
].filter((c) => c.href && c.value);

export default function HireMe() {
  return (
    <section id="hire" className="section hire">
      <h2 className="section-title">Hire Me</h2>

      <div className="hire-box">
        <h3 className="hire-heading">
          Building something that needs a solid backend or an AI pipeline?
        </h3>
        <p className="hire-text">
          I&rsquo;m open to backend and AI/ML engineering roles, and select contract work &mdash;
          distributed systems, production APIs, and RAG pipelines. No forms, no gatekeeping:
          reach out directly.
        </p>

        <div className="hire-links">
          {contacts.map(({ label, value, href, Icon, external }) => (
            <a
              key={label}
              className="hire-card"
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="hire-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="hire-info">
                <span className="hire-label">{label}</span>
                <span className="hire-value">{value}</span>
              </span>
              <FiArrowUpRight className="hire-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}