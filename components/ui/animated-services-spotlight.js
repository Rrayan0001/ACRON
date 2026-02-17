"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.5 5.5 8 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9.5 5.5 16 12l-6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const textMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const mediaMotion = {
  initial: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

export default function AnimatedServicesSpotlight({
  services = [],
  media = [],
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const items = useMemo(() => services.filter(Boolean), [services]);

  if (!items.length) return null;

  const safeIndex = ((activeIndex % items.length) + items.length) % items.length;
  const activeItem = items[safeIndex];
  const mediaItems = media.length ? media : [{ src: "", alt: "" }];
  const activeMedia = mediaItems[safeIndex % mediaItems.length];
  const indexLabel = String(safeIndex + 1).padStart(2, "0");
  const totalLabel = String(items.length).padStart(2, "0");

  const onPrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const onNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <article
      className={`services-spotlight-shell ${isHovered ? "is-hovered" : ""} ${className}`.trim()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
          return;
        }
        setIsHovered(false);
      }}
      aria-label="Service spotlight carousel"
    >
      <div className="services-spotlight-content">
        <div className="services-spotlight-kicker">
          <span className="services-spotlight-line" aria-hidden="true" />
          <span>Featured Service</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeItem.title}-${safeIndex}`}
            className="services-spotlight-copy-wrap"
            initial={shouldReduceMotion ? false : textMotion.initial}
            animate={textMotion.animate}
            exit={shouldReduceMotion ? undefined : textMotion.exit}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="services-spotlight-tag">{activeItem.tag}</p>
            <h3 className="services-spotlight-title">{activeItem.title}</h3>
            <p className="services-spotlight-copy">{activeItem.text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="services-spotlight-nav">
          <button
            type="button"
            className="services-spotlight-arrow"
            onClick={onPrev}
            aria-label="Show previous service"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            className="services-spotlight-arrow"
            onClick={onNext}
            aria-label="Show next service"
          >
            <ArrowRightIcon />
          </button>
          <p className="services-spotlight-counter" aria-live="polite">
            {indexLabel} / {totalLabel}
          </p>
        </div>
      </div>

      <div className="services-spotlight-media-wrap">
        <div className="services-spotlight-frame" aria-hidden="true" />
        <div className="services-spotlight-media">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeMedia.src}-${safeIndex}`}
              className="services-spotlight-media-layer"
              initial={shouldReduceMotion ? false : mediaMotion.initial}
              animate={mediaMotion.animate}
              exit={shouldReduceMotion ? undefined : mediaMotion.exit}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeMedia.src ? (
                <Image
                  src={activeMedia.src}
                  alt={activeMedia.alt || activeItem.title}
                  fill
                  sizes="(max-width: 760px) 92vw, (max-width: 1060px) 78vw, 48vw"
                  className="services-spotlight-image"
                />
              ) : (
                <div className="services-spotlight-fallback" />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="services-spotlight-overlay" aria-hidden="true" />
          <span className="services-spotlight-corner services-spotlight-corner-tl" />
          <span className="services-spotlight-corner services-spotlight-corner-tr" />
          <span className="services-spotlight-corner services-spotlight-corner-bl" />
          <span className="services-spotlight-corner services-spotlight-corner-br" />
        </div>

        <span className="services-spotlight-index">{indexLabel}</span>
      </div>
    </article>
  );
}
