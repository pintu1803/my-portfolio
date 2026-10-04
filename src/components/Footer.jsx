import React from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { profile } from "../data";

const links = [
  { label: "GitHub", href: profile.github, Icon: FaGithub, external: true },
  { label: "LinkedIn", href: profile.linkedin, Icon: FaLinkedinIn, external: true },
  { label: "X", href: profile.x, Icon: FaXTwitter, external: true },
  { label: "Email", href: `mailto:${profile.email}`, Icon: FaEnvelope },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="footer-name">{profile.name}</p>
        <p className="footer-tagline">{profile.title}</p>
      </div>
      <div className="footer-links">
        {links
          .filter((l) => l.href)
          .map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <Icon />
            </a>
          ))}
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}