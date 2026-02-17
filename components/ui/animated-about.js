"use client";

import { useMemo, useRef } from "react";

function FeatureGlyph({ index }) {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3.5 14.6 5l2.9-.4.9 2.8 2.3 1.8-1.4 2.6 1.4 2.6-2.3 1.8-.9 2.8-2.9-.4L12 20.5l-2.6-1.5-2.9.4-.9-2.8-2.3-1.8 1.4-2.6-1.4-2.6 2.3-1.8.9-2.8 2.9.4L12 3.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3.2 19 6v5.8c0 4.6-3.1 7.7-7 9-3.9-1.3-7-4.4-7-9V6l7-2.8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M8.8 11.9 11 14.1l4.3-4.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 8.2h14M5 12h10M5 15.8h8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M15.8 18.2 19 15l-3.2-3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 16.5 10.2 11.3l3.1 3.1L19 8.7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15.6 8.7H19v3.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}

function CoreGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 5.5h15v13h-15Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2.8v5.4M12 2.8v5.4M16 2.8v5.4M8 15.8v5.4M12 15.8v5.4M16 15.8v5.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2.8 8h5.4M2.8 12h5.4M2.8 16h5.4M15.8 8h5.4M15.8 12h5.4M15.8 16h5.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const featureToneClasses = ["tone-amber", "tone-sky", "tone-mint", "tone-violet"];

export default function AnimatedAbout({
  summary,
  highlights,
  ctaHref = "#contact",
}) {
  const shellRef = useRef(null);

  const featureItems = useMemo(() => highlights || [], [highlights]);

  const handleMouseMove = (event) => {
    const node = shellRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    node.style.setProperty("--about-pointer-x", `${clampedX.toFixed(2)}%`);
    node.style.setProperty("--about-pointer-y", `${clampedY.toFixed(2)}%`);
  };

  const handleMouseLeave = () => {
    const node = shellRef.current;
    if (!node) return;
    node.style.setProperty("--about-pointer-x", "50%");
    node.style.setProperty("--about-pointer-y", "50%");
  };

  if (!featureItems.length) return null;

  return (
    <div
      ref={shellRef}
      className="about-immersive-shell is-ready"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="about-ambient" aria-hidden="true">
        <span className="about-orb about-orb-a" />
        <span className="about-orb about-orb-b" />
        <span className="about-grid-overlay" />
        <span className="about-scanline" />
      </div>

      <div className="about-immersive-grid">
        <div className="about-immersive-copy">
          <p className="about-chip">
            <span className="about-chip-dot" aria-hidden="true" />
            ABOUT ARCON
          </p>

          <p className="about-summary">
            {summary}
          </p>

          <div className="about-feature-grid">
            {featureItems.map((item, index) => (
              <article
                className={`about-feature-card ${featureToneClasses[index % featureToneClasses.length]}`}
                key={item.title}
              >
                <div className="about-feature-icon" aria-hidden="true">
                  <FeatureGlyph index={index} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="about-immersive-visual" aria-hidden="true">
          <div className="about-core-wrap">
            <span className="about-ring about-ring-outer" />
            <span className="about-ring about-ring-middle" />
            <span className="about-ring about-ring-inner" />

            <span className="about-node about-node-1" />
            <span className="about-node about-node-2" />
            <span className="about-node about-node-3" />
            <span className="about-node about-node-4" />
            <span className="about-node about-node-5" />
            <span className="about-node about-node-6" />

            <div className="about-core-card">
              <span className="about-core-icon">
                <CoreGlyph />
              </span>
              <p className="about-core-title">ArCon</p>
              <p className="about-core-sub">Design + Site</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="about-cta-strip">
        <div className="about-cta-metric">
          <p>Execution Support</p>
          <small>Execution support and progress coordination</small>
        </div>
        <div className="about-cta-divider" aria-hidden="true" />
        <div className="about-cta-metric">
          <p>Handover Ready</p>
          <small>Final validation and handover readiness</small>
        </div>
        <a href={ctaHref} className="btn btn-dark about-cta-btn">
          Connect with ArCon
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
