"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MarqueeAnimation } from "@/components/ui/marquee-effect";
import AnimatedLeadership from "@/components/ui/animated-leadership";
import AnimatedProcess from "@/components/ui/animated-process";
import AnimatedAbout from "@/components/ui/animated-about";

const services = [
  {
    title: "Mechanical, HVAC & MEP Design",
    text: "Complete planning, system sizing, equipment selection, and fully coordinated layouts for efficient performance.",
    tag: "Design",
  },
  {
    title: "Architectural Planning & Coordination",
    text: "Practical architectural planning aligned to statutory requirements, client objectives, and buildability.",
    tag: "Architecture",
  },
  {
    title: "Civil & Structural Support",
    text: "Integrated civil and structural support with MEP coordination to reduce clashes and avoid on-site rework.",
    tag: "Execution",
  },
  {
    title: "Project & Construction Management",
    text: "End-to-end management focused on scope control, timeline discipline, quality assurance, and reporting clarity.",
    tag: "Management",
  },
  {
    title: "Contracts & Technical Advisory",
    text: "Technical review, contract documentation support, due diligence, and value engineering for better outcomes.",
    tag: "Advisory",
  },
  {
    title: "Design-to-Site Integration",
    text: "Continuous alignment between office design intent and field implementation conditions through all phases.",
    tag: "Integration",
  },
];

const processSteps = [
  "Requirement study and consultation",
  "Concept and design feasibility alignment",
  "Detailed multidisciplinary engineering package",
  "Execution support and progress coordination",
  "Final validation and handover readiness",
];

const aboutSummary =
  "ArCon Engineering Services Pvt Ltd is a multidisciplinary consultancy focused on reliable, efficient, and execution-ready outcomes. We bridge technical design and on-site realities with a practical approach to coordination.";

const aboutHighlights = [
  {
    title: "Client-First Planning",
    desc: "Client-first planning based on budget and timelines",
  },
  {
    title: "Compliance-Focused",
    desc: "Compliance-focused design development",
  },
  {
    title: "Transparent Communication",
    desc: "Transparent communication through each stage",
  },
  {
    title: "Long-Term Value",
    desc: "Long-term value through quality and consistency",
  },
];

const processItems = processSteps.map((title) => ({
  title,
  desc: title,
}));

const marqueeCompanyLine = "ArCon Engineering Services Private Limited •";
const marqueeSignatureLine =
  "From Design Desk to Site Reality • Zero-Guesswork Coordination • Handover-Ready Documentation • Built for Long-Term Performance •";
const primaryNavLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

const team = [
  {
    name: "Mrs. Aditi Patil-Kanavalli",
    role: "Director",
    summary:
      "12+ years of UAE experience across mechanical design, MEP/civil facade management, contracts, and operations leadership.",
  },
  {
    name: "Mr. Sudhir Patil",
    role: "Director Partner",
    summary:
      "Three decades of civil construction experience across residential and commercial projects with strong site execution control.",
  },
];

const projectTemplates = [
  {
    name: "Commercial Office Engineering Package",
    type: "Commercial",
    scope: "HVAC + Electrical + Plumbing coordination",
    year: "2025",
  },
  {
    name: "Residential Tower Services Optimization",
    type: "Residential",
    scope: "Cooling load study and MEP redesign",
    year: "2025",
  },
  {
    name: "Mixed-Use Utility Integration",
    type: "Mixed-use",
    scope: "MEP and civil clash mitigation strategy",
    year: "2024",
  },
  {
    name: "Facade & Site Delivery Management",
    type: "Execution",
    scope: "Contractor coordination and progress control",
    year: "2024",
  },
  {
    name: "Technical Due Diligence Review",
    type: "Advisory",
    scope: "Design compliance and value engineering",
    year: "2025",
  },
  {
    name: "Industrial Ducting Coordination Model",
    type: "Mechanical",
    scope: "Practical routing for maintainability",
    year: "2024",
  },
];

const portfolioImages = [
  {
    src: "/images/arcon/site-plan-table.jpg",
    alt: "ArCon team reviewing construction drawings at a planning table.",
  },
  {
    src: "/images/arcon/coordination-desk.jpg",
    alt: "Engineering team collaborating over blueprint documents.",
  },
  {
    src: "/images/arcon/hvac-overlay.jpg",
    alt: "HVAC system concept overlay on an industrial plant visual.",
  },
  {
    src: "/images/arcon/digital-twin-room.jpg",
    alt: "Engineering planning session with digital twin style visualization.",
  },
  {
    src: "/images/arcon/bim-routing.jpg",
    alt: "Color-coded BIM routing across facility service lines.",
  },
  {
    src: "/images/arcon/helmet-team.jpg",
    alt: "Team members in safety helmets reviewing plan documents.",
  },
];

const maxUniqueProjects = Math.min(projectTemplates.length, portfolioImages.length);

const allProjectItems = Array.from(
  { length: maxUniqueProjects },
  (_, index) => {
    const sequence = index + 1;
    const template = projectTemplates[index];
    return {
      id: `project-${sequence}`,
      sequence,
      ...template,
    };
  }
);

export default function Home() {
  const [formNote, setFormNote] = useState("");
  const navCursorProps = {
    onMouseMove: handleNavCursorMove,
    onMouseLeave: handleNavCursorLeave,
  };

  // Presentation-style reveal with a viewport fallback so sections never stay empty.
  useEffect(() => {
    const revealSelectors = ".reveal-item, .reveal-card, .reveal-media";
    const nodes = Array.from(document.querySelectorAll(revealSelectors));
    if (!nodes.length) return undefined;

    const revealInViewport = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const enterTop = vh * 0.96;
      const enterBottom = vh * 0.04;

      nodes.forEach((node) => {
        if (node.classList.contains("is-visible")) return;
        const rect = node.getBoundingClientRect();
        const intersectsViewport = rect.top <= enterTop && rect.bottom >= enterBottom;

        if (intersectsViewport) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: [0, 0.01],
        rootMargin: "0px 0px -4% 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));
    revealInViewport();

    const onViewportChange = () => {
      window.requestAnimationFrame(revealInViewport);
    };

    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
    };
  }, []);

  const featuredProject = allProjectItems[0];
  const featuredImage = portfolioImages[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setFormNote("Thanks. Your inquiry has been noted.");
  };

  function handleNavCursorMove(event) {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xRatio = x / rect.width - 0.5;
    const yRatio = y / rect.height - 0.5;

    node.style.setProperty("--nav-cursor-x", `${x}px`);
    node.style.setProperty("--nav-cursor-y", `${y}px`);
    node.style.setProperty("--nav-move-x", `${(xRatio * 10).toFixed(2)}px`);
    node.style.setProperty("--nav-move-y", `${(yRatio * 8).toFixed(2)}px`);
  }

  function handleNavCursorLeave(event) {
    const node = event.currentTarget;
    node.style.setProperty("--nav-cursor-x", "50%");
    node.style.setProperty("--nav-cursor-y", "50%");
    node.style.setProperty("--nav-move-x", "0px");
    node.style.setProperty("--nav-move-y", "0px");
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-row">
          <a href="#home" className="brand">
            <span className="brand-mark">AR</span>
            <span className="brand-label">
              <strong>ArCon</strong>
              <small>Engineering Services</small>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            {primaryNavLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-cursor-item"
                {...navCursorProps}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="btn btn-dark nav-cursor-item nav-cursor-cta"
            href="#contact"
            {...navCursorProps}
          >
            Start Project
          </a>
        </div>
      </header>

      <main id="home">
        {/* ───── HERO ───── */}
        <section className="section section-hero">
          <div className="container hero-grid">
            <div>
              <p className="kicker reveal-item" style={{ "--reveal-delay": "0s" }}>
                ArCon Engineering Services
              </p>
              <h1
                className="reveal-item"
                style={{ "--reveal-delay": "0.12s" }}
              >
                Practical engineering portfolio built for real execution.
              </h1>
              <p className="lead reveal-item" style={{ "--reveal-delay": "0.24s" }}>
                Integrated MEP, HVAC, Civil, and architectural coordination with
                project management support from concept to handover.
              </p>
              <div
                className="hero-actions reveal-item"
                style={{ "--reveal-delay": "0.36s" }}
              >
                <a className="btn btn-dark" href="#projects">
                  View Projects
                </a>
                <a className="btn btn-light" href="#services">
                  View Services
                </a>
              </div>
            </div>

            <aside className="hero-panel reveal-item" style={{ "--reveal-delay": "0.48s" }}>
              <article className="reveal-item" style={{ "--reveal-delay": "0.6s" }}>
                <p className="stat">6+</p>
                <p>Integrated service verticals</p>
              </article>
              <article className="reveal-item" style={{ "--reveal-delay": "0.72s" }}>
                <p className="stat">Design + Site</p>
                <p>Coordination from drawings to execution</p>
              </article>
              <article className="reveal-item" style={{ "--reveal-delay": "0.84s" }}>
                <p className="stat">India + Global</p>
                <p>Local code alignment with international standards</p>
              </article>
            </aside>
          </div>
          <div className="ticker-wrap hero-ticker-wrap">
            <p className="ticker" aria-label="Capabilities">
              <span>
                MEP Engineering • HVAC Planning • Civil Coordination •
                Architectural Integration • Construction Management • Technical
                Advisory • Value Engineering •
              </span>
              <span>
                MEP Engineering • HVAC Planning • Civil Coordination •
                Architectural Integration • Construction Management • Technical
                Advisory • Value Engineering •
              </span>
            </p>
          </div>
        </section>

        {/* ───── ABOUT ───── */}
        <section id="about" className="section">
          <div className="container block">
            <div className="section-head">
              <p className="kicker reveal-item" style={{ "--reveal-delay": "0s" }}>
                About
              </p>
              <h2
                className="reveal-item"
                style={{ "--reveal-delay": "0.12s" }}
              >
                One coordinated team for engineering and delivery.
              </h2>
            </div>
            <div className="reveal-item" style={{ "--reveal-delay": "0.24s" }}>
              <AnimatedAbout
                summary={aboutSummary}
                highlights={aboutHighlights}
                ctaHref="#contact"
              />
            </div>
          </div>
        </section>

        {/* ───── SERVICES ───── */}
        <section id="services" className="section section-alt">
          <div className="container block">
            <div className="section-head">
              <p className="kicker reveal-item" style={{ "--reveal-delay": "0s" }}>
                Services
              </p>
              <h2
                className="reveal-item"
                style={{ "--reveal-delay": "0.12s" }}
              >
                Portfolio capabilities across design and management.
              </h2>
            </div>

            <div className="services-grid services-grid-premium">
              {services.map((service, i) => (
                <article
                  className="card reveal-card service-card"
                  key={service.title}
                  style={{ "--reveal-delay": `${(i + 2) * 0.1}s` }}
                >
                  <p className="pill service-pill">{service.tag}</p>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-copy">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── PROCESS ───── */}
        <section className="section">
          <div className="container block">
            <div className="section-head">
              <p className="kicker reveal-item" style={{ "--reveal-delay": "0s" }}>
                Process
              </p>
              <h2
                className="reveal-item"
                style={{ "--reveal-delay": "0.12s" }}
              >
                Structured workflow, measurable delivery.
              </h2>
            </div>
            <div className="reveal-item" style={{ "--reveal-delay": "0.24s" }}>
              <AnimatedProcess steps={processItems} />
            </div>
          </div>
        </section>

        {/* ───── PROCESS MARQUEE ───── */}
        <section className="section section-alt marquee-process-section">
          <div className="marquee-stack">
            <MarqueeAnimation
              direction="left"
              baseVelocity={4}
              className="marquee-track-primary"
            >
              {marqueeCompanyLine}
            </MarqueeAnimation>

            <MarqueeAnimation
              direction="right"
              baseVelocity={1.8}
              className="marquee-track-secondary"
            >
              {marqueeSignatureLine}
            </MarqueeAnimation>
          </div>
        </section>

        {/* ───── PROJECTS ───── */}
        <section id="projects" className="section section-alt">
          <div className="container block">
            <div className="section-head">
              <h2
                className="reveal-item"
                style={{ "--reveal-delay": "0s" }}
              >
                Projects.
              </h2>
              <p
                className="portfolio-subline reveal-item"
                style={{ "--reveal-delay": "0.12s" }}
              >
                Real coordination-led engineering snapshots across commercial,
                residential, and mixed-use scopes.
              </p>
            </div>

            <div className="portfolio-stage">
              <article
                className="portfolio-feature reveal-item"
                style={{ "--reveal-delay": "0.36s" }}
              >
                <figure
                  className="portfolio-feature-media reveal-media"
                  style={{ "--reveal-delay": "0.48s" }}
                >
                  <Image
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    fill
                    className="portfolio-feature-image"
                    sizes="(max-width: 760px) 94vw, (max-width: 1100px) 92vw, 58vw"
                    priority
                  />
                </figure>
                <div className="portfolio-feature-content">
                  <p
                    className="portfolio-meta reveal-item"
                    style={{ "--reveal-delay": "0.6s" }}
                  >
                    Featured • {featuredProject.type} • {featuredProject.year}
                  </p>
                  <h3 className="reveal-item" style={{ "--reveal-delay": "0.72s" }}>
                    {featuredProject.name}
                  </h3>
                  <p className="reveal-item" style={{ "--reveal-delay": "0.84s" }}>
                    {featuredProject.scope}
                  </p>
                  <ul className="feature-points">
                    <li className="reveal-item" style={{ "--reveal-delay": "0.96s" }}>
                      Integrated multidisciplinary coordination
                    </li>
                    <li className="reveal-item" style={{ "--reveal-delay": "1.08s" }}>
                      Design intent aligned with site execution
                    </li>
                    <li className="reveal-item" style={{ "--reveal-delay": "1.2s" }}>
                      Compliance-focused technical output
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="btn btn-dark reveal-item"
                    style={{ "--reveal-delay": "1.32s" }}
                  >
                    Discuss Similar Project
                  </a>
                </div>
              </article>

              <div className="portfolio-grid" aria-live="polite">
                {allProjectItems.slice(1).map((item, i) => {
                  const image =
                    portfolioImages[
                    (item.sequence - 1) % portfolioImages.length
                    ];
                  return (
                    <article
                      className="portfolio-card reveal-card"
                      key={item.id}
                      style={{ "--reveal-delay": `${i * 0.12}s` }}
                    >
                      <figure className="portfolio-media">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={900}
                          height={560}
                          className="portfolio-image"
                        />
                      </figure>
                      <p className="portfolio-meta">
                        {item.type} • Case {String(item.sequence).padStart(2, "0")} •{" "}
                        {item.year}
                      </p>
                      <h3>{item.name}</h3>
                      <p>{item.scope}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ───── TEAM ───── */}
        <section id="team" className="section">
          <div className="container block">
            <div className="section-head">
              <p className="kicker reveal-item" style={{ "--reveal-delay": "0s" }}>
                Leadership
              </p>
              <h2
                className="reveal-item"
                style={{ "--reveal-delay": "0.12s" }}
              >
                Experienced leadership with technical and site depth.
              </h2>
            </div>
            <div className="reveal-item" style={{ "--reveal-delay": "0.24s" }}>
              <AnimatedLeadership leaders={team} autoplay />
            </div>
          </div>
        </section>

        {/* ───── CONTACT ───── */}
        <section id="contact" className="section section-alt">
          <div className="container block contact-grid">
            <div>
              <div className="section-head">
                <p className="kicker reveal-item" style={{ "--reveal-delay": "0s" }}>
                  Contact
                </p>
                <h2
                  className="reveal-item"
                  style={{ "--reveal-delay": "0.12s" }}
                >
                  Discuss your project scope with ArCon.
                </h2>
              </div>
              <p className="reveal-item" style={{ "--reveal-delay": "0.24s" }}>
                <strong>Address:</strong> Block 513F, Plot No. 97, Kumareshwar
                Housing Society, Kelgeri, Dharwad, Karnataka, India - 580007
              </p>
              <p className="reveal-item" style={{ "--reveal-delay": "0.36s" }}>
                <strong>Phone:</strong> +91 81232 15674
              </p>
              <p className="reveal-item" style={{ "--reveal-delay": "0.48s" }}>
                <strong>Email:</strong> arcon.espl@gmail.com
              </p>
            </div>

            <form
              className="contact-form reveal-card"
              onSubmit={handleSubmit}
              style={{ "--reveal-delay": "0.36s" }}
            >
              <label className="reveal-item" style={{ "--reveal-delay": "0.42s" }}>
                Name
                <input type="text" placeholder="Your name" required />
              </label>
              <label className="reveal-item" style={{ "--reveal-delay": "0.56s" }}>
                Email
                <input type="email" placeholder="you@example.com" required />
              </label>
              <label className="reveal-item" style={{ "--reveal-delay": "0.7s" }}>
                Project Type
                <input type="text" placeholder="Residential / Commercial / Mixed-use" />
              </label>
              <label className="reveal-item" style={{ "--reveal-delay": "0.84s" }}>
                Message
                <textarea rows={4} placeholder="Tell us about your requirement" required />
              </label>
              <button
                type="submit"
                className="btn btn-dark reveal-item"
                style={{ "--reveal-delay": "0.98s" }}
              >
                Submit Inquiry
              </button>
              {formNote ? <p className="form-note">{formNote}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <div className="footer-brand-head">
              <span className="brand-mark">AR</span>
              <div>
                <h3>ArCon Engineering Services</h3>
                <p>Integrated design and execution support consultancy.</p>
              </div>
            </div>
            <a className="btn btn-dark" href="#contact">
              Request Consultation
            </a>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#team">Team</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Core Services</h4>
            <ul>
              <li>Mechanical, HVAC & MEP Design</li>
              <li>Architectural Coordination</li>
              <li>Civil & Structural Support</li>
              <li>Project Management</li>
              <li>Technical Advisory</li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Contact</h4>
            <ul>
              <li>+91 81232 15674</li>
              <li>arcon.espl@gmail.com</li>
              <li>Dharwad, Karnataka, India</li>
              <li>
                <a href="#home">Back to top</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} ArCon Engineering Services Private
            Limited. All rights reserved.
          </p>
          <p>CIN: U42909KA2025PTC213058</p>
        </div>
      </footer>
    </>
  );
}
