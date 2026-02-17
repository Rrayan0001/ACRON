"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function MarqueeAnimation({
  children,
  className = "",
  direction = "left",
  baseVelocity = 6,
}) {
  const repeatCount = 10;
  const loopStep = 100 / repeatCount;
  const shouldReduceMotion = useReducedMotion();
  const baseX = useMotionValue(direction === "left" ? 0 : -loopStep);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 280,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 0.18], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const directionFactor = useRef(direction === "left" ? -1 : 1);

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return;

    directionFactor.current = direction === "left" ? -1 : 1;
    const frameVelocity = Math.abs(baseVelocity) * (delta / 1000);
    const moveBy =
      directionFactor.current * frameVelocity * (1 + velocityFactor.get());
    let next = baseX.get() + moveBy;

    if (directionFactor.current < 0 && next <= -loopStep) {
      next += loopStep;
    }
    if (directionFactor.current > 0 && next >= 0) {
      next -= loopStep;
    }

    baseX.set(next);
  });

  return (
    <div className="marquee-track-viewport">
      <motion.div className={`marquee-track ${className}`.trim()} style={{ x }}>
        {Array.from({ length: repeatCount }, (_, index) => (
          <span key={index}>{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

export { MarqueeAnimation };
