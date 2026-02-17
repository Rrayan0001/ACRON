"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

function StepIcon({ index }) {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16 16l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3c-3.2 0-5.8 2.6-5.8 5.8 0 2 1 3.8 2.7 4.9V17h6.2v-3.3c1.7-1.1 2.7-2.9 2.7-4.9C17.8 5.6 15.2 3 12 3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 20h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <rect x="4" y="10" width="16" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <rect x="4" y="16" width="16" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 16h3l2-5 3 7 2-4h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="4" cy="16" r="1.2" fill="currentColor" />
          <circle cx="20" cy="14" r="1.2" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 12.5 10.4 16 17 8.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

function ProcessStep({ step, index, activeStep, onClick }) {
  const isActive = activeStep === index;
  const isCompleted = activeStep > index;

  return (
    <button
      type="button"
      className={`process-step-item ${isActive ? "is-active" : ""} ${isCompleted ? "is-completed" : ""}`}
      onClick={() => onClick(index)}
      aria-label={`Activate step ${index + 1}: ${step.title}`}
    >
      <span className={`process-node-aura ${isActive ? "is-active" : ""}`} aria-hidden="true" />
      <span className="process-node" aria-hidden="true">
        <StepIcon index={index} />
        <span className={`process-step-badge ${isActive ? "is-active" : ""}`}>{index + 1}</span>
      </span>
      <span className="process-node-label">{step.title}</span>
    </button>
  );
}

function Connector({ isActive, isCompleted }) {
  return (
    <div className="process-connector" aria-hidden="true">
      <span
        className={`process-connector-fill ${isCompleted ? "is-completed" : ""} ${isActive ? "is-active" : ""}`}
      />
      {isActive ? <span className="process-connector-energy" /> : null}
    </div>
  );
}

export default function AnimatedProcess({ steps, className = "" }) {
  const items = useMemo(() => steps || [], [steps]);
  const [activeStep, setActiveStep] = useState(0);
  const [cycleSeed, setCycleSeed] = useState(0);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const interval = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [items.length, cycleSeed]);

  if (!items.length) return null;
  const activeItem = items[activeStep];

  return (
    <div className={`process-animated-shell ${className}`.trim()}>
      <div className="process-steps-row">
        {items.map((step, index) => (
          <Fragment key={step.title}>
            <ProcessStep
              step={step}
              index={index}
              activeStep={activeStep}
              onClick={(selectedIndex) => {
                setActiveStep(selectedIndex);
                // Continue auto-cycle from the user-selected step.
                setCycleSeed((prev) => prev + 1);
              }}
            />
            {index < items.length - 1 ? (
              <Connector isActive={activeStep === index} isCompleted={activeStep > index} />
            ) : null}
          </Fragment>
        ))}
      </div>

      <div className="process-controls-row">
        <p className="process-active-text">
          Phase 0{activeStep + 1}: {activeItem.title}
        </p>

        <div className="process-dots" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={`dot-${i}`}
              className={`process-dot ${activeStep === i ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
