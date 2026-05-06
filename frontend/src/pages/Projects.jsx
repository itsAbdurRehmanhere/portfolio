import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectService } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <ProjectCard key={project.id} project={project} index={index} />
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
                 }} index={index} />
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
