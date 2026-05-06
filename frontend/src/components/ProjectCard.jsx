import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div 
      className="project-card glass-panel"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="project-image-container">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="project-image" />
        ) : (
          <div className="project-image-placeholder">
            <span>{project.title.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-tech">
          {project.technologies.map((tech, i) => (
            <span key={i} className="tech-badge">{tech}</span>
          ))}
        </div>
        
        <div className="project-links">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
              <Code size={16} /> Code
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
