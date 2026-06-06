import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─── DATA ─────────────────────────────────────────────────────────── */
const ME = {
  name: 'Sonika Deshwal',
  roles: ['AI/ML Engineer', 'SDE', 'RAG Developer', 'NLP Practitioner', 'Problem Solver'],
  tagline: 'Building intelligent systems that matter.',
  about: `Pre-final year B.Tech CSE (AI & ML) student at Lovely Professional University, Phagwara
(Batch 2027, CGPA 7.55). I design and ship ML pipelines, NLP engines, and AI-powered
applications — from RAG-based retrieval systems to financial analytics platforms.
Actively targeting ML Engineer & SDE roles at product companies for placement 2026.`,
  linkedin: 'https://linkedin.com/in/sonikadeshwal/',
  github: 'https://github.com/sonikadeshwal',
  university: 'Lovely Professional University',
  degree: 'B.Tech CSE (AI & ML)',
  batch: '2027',
  cgpa: '7.55',
  location: 'Panipat, Haryana',
}

const EXPERIENCE = [
  {
    role: 'Machine Learning Intern',
    company: 'SaiKet Systems',
    period: 'Aug 2025 – Sep 2025',
    id: 'Intern ID: SKS/A2/c41384',
    bullets: [
      'Developed and deployed ML models in a real-world production environment',
      'Applied data preprocessing, feature engineering, and model evaluation on live datasets',
      'Worked on AI data pipelines with hands-on exposure to model deployment workflows',
    ],
  },
]

const PROJECTS = [
  {
    num: '01',
    title: 'DeepNote AI',
    subtitle: 'RAG-Powered Note Assistant',
    desc: 'Intelligent note-taking system using Retrieval-Augmented Generation with Groq LLaMA 3.3 70B. Supports document ingestion, semantic search, and context-aware Q&A on any uploaded content.',
    tags: ['RAG', 'LLaMA 3.3 70B', 'Groq', 'Streamlit', 'NLP'],
    link: 'https://deepnote-ai-hfii7eyby2ywibtusxwdiv.streamlit.app',
    accent: '#00e5ff',
  },
  {
    num: '02',
    title: 'Smart AI Interview Coach',
    subtitle: 'Voice-Powered Interview Simulator',
    desc: 'Full-stack AI interview platform with voice I/O, real-time webcam snapshots, LLM-based performance feedback, and auto-generated PDF reports. Multiple UI redesigns shipped.',
    tags: ['Groq', 'Voice I/O', 'Webcam', 'PDF Reports', 'Streamlit'],
    link: null,
    accent: '#8b5cf6',
  },
  {
    num: '03',
    title: 'Financial Intelligence System',
    subtitle: 'Deep Analytics Pipeline',
    desc: 'End-to-end sentiment-driven financial analysis — FinBERT for sentiment, UMAP dimensionality reduction, HDBSCAN clustering, XGBoost prediction, LSTM with self-attention, and SHAP explainability.',
    tags: ['FinBERT', 'LSTM', 'XGBoost', 'UMAP', 'HDBSCAN', 'SHAP'],
    link: null,
    accent: '#ff6b35',
  },
  {
    num: '04',
    title: 'Smart Email Classifier',
    subtitle: '89% Accuracy · Live on Streamlit',
    desc: 'Production-deployed email classification using TF-IDF vectorization and Naive Bayes, achieving 89% classification accuracy across multiple categories with a clean Streamlit UI.',
    tags: ['TF-IDF', 'Naive Bayes', '89% Accuracy', 'NLP', 'Streamlit'],
    link: null,
    accent: '#00ff88',
  },
  {
    num: '05',
    title: 'E-Consultation Sentiment Analysis',
    subtitle: 'NLP + Unsupervised Learning · SIH25035',
    desc: 'Multi-method NLP system combining K-Means clustering, LDA topic modeling, and TF-IDF to analyze sentiment patterns and themes in e-health consultation comment data.',
    tags: ['K-Means', 'LDA', 'TF-IDF', 'Streamlit', 'NLP'],
    link: null,
    accent: '#ff2d78',
  },
  {
    num: '06',
    title: 'Fake Account Detector',
    subtitle: 'Social Media Authenticity Classifier',
    desc: 'Machine learning classifier to detect fake social media accounts from behavioral patterns and metadata. Deployed on Streamlit Cloud with a live prediction interface.',
    tags: ['Classification', 'Feature Engineering', 'ML', 'Streamlit'],
    link: null,
    accent: '#ffd600',
  },
  {
    num: '07',
    title: 'Voice Chess XAI',
    subtitle: 'Explainable AI Chess Engine',
    desc: 'Voice-controlled chess game powered by Minimax with Alpha-Beta pruning. XAI logging explains every engine decision in plain language, making game theory transparent.',
    tags: ['Minimax', 'Alpha-Beta', 'XAI', 'Voice Control', 'Python'],
    link: null,
    accent: '#a0a0ff',
  },
  {
    num: '08',
    title: 'AlloMed AI',
    subtitle: 'AI Health Assistant',
    desc: 'Health assistant application built with Groq and Streamlit, providing intelligent responses to medical queries with a clean, accessible interface.',
    tags: ['Groq', 'Streamlit', 'Health AI', 'LLM'],
    link: null,
    accent: '#00ffcc',
  },
]

const SKILLS = [
  {
    category: 'Languages',
    items: ['Python', 'C++', 'JavaScript', 'SQL'],
    accent: '#00e5ff',
  },
  {
    category: 'ML / AI',
    items: ['TensorFlow', 'scikit-learn', 'XGBoost', 'LSTM', 'FinBERT', 'SHAP', 'UMAP', 'HDBSCAN'],
    accent: '#8b5cf6',
  },
  {
    category: 'NLP & LLMs',
    items: ['TF-IDF', 'LDA', 'K-Means', 'RAG', 'Groq API', 'LLaMA 3.3 70B'],
    accent: '#ff6b35',
  },
  {
    category: 'Web & Tools',
    items: ['React', 'Streamlit', 'Vite', 'HTML/CSS', 'MySQL', 'Git', 'GitHub'],
    accent: '#00ff88',
  },
]

const CERTS = [
  'Kaggle — Intro to Machine Learning',
  'IBM Deep Learning Fundamentals',
  'HackerRank — 5★ C++',
  'HackerRank — 4★ SQL',
  'freeCodeCamp — Responsive Web Design',
]

/* ─── COMPONENTS ────────────────────────────────────────────────────── */

function Reveal({ children, delay = 0, y = 30 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function Typewriter({ words }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[idx]
    const speed = deleting ? 55 : 95
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < word.length) {
          setText(word.slice(0, text.length + 1))
        } else {
          setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        if (text.length > 0) {
          setText(word.slice(0, text.length - 1))
        } else {
          setDeleting(false)
          setIdx((i) => (i + 1) % words.length)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, words])

  return (
    <span style={{ color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>
      {text}
      <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--color-cyan)', marginLeft: '1px' }}>
        |
      </span>
    </span>
  )
}

function SectionLabel({ n, label }) {
  return (
    <div style={{
      color: 'var(--color-cyan)',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.65rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    }}>
      <span style={{ opacity: 0.5 }}>{n}</span>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-cyan)', opacity: 0.5 }} />
      <span>{label}</span>
    </div>
  )
}

/* ─── NAVBAR ────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1rem 3rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'rgba(7,7,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '1.05rem',
        color: 'var(--color-cyan)',
        letterSpacing: '-0.02em',
      }}>
        sonika.dev
      </span>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {['About', 'Projects', 'Skills', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
            {item}
          </a>
        ))}
        <a
          href={ME.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.35rem 1rem',
            border: '1px solid var(--color-cyan)',
            color: 'var(--color-cyan)',
            textDecoration: 'none',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--color-cyan)'
            e.currentTarget.style.color = 'var(--color-bg)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--color-cyan)'
          }}
        >
          LinkedIn ↗
        </a>
      </div>
    </motion.nav>
  )
}

/* ─── HERO ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8rem 4rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div className="grid-bg" style={{
        position: 'absolute', inset: 0, zIndex: 0,
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '-10%', left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw', height: '60vh',
        background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            — available for placement · july – sep 2026
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 0.95,
            fontSize: 'clamp(3.5rem, 11vw, 9rem)',
            marginBottom: '0.6rem',
            letterSpacing: '-0.03em',
          }}
        >
          Sonika
          <br />
          <span className="text-outline">Deshwal</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            marginBottom: '2rem',
            minHeight: '2rem',
          }}
        >
          <Typewriter words={ME.roles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            color: 'var(--color-muted)',
            maxWidth: '480px',
            lineHeight: 1.9,
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
            marginBottom: '3rem',
          }}
        >
          {ME.tagline}
          <br />
          <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>
            {ME.degree} · {ME.university} · Batch {ME.batch}
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <a
            href="#projects"
            style={{
              padding: '0.8rem 2.2rem',
              background: 'var(--color-cyan)',
              color: 'var(--color-bg)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'opacity 0.2s',
              display: 'inline-block',
            }}
          >
            View Projects →
          </a>
          <a
            href={ME.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.8rem 2.2rem',
              border: '1px solid var(--color-muted)',
              color: 'var(--color-muted)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-cyan)'
              e.currentTarget.style.color = 'var(--color-cyan)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-muted)'
              e.currentTarget.style.color = 'var(--color-muted)'
            }}
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </div>

      {/* Floating stats — right side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{
          position: 'absolute', right: '5rem', top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: '2rem',
          zIndex: 1,
        }}
      >
        {[
          { num: '8+', label: 'Projects Shipped' },
          { num: '7.55', label: 'CGPA' },
          { num: '2026', label: 'Placement Ready' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            style={{
              textAlign: 'right',
              borderRight: '2px solid var(--color-cyan)',
              paddingRight: '1.2rem',
              animation: `float ${3.5 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '2.2rem',
              color: 'var(--color-cyan)',
              lineHeight: 1,
            }}>
              {stat.num}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--color-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginTop: '0.25rem',
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          zIndex: 1,
        }}
      >
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, transparent, var(--color-cyan))',
          animation: 'float 2s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          color: 'var(--color-muted)', letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>scroll</span>
      </motion.div>
    </section>
  )
}

/* ─── ABOUT ─────────────────────────────────────────────────────────── */
function About() {
  return (
    <section
      id="about"
      style={{
        padding: '7rem 4rem',
        borderTop: '1px solid var(--color-border)',
        maxWidth: '1000px',
      }}
    >
      <Reveal>
        <SectionLabel n="00" label="About" />
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          lineHeight: 1.05,
          marginBottom: '2.5rem',
          letterSpacing: '-0.03em',
        }}>
          Building{' '}
          <em style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-cyan)',
          }}>
            intelligent
          </em>{' '}
          systems.
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <p style={{
          color: 'var(--color-muted)',
          lineHeight: 2,
          fontSize: '0.88rem',
          fontFamily: 'var(--font-mono)',
          maxWidth: '650px',
          marginBottom: '3rem',
          whiteSpace: 'pre-line',
        }}>
          {ME.about}
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          maxWidth: '520px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-border)',
        }}>
          {[
            ['University', ME.university],
            ['Degree', `${ME.degree} · Batch ${ME.batch}`],
            ['CGPA', `${ME.cgpa} / 10`],
            ['Location', ME.location],
          ].map(([k, v]) => (
            <div key={k} style={{
              padding: '1.2rem 1.5rem',
              background: 'var(--color-surface)',
            }}>
              <div style={{
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-cyan)',
                marginBottom: '0.4rem',
                fontFamily: 'var(--font-mono)',
              }}>
                {k}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--color-white)',
                fontFamily: 'var(--font-mono)',
              }}>
                {v}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ─── EXPERIENCE ────────────────────────────────────────────────────── */
function Experience() {
  return (
    <section style={{ padding: '5rem 4rem', borderTop: '1px solid var(--color-border)' }}>
      <Reveal>
        <SectionLabel n="01" label="Experience" />
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '2.5rem',
          letterSpacing: '-0.02em',
        }}>
          Where I've worked.
        </h2>
      </Reveal>

      {EXPERIENCE.map((exp, i) => (
        <Reveal key={i} delay={0.1}>
          <motion.div
            style={{
              padding: '2rem',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              maxWidth: '720px',
              position: 'relative',
              overflow: 'hidden',
            }}
            whileHover={{ borderColor: 'rgba(0,229,255,0.3)' }}
            transition={{ duration: 0.2 }}
          >
            {/* Accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '3px', height: '100%',
              background: 'var(--color-cyan)',
            }} />

            <div style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              fontSize: '0.62rem',
              color: 'var(--color-cyan)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
            }}>
              {exp.period}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.35rem',
              marginBottom: '0.3rem',
              paddingLeft: '1rem',
            }}>
              {exp.role}
            </h3>
            <div style={{
              color: 'var(--color-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              marginBottom: '0.3rem',
              paddingLeft: '1rem',
            }}>
              {exp.company}
            </div>
            <div style={{
              color: 'var(--color-muted)',
              fontSize: '0.62rem',
              fontFamily: 'var(--font-mono)',
              marginBottom: '1.5rem',
              paddingLeft: '1rem',
              letterSpacing: '0.05em',
            }}>
              {exp.id}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '1rem' }}>
              {exp.bullets.map((b, j) => (
                <div key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{
                    color: 'var(--color-cyan)', fontSize: '0.7rem',
                    marginTop: '0.15rem', flexShrink: 0,
                  }}>→</span>
                  <span style={{
                    color: 'var(--color-muted)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1.7,
                  }}>
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      ))}
    </section>
  )
}

/* ─── PROJECTS ──────────────────────────────────────────────────────── */
function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: '6rem 0', borderTop: '1px solid var(--color-border)' }}
    >
      <div style={{ padding: '0 4rem', marginBottom: '3rem' }}>
        <Reveal>
          <SectionLabel n="02" label="Projects" />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            letterSpacing: '-0.03em',
          }}>
            Selected work.
          </h2>
          <p style={{
            color: 'var(--color-muted)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            marginTop: '0.75rem',
            letterSpacing: '0.08em',
          }}>
            ← scroll to explore →
          </p>
        </Reveal>
      </div>

      <div className="reel">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            className="reel-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ y: -8 }}
            style={{
              width: '340px',
              padding: '2rem',
              background: 'var(--color-surface)',
              border: `1px solid ${project.accent}20`,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'border-color 0.3s',
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.borderColor = `${project.accent}55`)
            }
            onMouseLeave={e =>
              (e.currentTarget.style.borderColor = `${project.accent}20`)
            }
          >
            {/* Ghost number */}
            <div style={{
              position: 'absolute',
              top: '-1rem', right: '1rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '5.5rem',
              color: `${project.accent}08`,
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
            }}>
              {project.num}
            </div>

            {/* Accent dash */}
            <div style={{
              width: '28px', height: '2px',
              background: project.accent,
              marginBottom: '1.5rem',
            }} />

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.2rem',
              marginBottom: '0.3rem',
              color: 'var(--color-white)',
            }}>
              {project.title}
            </h3>

            <div style={{
              color: project.accent,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}>
              {project.subtitle}
            </div>

            <p style={{
              color: 'var(--color-muted)',
              fontSize: '0.78rem',
              lineHeight: 1.75,
              fontFamily: 'var(--font-mono)',
              marginBottom: '1.5rem',
            }}>
              {project.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
              {project.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: '0.22rem 0.6rem',
                    fontSize: '0.58rem',
                    background: `${project.accent}12`,
                    color: project.accent,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em',
                    border: `1px solid ${project.accent}28`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  color: project.accent,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  borderBottom: `1px solid ${project.accent}40`,
                  paddingBottom: '1px',
                  transition: 'border-color 0.2s',
                }}
              >
                Live Demo ↗
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─── SKILLS ────────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: '6rem 4rem', borderTop: '1px solid var(--color-border)' }}
    >
      <Reveal>
        <SectionLabel n="03" label="Skills" />
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          marginBottom: '3rem',
          letterSpacing: '-0.03em',
        }}>
          Tech stack.
        </h2>
      </Reveal>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1px',
        background: 'var(--color-border)',
        border: '1px solid var(--color-border)',
        marginBottom: '3rem',
      }}>
        {SKILLS.map((group, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{
              padding: '1.75rem',
              background: 'var(--color-surface)',
              height: '100%',
            }}>
              <div style={{
                color: group.accent,
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
                marginBottom: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ width: '16px', height: '1px', background: group.accent }} />
                {group.category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {group.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: '4px', height: '4px',
                      borderRadius: '50%',
                      background: group.accent,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: 'var(--color-white)',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Certifications */}
      <Reveal delay={0.2}>
        <div style={{
          color: 'var(--color-muted)',
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
          marginBottom: '1rem',
        }}>
          Certifications
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {CERTS.map(cert => (
            <span
              key={cert}
              style={{
                padding: '0.45rem 1rem',
                border: '1px solid var(--color-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--color-muted)',
                background: 'var(--color-surface)',
              }}
            >
              {cert}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ─── CONTACT ───────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '8rem 4rem',
        borderTop: '1px solid var(--color-border)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute',
        bottom: '-20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '60vw', height: '50vh',
        background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Reveal>
        <SectionLabel n="04" label="Contact" />
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(3rem, 9vw, 7rem)',
          lineHeight: 0.95,
          marginBottom: '2.5rem',
          letterSpacing: '-0.04em',
        }}>
          Let's build<br />
          <span className="text-outline-cyan">something.</span>
        </h2>

        <p style={{
          color: 'var(--color-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          marginBottom: '3rem',
          lineHeight: 1.8,
        }}>
          Targeting ML Engineer & SDE roles<br />
          Placement season · July – September 2026
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={ME.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1rem 2.8rem',
              background: 'var(--color-cyan)',
              color: 'var(--color-bg)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            LinkedIn ↗
          </a>
          <a
            href={ME.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1rem 2.8rem',
              border: '1px solid var(--color-muted)',
              color: 'var(--color-muted)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-cyan)'
              e.currentTarget.style.color = 'var(--color-cyan)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-muted)'
              e.currentTarget.style.color = 'var(--color-muted)'
            }}
          >
            GitHub ↗
          </a>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── FOOTER ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      padding: '1.5rem 4rem',
      borderTop: '1px solid var(--color-border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.5rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--color-muted)',
      }}>
        © 2026 Sonika Deshwal
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--color-muted)',
      }}>
        {ME.degree} · {ME.university} · Batch {ME.batch}
      </span>
    </footer>
  )
}

/* ─── APP ───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}
