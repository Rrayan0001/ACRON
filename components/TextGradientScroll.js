"use client";

import React, { createContext, useContext, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const TextGradientScrollContext = createContext({});

function useGradientScroll() {
    return useContext(TextGradientScrollContext);
}

/**
 * TextGradientScroll — text reveals letter-by-letter (or word-by-word) as the
 * user scrolls. Adapted from the Tailwind/TS original to vanilla CSS + JS.
 *
 * Props:
 *  - text       (string, required)
 *  - type       "letter" | "word"   (default "letter")
 *  - textOpacity "none" | "soft" | "medium" (default "soft")
 *  - className  extra CSS class for the wrapper <p>
 */
export function TextGradientScroll({
    text,
    className = "",
    type = "letter",
    textOpacity = "soft",
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });

    const words = text.split(" ");

    return (
        <TextGradientScrollContext.Provider value={{ textOpacity, type }}>
            <p
                ref={ref}
                className={`tgs-wrapper ${className}`}
            >
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + 1 / words.length;
                    return type === "word" ? (
                        <Word key={i} progress={scrollYProgress} range={[start, end]}>
                            {word}
                        </Word>
                    ) : (
                        <Letter key={i} progress={scrollYProgress} range={[start, end]}>
                            {word}
                        </Letter>
                    );
                })}
            </p>
        </TextGradientScrollContext.Provider>
    );
}

const Word = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span className="tgs-word">
            <span className="tgs-ghost">{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
};

const Letter = ({ children, progress, range }) => {
    if (typeof children !== "string") return null;

    const amount = range[1] - range[0];
    const step = amount / children.length;

    return (
        <span className="tgs-word">
            {children.split("").map((char, i) => {
                const start = range[0] + i * step;
                const end = range[0] + (i + 1) * step;
                return (
                    <Char key={`c_${i}`} progress={progress} range={[start, end]}>
                        {char}
                    </Char>
                );
            })}
        </span>
    );
};

const Char = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    const { textOpacity } = useGradientScroll();

    const ghostOpacity =
        textOpacity === "none" ? 0 : textOpacity === "medium" ? 0.3 : 0.1;

    return (
        <span className="tgs-char">
            <span className="tgs-ghost-char" style={{ opacity: ghostOpacity }}>
                {children}
            </span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
};
