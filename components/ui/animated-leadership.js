"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export default function AnimatedLeadership({ leaders, autoplay = true }) {
  const [active, setActive] = useState(0);
  const total = leaders.length;

  const placeholders = useMemo(
    () =>
      leaders.map((leader, index) => ({
        ...leader,
        initials: getInitials(leader.name),
        iconShape: index % 2 === 0 ? "gear" : "grid",
      })),
    [leaders]
  );

  useEffect(() => {
    if (!autoplay || total <= 1) return undefined;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5200);
    return () => window.clearInterval(id);
  }, [autoplay, total]);

  const onNext = () => {
    setActive((prev) => (prev + 1) % total);
  };

  const onPrev = () => {
    setActive((prev) => (prev - 1 + total) % total);
  };

  if (!leaders.length) return null;

  return (
    <div className="leadership-shell">
      <div className="leadership-layout">
        <div className="leadership-stack">
          <AnimatePresence mode="wait">
            {placeholders.map((leader, index) => {
              const isActive = index === active;
              return (
                <motion.div
                  key={leader.name}
                  initial={{
                    opacity: 0,
                    scale: 0.94,
                    rotate: index % 2 === 0 ? -4 : 4,
                  }}
                  animate={{
                    opacity: isActive ? 1 : 0.52,
                    scale: isActive ? 1 : 0.93,
                    rotate: isActive ? 0 : index % 2 === 0 ? -3 : 3,
                    y: isActive ? [0, -5, 0] : 0,
                    zIndex: isActive ? 20 : 10 - index,
                  }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="leadership-card"
                >
                  <div className="leadership-card-inner">
                    <div
                      className={`leadership-icon leadership-icon-${leader.iconShape}`}
                      aria-hidden="true"
                    >
                      <span>{leader.initials}</span>
                    </div>
                    <p className="leadership-card-label">Leadership Profile</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="leadership-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
            >
              <h3 className="leadership-name">{leaders[active].name}</h3>
              <p className="leadership-role">{leaders[active].role}</p>
              <p className="leadership-quote">{leaders[active].summary}</p>
            </motion.div>
          </AnimatePresence>

          <div className="leadership-controls">
            <button
              type="button"
              onClick={onPrev}
              className="leadership-nav-btn"
              aria-label="Previous leader"
            >
              ←
            </button>
            <button
              type="button"
              onClick={onNext}
              className="leadership-nav-btn"
              aria-label="Next leader"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
