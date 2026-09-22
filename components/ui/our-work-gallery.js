"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SWIPE_THRESHOLD_PX = 40;

export default function OurWorkGallery({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const touchStartX = useRef(null);

  const count = items.length;

  const goTo = useCallback(
    (index) => {
      if (!count) return;
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );

  const safeIndex = count ? ((activeIndex % count) + count) % count : 0;

  const onPrev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex]);
  const onNext = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex]);

  const selectAndHold = useCallback(
    (index) => {
      goTo(index);
      setPaused(true);
    },
    [goTo]
  );

  const handleMainTouchStart = useCallback((event) => {
    if (event.touches.length !== 1) return;
    touchStartX.current = event.touches[0].clientX;
  }, []);

  const handleMainTouchEnd = useCallback(
    (event) => {
      if (touchStartX.current === null) return;
      const endX = event.changedTouches[0]?.clientX;
      if (typeof endX !== "number") {
        touchStartX.current = null;
        return;
      }
      const dx = endX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
      if (dx < 0) onNext();
      else onPrev();
    },
    [onNext, onPrev]
  );

  if (!count) return null;

  const active = items[safeIndex];

  // Duplicate list for a seamless CSS marquee loop.
  const loopItems = [...items, ...items];

  return (
    <div className="work-gallery-shell">
      {/* Center stage — one image, full frame, no cropping, no captions.
          Swipe left/right on touch screens. */}
      <div
        className="work-main"
        onTouchStart={handleMainTouchStart}
        onTouchEnd={handleMainTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.figure
            key={active.src}
            className="work-main-figure"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={active.src}
              alt={active.alt || ""}
              fill
              sizes="(max-width: 760px) 94vw, (max-width: 1100px) 92vw, 1080px"
              className="work-main-image"
              priority
            />
          </motion.figure>
        </AnimatePresence>

        <button
          type="button"
          className="work-arrow work-arrow-left"
          onClick={onPrev}
          aria-label="Show previous image"
        >
          ‹
        </button>
        <button
          type="button"
          className="work-arrow work-arrow-right"
          onClick={onNext}
          aria-label="Show next image"
        >
          ›
        </button>
      </div>

      {/* Marquee strip — hover/touch to stop, tap any thumb to show it center */}
      <div className="work-marquee-row">
        <div
          className="work-marquee-viewport"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <div
            className={`work-marquee-track${paused ? " is-paused" : ""}`}
            aria-label="Project images. Hover to stop, select an image to view it above."
          >
            {loopItems.map((item, i) => {
              const originalIndex = i % count;
              const isActive = originalIndex === safeIndex;
              return (
                <button
                  key={`${item.src}-${i}`}
                  type="button"
                  tabIndex={i < count ? 0 : -1}
                  aria-hidden={i < count ? undefined : true}
                  aria-label={`Show image ${originalIndex + 1}`}
                  aria-pressed={isActive}
                  className={`work-thumb${isActive ? " is-active" : ""}`}
                  onClick={() => selectAndHold(originalIndex)}
                >
                  <Image
                    src={item.src}
                    alt=""
                    width={320}
                    height={200}
                    sizes="160px"
                    className="work-thumb-image"
                    loading={originalIndex < 2 && i < count ? "eager" : "lazy"}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="work-pause-btn"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Resume scrolling images" : "Stop scrolling images"}
        >
          {paused ? "▶" : "❚❚"}
        </button>
      </div>
    </div>
  );
}
