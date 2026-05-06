import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="greeting">Hello, I'm</h2>
            <h1 className="hero-title">
              Hassan <span className="text-gradient">Ali</span>
            </h1>
            <h3 className="hero-subtitle">
              <Terminal size={24} className="terminal-icon" />
              Backend Developer
            </h3>
            <p className="hero-description">
              I specialize in building scalable, robust backend architectures and beautiful, responsive frontends. Turning complex problems into elegant solutions.
            </p>
            
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                View Work <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Me
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="glass-panel profile-card">
              <div className="code-snippet">
                <p><span className="keyword">const</span> <span className="variable">developer</span> = {'{'}</p>
                <p>&nbsp;&nbsp;name: <span className="string">"Hassan Ali"</span>,</p>
                <p>&nbsp;&nbsp;skills: [<span className="string">"Python"</span>, <span className="string">"FastAPI"</span>, <span className="string">"React"</span>],</p>
                <p>&nbsp;&nbsp;passion: <span className="string">"Clean Code"</span></p>
                <p>{'};'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
