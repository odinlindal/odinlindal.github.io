import { useState, useEffect } from "react";
import "./App.css";

const NAV_LINKS = ["about", "experience", "projects", "skills", "contact"];

const EXPERIENCE = [
  {
    title: "Software Engineering Intern",
    company: "Apple, Inc.",
    location: "Cupertino, CA",
    date: "Jun 2026 – Present",
    type: "Internship",
    bullets: [],
    confidential: true,
    icon: "🍎",
  },
  {
    title: "Student IT Consultant",
    company: "University of Washington, College of Built Environments",
    location: "Seattle, WA",
    date: "Jan 2026 – Present",
    type: "Part-time",
    bullets: [
      "Resolve hardware connectivity and performance issues for Windows/macOS laptops, external displays, and AV systems across classrooms and studios.",
      "Perform disk imaging and software installation for lab computers, ensuring workstations are properly configured for specialized engineering and design applications.",
      "Manage wide-format plotters and high-volume printers, including driver configuration and hands-on hardware troubleshooting.",
      "Facilitate the equipment checkout program, overseeing the distribution and technical health of loaner laptops and peripherals for faculty and students.",
      "Serve as the primary technical resource for the college, providing on-site support for AV setups and presentation technology.",
    ],
    icon: "💻",
  },
  {
    title: "Lead Power Engineer — HuskySat-3",
    company: "Husky Satellite Lab, University of Washington",
    location: "Seattle, WA",
    date: "Oct 2025 – Present",
    type: "Extracurricular",
    bullets: [
      "Designed system-level requirements and power architecture for a first-of-its-kind orbital radar payload on a CubeSat, performing end-to-end power system modeling of solar generation, duty cycles, and battery sizing.",
      "Developed fault-tolerant, real-time spacecraft operational state machines (safe mode, detumble, nominal, commissioning, payload ops) with defined transitions aligned to CubeSat flight practices.",
      "Designed the power distribution architecture, calculating per-subsystem power budgets and margin allocations to ensure reliable operation across all mission phases.",
    ],
    icon: "🛰️",
  },
  {
    title: "STEM Instructor",
    company: "iD Tech Camps, University of California - Los Angeles",
    location: "Los Angeles, CA",
    date: "Jun 2025 – Aug 2025",
    type: "Internship",
    bullets: [
      "Delivered instruction in Python, Java, 3D printing, and VEX robotics to students ages 7–17, guiding them through full engineering design cycles involving prototyping, testing, and iterative debugging.",
      "Translated complex engineering concepts into accessible lessons, adapted curricula to diverse skill levels, and oversaw end-to-end completion of student projects.",
    ],
    icon: "🎓",
  },
  {
    title: "Resident Advisor",
    company: "COCM Student Housing",
    location: "Auburn, WA",
    date: "Jun 2024 – Jun 2025",
    type: "Part-time",
    bullets: [
      "Fostered a positive, inclusive living environment for 350+ residents by organizing monthly events and providing continuous pastoral support.",
      "Founded the Resident Hall Council, creating a formal channel for residents to voice concerns and drive community improvements.",
      "Led crisis response during serious incidents — coordinating with police, campus security, and support staff to ensure resident safety and timely intervention.",
    ],
    icon: "🏠",
  },
  {
    title: "Electrical Engineer — NASA NPWEE",
    company: "NASA L'SPACE Program",
    location: "Remote",
    date: "Jan 2025 – Apr 2025",
    type: "Project",
    bullets: [
      "Researched adaptive aerodynamics and real-time control systems for a morphing wing concept, integrating piezoelectric actuators, servos, and sensor networks for structural adaptation.",
      "Ran CFD/FEA simulations to validate aerodynamic efficiency gains of 10–15% over fixed-wing configurations.",
      "Conducted trade studies on actuator efficiency, structural flexibility, and control response time; performed heritage analysis to inform design direction.",
      "Served as a technical reviewer on a NASA-style proposal review panel, scoring submissions and delivering structured feedback against solicitation rubrics.",
    ],
    icon: "🚀",
  },
  {
    title: "Lead Systems Engineer — Mission Concept Academy",
    company: "NASA L'SPACE Program",
    location: "Remote",
    date: "Sep 2024 – Dec 2024",
    type: "Project",
    bullets: [
      "Led a cross-functional team of 10 engineers through the full design of a lunar rover concept targeting pit exploration for human habitation assessment.",
      "Owned the rover's electrical system design — power distribution, battery configuration, motor control, and onboard computer integration.",
      "Engineered subsystems to survive extreme lunar conditions including thermal cycling, vacuum exposure, and radiation.",
      "Co-authored a 200-page Preliminary Design Review (PDR) within a strict 2-week deadline.",
    ],
    icon: "🌙",
  },
  {
    title: "Software Validation Engineer Intern",
    company: "ICONFIRM AS",
    location: "Oslo, Norway · Remote",
    date: "Feb 2021 – Jun 2024",
    type: "Part-time",
    bullets: [
      "Documented and tracked 150+ software bugs across development and QA teams, reducing issue turnaround time by 40% through detailed reporting and cross-team communication.",
      "Collaborated with developers to code and implement fixes for high-priority bugs, improving system stability and performance.",
      "Developed 20+ test guides and templates, reducing onboarding time for new developers by 20%.",
    ],
    icon: "🔍",
  },
  {
    title: "Sales Clerk",
    company: "Paper Tree Bookstore, Green River College",
    location: "Auburn, WA",
    date: "Dec 2023 – Aug 2024",
    type: "Part-time",
    bullets: [
      "Managed sales orders and guided customers to appropriate course materials and equipment.",
      "Assembled and prepared shop materials; handled daily retail operations.",
    ],
    icon: "📚",
  },
  {
    title: "Retail Sales Associate & Warehouse Manager",
    company: "Europris",
    location: "Åsnes, Norway",
    date: "May 2021 – Aug 2023",
    bullets: [
      "Processed the intake of 80+ pallets weekly, optimizing inventory turnover and reducing processing time by 10%.",
      "Managed the safe handling and sale of regulated pyrotechnics, maintaining 100% regulatory compliance.",
      "Responsible for warehouse health and safety, maintaining a 100% incident-free record.",
    ],
    icon: "🏪",
  },
  {
    title: "Electrical & Systems Engineer",
    company: "Flobergshagen Electromechanic Services",
    location: "Flisa, Norway",
    date: "Aug 2018 – Aug 2023",
    type: "Part-time",
    bullets: [
      "Engineered and assembled 50+ PCBs for alternators and voltage regulators, increasing product reliability and reducing system failures.",
      "Installed and configured network storage and dynamometer systems, built 10+ computers, and upgraded hardware/software — boosting overall system efficiency by 20%.",
      "Led the transition to a new accounting platform, cutting filing time by 40% and improving financial reporting accuracy.",
    ],
    icon: "⚡",
  },
  {
    title: "Motorsport Electrical & Systems Technician",
    company: "FM Motorsports",
    location: "Flisa, Norway",
    date: "May 2017 – Jun 2023",
    type: "Self-employed",
    bullets: [
      "Designed and implemented custom ignition and fuel injection systems using Arduino microcontrollers, enabling programmable launch control and improved performance tuning.",
      "Diagnosed and repaired complex electrical and mechanical faults under tight race-day deadlines, reducing team downtime.",
      "Fabricated and integrated mechanical and electronic components using welding, wiring, and prototyping techniques in resource-constrained environments.",
    ],
    icon: "🏎️",
  },
  {
    title: "Shop Assistant",
    company: "LPG Solør",
    location: "Flisa, Norway",
    date: "Aug 2016 – Aug 2023",
    type: "Part-time",
    bullets: [
      "Processed sales orders, filed financial reports, and managed invoicing.",
      "Safely filled and delivered LPG canisters; modernized the technological infrastructure including the LPG pump system and cash register.",
    ],
    icon: "🔧",
  },
];

// Entries shown by default; older/less-technical ones are collapsed
const EXPERIENCE_DEFAULT_VISIBLE = 8;

const FEATURED_PROJECTS = [
  {
    name: "Proggo",
    tagline: "Gamified Programming Education App",
    description:
      "Engineered and launched an iOS application using Swift 6 concurrency and SwiftUI, backed by a secure serverless architecture using TypeScript Cloud Functions for all data validation and mutations. Implemented a custom SM-2 Spaced Repetition algorithm with difficulty weighting to optimize learning retention, and a code canonicalization engine using SHA-256 hashing for accurate answer validation.",
    tech: ["Swift 6", "SwiftUI", "Firebase", "TypeScript", "Cloud Functions"],
    link: "https://apps.apple.com/us/app/proggo/id6757369766",
    linkLabel: "View on App Store →",
  },
  {
    name: "Launch Control / Rev Limiter",
    tagline: "Custom Embedded Automotive Control System",
    description:
      "Designed and integrated a custom embedded launch control system using Arduino and signal conditioning circuits, interfacing with a vehicle ECU via custom firmware to dynamically regulate ignition timing and improve performance. Conducted iterative testing and data collection, optimizing control parameters to reduce launch time variability by 15% through systematic problem-solving.",
    tech: ["Arduino", "C++", "Embedded Systems", "Automotive Electronics", "Vehicle Diagnostics"],
    link: "https://github.com/odinlindal/arduino_revlimiter/",
    linkLabel: "View on GitHub →",
  },
];

const SKILLS = [
  {
    category: "Languages",
    icon: "⌨️",
    items: ["Swift", "TypeScript", "Python", "C / C++", "JavaScript", "Java"],
  },
  {
    category: "Frameworks & Tools",
    icon: "🛠️",
    items: ["SwiftUI", "React", "Firebase", "Cloud Functions", "Arduino", "Jamf", "Vite", "Git"],
  },
  {
    category: "Hardware & Embedded",
    icon: "🔌",
    items: ["PCB Assembly & Design", "Power Systems Design", "CubeSat Architecture", "Embedded Systems", "Automotive Electronics", "Dynamometer Systems", "State Machines"],
  },
  {
    category: "Concepts",
    icon: "💡",
    items: ["Serverless Architecture", "Real-time Systems", "Proposal Writing", "QA & Test Engineering", "System Modeling"],
  },
];

function App() {
  const [repos, setRepos] = useState([]);
  const [visibleRepos, setVisibleRepos] = useState(6);
  const [showMoreRepos, setShowMoreRepos] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/odinlindal/repos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const publicRepos = data
            .filter((repo) => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count);
          setRepos(publicRepos);
          setShowMoreRepos(publicRepos.length > 6);
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["hero", ...NAV_LINKS];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleExperience = showAllExperience
    ? EXPERIENCE
    : EXPERIENCE.slice(0, EXPERIENCE_DEFAULT_VISIBLE);

  return (
    <div className="portfolio-container">
      {/* ── Navigation ── */}
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <a href="#hero" className="nav-logo">OL</a>
        <ul className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          {NAV_LINKS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className={`nav-link ${activeSection === s ? "nav-link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="hero-section">
        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-title">
              Odin <span className="accent-text">Lindal</span>
            </h1>
            <p className="hero-subtitle">Electrical &amp; Computer Engineering Student</p>
            <p className="hero-description">
              I love building things — from spacecraft power systems and CubeSats
              to iOS apps and race car electronics. Fueled by curiosity, hands-on
              problem-solving, and the thrill of turning ideas into reality.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
            <div className="hero-links">
              <a href="https://github.com/odinlindal" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/odin-lindal/" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
          <div className="hero-image-col">
            <div className="hero-image-wrapper">
              <div className="hero-image-ring" />
              <img
                src="assets/headshot.jpeg"
                alt="Odin Lindal"
                className="headshot"
              />
            </div>
          </div>
        </div>
        <a href="#about" className="scroll-indicator" aria-label="Scroll down">
          <div className="scroll-mouse">
            <div className="scroll-dot" />
          </div>
        </a>
      </section>

      {/* ── About ── */}
      <section id="about" className="about-section section">
        <div className="section-container">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-card glass-card">
              <p>
                I'm an Electrical and Computer Engineering student at the{" "}
                <span className="accent-text">University of Washington</span>, with a
                passion for building things that push boundaries — whether that's spacecraft
                power systems, consumer iOS apps, or race car electronics.
              </p>
              <p>
                I thrive at the intersection of hardware and software, where real-world
                constraints meet creative problem-solving. My experience spans CubeSat
                avionics, embedded automotive systems, NASA mission design, and shipped
                consumer software on the App Store.
              </p>
              <p>
                When I'm not designing power budgets for CubeSats or writing code,
                you'll find me exploring new ideas and looking for
                the next problem worth solving.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card glass-card">
                <span className="stat-icon">🛰️</span>
                <span className="stat-value">HuskySat-3</span>
                <span className="stat-label">Orbital Radar CubeSat</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-icon">🍎</span>
                <span className="stat-value">Apple</span>
                <span className="stat-label">Software Engineering Intern</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-icon">📱</span>
                <span className="stat-value">Proggo</span>
                <span className="stat-label">Published iOS App</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-icon">🚀</span>
                <span className="stat-value">NASA L'SPACE</span>
                <span className="stat-label">Mission & Proposal Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="experience-section section">
        <div className="section-container">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">A career built across aerospace, software, hardware, and education.</p>
          <div className="timeline">
            {visibleExperience.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-connector">
                  <div className="timeline-dot">{exp.icon}</div>
                  {i < visibleExperience.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-card glass-card">
                  <div className="timeline-header">
                    <div>
                      <div className="timeline-title-row">
                        <h3 className="timeline-title">{exp.title}</h3>
                        {exp.type && <span className="timeline-type-badge">{exp.type}</span>}
                      </div>
                      <p className="timeline-company accent-text">{exp.company}</p>
                      <p className="timeline-meta">
                        <span>{exp.location}</span>
                        <span className="dot-sep">·</span>
                        <span className="timeline-date">{exp.date}</span>
                      </p>
                    </div>
                  </div>
                  {exp.confidential ? (
                    <p className="timeline-private">Details withheld for confidentiality.</p>
                  ) : exp.bullets.length > 0 ? (
                    <ul className="timeline-bullets">
                      {exp.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* Show more / less toggle */}
          {EXPERIENCE.length > EXPERIENCE_DEFAULT_VISIBLE && (
            <div className="view-more-container" style={{ marginTop: "1rem" }}>
              <button
                onClick={() => setShowAllExperience((v) => !v)}
                className="btn btn-outline"
              >
                {showAllExperience
                  ? "Show Less"
                  : `Show ${EXPERIENCE.length - EXPERIENCE_DEFAULT_VISIBLE} More Roles`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="projects-section section">
        <div className="section-container">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            A mix of shipped products, embedded systems, and engineering builds.
          </p>

          {/* Featured */}
          <div className="featured-projects">
            {FEATURED_PROJECTS.map((p, i) => (
              <div key={i} className="featured-card glass-card">
                <div className="featured-badge">Featured Project</div>
                <h3 className="featured-title">{p.name}</h3>
                <p className="featured-tagline accent-text">{p.tagline}</p>
                <p className="featured-description">{p.description}</p>
                <div className="featured-tech">
                  {p.tech.map((t, j) => (
                    <span key={j} className="tech-tag">{t}</span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary featured-link"
                >
                  {p.linkLabel}
                </a>
              </div>
            ))}
          </div>

          {/* GitHub Repos */}
          <h3 className="subsection-title">GitHub Repositories</h3>
          <div className="projects-grid">
            {repos.slice(0, visibleRepos).map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card glass-card"
              >
                <div className="project-header">
                  <svg className="repo-icon" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                  </svg>
                  <h3 className="project-title">{repo.name}</h3>
                </div>
                <p className="project-description">
                  {repo.description || "A software project showcasing various programming concepts and technologies."}
                </p>
                <div className="project-footer">
                  {repo.language && (
                    <span className="project-language">
                      <span className="lang-dot" />
                      {repo.language}
                    </span>
                  )}
                  <span className="project-stars">⭐ {repo.stargazers_count}</span>
                </div>
              </a>
            ))}
          </div>

          {showMoreRepos && (
            <div className="view-more-container">
              <button
                onClick={() => {
                  setVisibleRepos(repos.length);
                  setShowMoreRepos(false);
                }}
                className="btn btn-outline"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="skills-section section">
        <div className="section-container">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies and disciplines I work with.</p>
          <div className="skills-grid">
            {SKILLS.map((group, i) => (
              <div key={i} className="skill-group glass-card">
                <div className="skill-group-header">
                  <span className="skill-icon">{group.icon}</span>
                  <h3 className="skill-category">{group.category}</h3>
                </div>
                <div className="skill-tags">
                  {group.items.map((item, j) => (
                    <span key={j} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact-section section">
        <div className="section-container contact-inner">
          <div className="contact-glow" />
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle contact-text">
            I'm always open to new opportunities, collaborations, or just a good conversation.
            Feel free to reach out!
          </p>
          <div className="contact-links">
            <a href="mailto:odinlindal@gmail.com" className="contact-card glass-card">
              <span className="contact-icon">✉️</span>
              <span className="contact-label">Email</span>
              <span className="contact-value">olindal2@hotmail.com</span>
            </a>
            <a href="https://linkedin.com/in/odin-lindal" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
              <span className="contact-icon">💼</span>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">in/odin-lindal</span>
            </a>
            <a href="https://github.com/odinlindal" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
              <span className="contact-icon">🐙</span>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">odinlindal</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>Designed &amp; built by Odin Lindal · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
