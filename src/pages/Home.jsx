import Hero from '../components/Hero/Hero.jsx';
import Stats from '../components/Stats/Stats.jsx';
import About from '../components/About/About.jsx';
import Skills from '../components/Skills/Skills.jsx';
import Services from '../components/Services/Services.jsx';
import Projects from '../components/Projects/Projects.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import Pricing from '../components/Pricing/Pricing.jsx';
import FAQ from '../components/FAQ/FAQ.jsx';
import Gallery from '../components/Gallery/Gallery.jsx';
import Contact from '../components/Contact/Contact.jsx';

/**
 * Homepage with all sections (10+ sections)
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Gallery />
      <Contact />
    </>
  );
}
import { useMemo, useRef, useState } from "react";
import { ArrowUp, Menu, X, Moon, Sun } from "lucide-react";
import { navLinks, socialLinks, stats, skills, services, projects, faqs } from "../data/portfolioData";
import { useTheme } from "../hooks/useTheme";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCounter } from "../hooks/useCounter";

const Section = ({ id, title, children }) => {
  const ref = useRef(null);
  const visible = useScrollReveal(ref);
  return (
    <section id={id} ref={ref} className={`section glass ${visible ? "show" : ""}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { theme, setTheme } = useTheme();
  const [statsVisible, setStatsVisible] = useState(false);

  const heroRoles = useMemo(() => ["Android Senior Developer", "Kotlin Expert", "Jetpack Compose Builder", "Firebase Integrator"], []);

  const counts = {
    years: useCounter(10, statsVisible),
    apps: useCounter(3000, statsVisible),
    repos: useCounter(122, statsVisible),
    sat: useCounter(100, statsVisible),
  };

  return (
    <>
      <header className="navbar">
        <div className="brand">
          <span className="brandMark">MKA</span>
          <div>
            <strong>Moe-Kyaw-Aung-Portfolio 100</strong>
            <p>⭐MOE KYAW AUNG ⭐ANDROID SENIOR DEVELOPER</p>
          </div>
        </div>
        <nav className={`navlinks ${open ? "open" : ""}`}>
          {navLinks.slice(0, 8).map(l => <a key={l.to} href={l.to}>{l.label}</a>)}
        </nav>
        <div className="actions">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="mobile" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main className="page">
        <section className="hero">
          <div className="heroGlow" />
          <div className="heroCard glass">
            <p className="eyebrow">Professional Android Portfolio • SaaS Landing Experience</p>
            <h1>
              <span className="gradientText">MOE KYAW AUNG</span>
              <br />
              Android Senior Developer
            </h1>
            <p className="typing">{heroRoles[0]} • {heroRoles[1]} • {heroRoles[2]} • {heroRoles[3]}</p>
            <p className="heroText">
              Android developer with nearly 12 years of hands-on experience building secure, scalable, and user-friendly mobile applications.
            </p>
            <div className="heroBtns">
              <a href="/contact" className="btn primary">Contact Me</a>
              <a href="/projects" className="btn">View Projects</a>
            </div>
            <div className="socialRow">
              {socialLinks.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
            </div>
          </div>
        </section>

        <section className="statsWrap glass" ref={el => el && setStatsVisible(true)}>
          <div><strong>{counts.years}+</strong><span>Years</span></div>
          <div><strong>{counts.apps.toLocaleString()}+</strong><span>Apps</span></div>
          <div><strong>{counts.repos}</strong><span>Repos</span></div>
          <div><strong>{counts.sat}%</strong><span>Satisfaction</span></div>
        </section>

        <Section id="about" title="Advanced About Section">
          <div className="aboutGrid">
            <div className="avatarRing">
              <img src="https://gravatar.com/moekyawaung13721" alt="Gravatar profile" />
            </div>
            <div>
              <p>
                Strong in Kotlin and modern Jetpack development, Firebase integration, REST API consumption, clean architecture, testing, and release-ready builds.
              </p>
              <div className="timeline">
                <div><span>2013</span><p>Started Android development</p></div>
                <div><span>2018</span><p>Scaled to MVVM and modular architecture</p></div>
                <div><span>2022</span><p>Advanced Jetpack Compose and CI/CD delivery</p></div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="bars">
            {skills.map(s => (
              <div key={s.name} className="bar">
                <label>{s.name}</label>
                <div><span style={{ width: `${s.percent}%` }} /></div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="services" title="Services">
          <div className="grid">
            {services.map(s => <article key={s.title} className="card"><h3>{s.title}</h3><p>{s.desc}</p></article>)}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid masonry">
            {projects.map(p => (
              <article key={p.title} className="card">
                <span className="tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>Production-style portfolio item with polished UX, scalable structure, and fast navigation.</p>
                <div className="cardActions">
                  <a href={p.demo}>Demo</a>
                  <a href={p.source}>Source</a>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="faq" title="FAQ">
          <div className="faq">
            {faqs.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <form className="contactForm">
            <input placeholder="Your name" aria-label="Your name" />
            <input placeholder="Email" aria-label="Email" />
            <textarea placeholder="Tell me about your project" aria-label="Message" rows="5" />
            <button className="btn primary">Send Message</button>
          </form>
        </Section>
      </main>

      {showTop && <button className="backTop"><ArrowUp /></button>}
    </>
  );
}