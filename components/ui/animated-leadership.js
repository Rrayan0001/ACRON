"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AnimatedLeadership({ leaders }) {
  if (!leaders.length) return null;

  return (
    <div className="leadership-shell">
      <div className="leadership-layout leadership-layout-stacked">
        {leaders.map((leader, index) => (
          <motion.article
            key={leader.name}
            initial={{ y: 14, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.32, delay: index * 0.08, ease: "easeOut" }}
            className="leadership-card leadership-card-static"
          >
            <div className="leadership-card-inner leadership-card-vertical">
              <div className="leadership-photo-frame">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="leadership-photo"
                  sizes="(max-width: 760px) 100vw, 900px"
                  style={{
                    objectPosition: leader.name.includes("Aditi")
                      ? "center 10%"
                      : "center 24%",
                  }}
                />
              </div>

              <div className="leadership-copy">
                <h3 className="leadership-name">{leader.name}</h3>
                <p className="leadership-role">{leader.role}</p>
                <p className="leadership-quote">{leader.summary}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
