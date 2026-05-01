import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectService } from '../services/api';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback data
      setProjects([
        {
          id: 1,
          title: 'Smart Heating System',
          description: 'IoT-based heating system with ESP32 and Firebase for remote control and monitoring.',
          technologies: ['ESP32', 'Firebase', 'React Native', 'IoT'],
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
          github_url: 'https://github.com',
          live_url: 'https://example.com',
        },
        {
          id: 2,
          title: 'Employee Management System',
          description: 'Full-featured employee management system with role-based authentication.',
          technologies: ['FastAPI', 'MSSQL', 'React', 'Tailwind'],
          image_url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400',
          github_url: 'https://github.com',
          live_url: 'https://example.com',
        },
        {
          id: 3,
          title: 'MPI + CUDA Parallel Processing',
          description: 'High-performance computing project using MPI and CUDA for matrix operations.',
          technologies: ['CUDA', 'MPI', 'C++', 'Python'],
          image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
          github_url: 'https://github.com',
          live_url: 'https://example.com',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          className="section-title"
        >
          Featured Projects
        </motion.h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <FiGithub size={20} />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;