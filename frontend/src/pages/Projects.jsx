import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code, ExternalLink, X } from 'lucide-react';
import { projectService } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedProject]);

  return (
    <motion.div 
      className="projects-page section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-gradient">Projects</span>
        </motion.h2>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))
            ) : (
              // Fallback mockup data if backend is empty/unavailable
              [1, 2, 3].map((item, index) => (
                 <ProjectCard key={item} project={{
                   id: item,
                   title: `Project ${item}`,
                   description: "This is an amazing full-stack application demonstrating complex backend architecture and responsive frontend design.",
                   technologies: ["React", "FastAPI", "PostgreSQL"],
                   github_url: "#",
                   live_url: "#"
                 }} index={index} onClick={() => setSelectedProject({
                   id: item,
                   title: `Project ${item}`,
                   description: "This is an amazing full-stack application demonstrating complex backend architecture and responsive frontend design.",
                   technologies: ["React", "FastAPI", "PostgreSQL"],
                   github_url: "#",
                   live_url: "#"
                 })} />
              ))
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.section
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="project-modal-close"
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>
              {selectedProject.image_url && (
                <img
                  className="project-modal-image"
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                />
              )}
              <div className="project-modal-content">
                <p className="project-modal-kicker">Project details</p>
                <h3 id="project-modal-title">{selectedProject.title}</h3>
                <p className="project-modal-description">
                  {selectedProject.long_description || selectedProject.description}
                </p>
                <div className="project-tech">
                  {(selectedProject.technologies || []).map((tech, index) => (
                    <span key={`${tech}-${index}`} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {selectedProject.github_url && selectedProject.github_url !== '#' && (
                    <a href={selectedProject.github_url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                      <Code size={16} /> Code
                    </a>
                  )}
                  {selectedProject.live_url && selectedProject.live_url !== '#' && (
                    <a href={selectedProject.live_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
