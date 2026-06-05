import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="hero-section">
        <div className="container hero-container">
          <motion.div
            className="hero-content"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="greeting"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="greeting-dot" />
              Available for Hire
            </motion.div>

            <h1 className="hero-title">
              Abdur<br />
              <span className="text-gradient">Rehman</span>
            </h1>

            <h3 className="hero-subtitle">
              <Terminal size={22} className="terminal-icon" />
              Backend Developer &amp; Full-Stack Engineer
            </h3>

            <p className="hero-description">
              I craft scalable, robust backend architectures and beautiful,
              responsive frontends — turning complex problems into elegant,
              production-ready solutions.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View My Work <ArrowRight size={17} />
              </a>
              <a href="#contact" className="btn btn-outline">
                Get In Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            <div className="glass-panel profile-card">
              <div className="card-header">
                <span className="traffic-dot td-red" />
                <span className="traffic-dot td-yellow" />
                <span className="traffic-dot td-green" />
                <span className="card-filename">developer.js</span>
              </div>

              <div className="code-snippet">
                <span className="code-line">
                  <span className="comment">// Full-Stack Engineer</span>
                </span>
                <span className="code-line">
                  <span className="keyword">const</span>{' '}
                  <span className="variable">developer</span>{' '}
                  <span className="keyword">=</span> {'{'}
                </span>
                <span className="code-line">
                  &nbsp;&nbsp;<span className="property">name</span>:{' '}
                  <span className="string">"Abdur Rehman"</span>,
                </span>
                <span className="code-line">
                  &nbsp;&nbsp;<span className="property">role</span>:{' '}
                  <span className="string">"Backend Developer"</span>,
                </span>
                <span className="code-line">
                  &nbsp;&nbsp;<span className="property">skills</span>: [
                </span>
                <span className="code-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"Python"</span>,{' '}
                  <span className="string">"FastAPI"</span>,{' '}
                  <span className="string">"React"</span>,
                </span>
                <span className="code-line">
                  &nbsp;&nbsp;],
                </span>
                <span className="code-line">
                  &nbsp;&nbsp;<span className="property">passion</span>:{' '}
                  <span className="string">"Clean Code"</span>
                </span>
                <span className="code-line">
                  {'};'}<span className="cursor" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
