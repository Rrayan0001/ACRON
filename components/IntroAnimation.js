"use client";

import { useEffect, useState } from "react";

/**
 * Cinematic intro mask animation for ArCon.
 *
 * Timeline (total ≈ 2.8 s):
 *   0.00 s  – init   (black screen)
 *   0.15 s  – grid   (architectural lines draw in)
 *   0.70 s  – reveal (logo clip-path wipe)
 *   2.00 s  – transition (overlay wipes up)
 *   2.80 s  – complete
 */
export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState("init");

  useEffect(() => {
    document.body.classList.add("intro-active");

    const t1 = setTimeout(() => setPhase("grid"), 150);
    const t2 = setTimeout(() => setPhase("reveal"), 700);
    const t3 = setTimeout(() => setPhase("transition"), 2000);
    const t4 = setTimeout(() => {
      setPhase("complete");
      document.body.classList.remove("intro-active");
      onComplete?.();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.classList.remove("intro-active");
    };
  }, [onComplete]);

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
