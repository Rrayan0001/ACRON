"use client";

import { useEffect, useState } from "react";

/**
 * Cinematic intro mask animation for ArCon.
 *
 * Timeline (total ≈ 2.8 s):
 *   0.00 s  – init   (black screen)
 *   0.15 s  – grid   (architectural lines draw in)
 *   0.70 s  – reveal (logo + subtitle clip-path wipe)
 *   2.00 s  – transition (overlay wipes up, logo shrinks to header)
 *   2.80 s  – complete
 */
export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState("init");
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("intro-active");

    const t1 = setTimeout(() => setPhase("grid"), 150);
    const t2 = setTimeout(() => setPhase("reveal"), 700);
    const t3 = setTimeout(() => setBtnVisible(true), 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.classList.remove("intro-active");
    };
  }, []);

  const handleLiveClick = () => {
    setBtnVisible(false);
    setPhase("transition");
    setTimeout(() => {
      setPhase("complete");
      document.body.classList.remove("intro-active");
      onComplete?.();
    }, 800);
  };

  if (phase === "complete") return null;

  const ease = "cubic-bezier(0.76, 0, 0.24, 1)";
  const isTransitioning = phase === "transition";

  return (
    <>
      {/* ===== BLACK OVERLAY — wipes upward to reveal the page ===== */}
      <div
        className="intro-overlay"
        style={{
          transitionTimingFunction: ease,
          clipPath: isTransitioning ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
        }}
      >
        {/* Architectural grid lines */}
        <div
          className={`intro-grid intro-grid-v1 ${phase !== "init" ? "draw" : ""}`}
          style={{ transitionTimingFunction: ease }}
        />
        <div
          className={`intro-grid intro-grid-v2 ${phase !== "init" ? "draw" : ""}`}
          style={{ transitionTimingFunction: ease }}
        />
        <div
          className={`intro-grid intro-grid-h1 ${phase !== "init" ? "draw" : ""}`}
          style={{ transitionTimingFunction: ease }}
        />
      </div>

      {/* ===== SUBTITLE ===== */}
      <div
        className="intro-sub"
        style={{
          transitionTimingFunction: ease,
          opacity: phase === "reveal" ? 1 : 0,
          transform:
            phase === "reveal"
              ? "translate(-50%, 0)"
              : "translate(-50%, 15px)",
          pointerEvents: btnVisible ? "auto" : "none",
        }}
      >
        <span className="intro-sub-text intro-sub-line1">“Now Live: Arcon ESPL.”</span>
        <span className="intro-sub-text intro-sub-line2">Your trusted partner in progress.</span>
        <button
          onClick={handleLiveClick}
          className="btn btn-dark"
          style={{
            marginTop: "1.5rem",
            opacity: btnVisible ? 1 : 0,
            transform: btnVisible ? "translateY(0)" : "translateY(10px)",
            transition: `all 600ms ${ease}`,
            pointerEvents: btnVisible ? "auto" : "none",
            backgroundColor: "#1673af",
            color: "#fff",
            border: "none",
            padding: "0.8rem 2.5rem",
            fontSize: "1.2rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            boxShadow: "0 4px 12px rgba(22, 115, 175, 0.3)",
          }}
        >
          Live
        </button>
      </div>

      {/* ===== LOGO TEXT — center → header ===== */}
      <h1
        className="intro-logo"
        aria-hidden="true"
        style={{
          transitionTimingFunction: ease,
          clipPath:
            phase === "init" || phase === "grid"
              ? "inset(0 100% 0 0)"
              : "inset(0 0 0 0)",
          ...(isTransitioning
            ? {
                top: "1.6rem",
                left: "clamp(1.5rem, 4vw, 3rem)",
                transform: "translate(0, 0) scaleX(1)",
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                letterSpacing: "0.06em",
                opacity: 0,
              }
            : {
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scaleX(${
                  phase === "init" || phase === "grid" ? 1.06 : 1
                })`,
                fontSize: "clamp(3.5rem, 11vw, 9rem)",
                letterSpacing: "0.08em",
                opacity: 1,
              }),
        }}
      >
        <span className="intro-logo-ar">Ar</span>
        <span className="intro-logo-con">Con</span>
      </h1>
    </>
  );
}
