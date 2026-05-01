import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi';
import { projectService } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjectDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await projectService.getById(id);
      setProject(response.data);
      document.title = `${response.data.title} | Hassan Ali Portfolio`;
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project details. Please try again later.');
      // Fallback data for demo
      setProject({
        id: parseInt(id),
        title: 'Smart Heating System',
        description: 'A comprehensive IoT solution for smart home heating management',
        long_description: `
          This project implements a complete smart heating system that allows users to control their home heating remotely. 
          The system uses ESP32 microcontrollers connected to temperature sensors, gas valves, and electric heating elements.
          
          Key features include:
          • Remote temperature control via mobile app
          • Dual energy source switching (gas/electricity)
          • Energy usage analytics and reporting
          • Automated scheduling based on user preferences
          • Real-time monitoring and alerts
          
          The backend handles device authentication, real-time data processing, and maintains historical temperature data.
          Firebase Realtime Database ensures low-latency communication between devices and the mobile application.
        `,
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        github_url: 'https://github.com/yourusername/smart-heating',
        live_url: 'https://demo.smart-heating.com',
        technologies: ['ESP32', 'Firebase', 'React Native', 'IoT', 'Arduino', 'C++', 'Python'],
        created_at: '2024-01-15',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Project</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen"
    >
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl opacity-90">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-custom py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-8"
        >
          <FiArrowLeft /> Back to Projects
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <div className="prose max-w-none">
                {project.long_description?.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full rounded-lg mt-6"
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiTag /> Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <div className="space-y-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                  >
                    <FiGithub /> View on GitHub
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Date */}
            {project.created_at && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiCalendar /> Project Date
                </h3>
                <p className="text-gray-600">
                  {new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;