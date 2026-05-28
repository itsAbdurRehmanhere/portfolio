// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Briefcase, Calendar } from 'lucide-react';
// import { experienceService } from '../services/api';
// import './Experience.css';

// const Experience = () => {
//   const [experiences, setExperiences] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchExperiences = async () => {
//       try {
//         const data = await experienceService.getExperiences();
//         setExperiences(data);
//       } catch (error) {
//         console.error("Error fetching experiences:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperiences();
//   }, []);

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
//   };

//   const formatDuration = (start, end, current) => {
//     const startStr = formatDate(start);
//     const endStr = current ? 'Present' : formatDate(end);
//     return `${startStr} - ${endStr}`;
//   };

//   // Mock data if backend is empty
//   const defaultExperiences = [
//     // {
//     //   id: 1,
//     //   title: "Senior Full Stack Developer",
//     //   company: "Tech Innovators Inc.",
//     //   location: "San Francisco, CA",
//     //   start_date: "2023-01-01T00:00:00",
//     //   end_date: null,
//     //   current: true,
//     //   description: "Leading the development of scalable web applications using React and FastAPI. Architected the migration from a monolithic backend to a microservices architecture.",
//     //   technologies: ["React", "FastAPI", "PostgreSQL", "Docker"]
//     // },
//     // {
//     //   id: 2,
//     //   title: "Software Engineer",
//     //   company: "Digital Solutions LLC",
//     //   location: "New York, NY",
//     //   start_date: "2020-06-01T00:00:00",
//     //   end_date: "2022-12-31T00:00:00",
//     //   current: false,
//     //   description: "Developed and maintained several client-facing applications. Improved database query performance by 40% and implemented automated testing pipelines.",
//     //   technologies: ["JavaScript", "Python", "MongoDB", "AWS"]
//     // }
//   ];

//   const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;

//   // Sort by order or start_date (descending)
//   const sortedExperiences = [...displayExperiences].sort((a, b) => {
//     if (a.order !== b.order) return a.order - b.order;
//     return new Date(b.start_date) - new Date(a.start_date);
//   });

//   return (
//     <motion.div
//       className="experience-page section"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="container">
//         <motion.h2
//           className="section-title"
//           initial={{ y: -30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           My <span className="text-gradient">Experience</span>
//         </motion.h2>

//         {loading ? (
//           <div className="loader-container">
//             <div className="loader"></div>
//           </div>
//         ) : (
//           <div className="timeline-container">
//             {sortedExperiences.map((exp, index) => (
//               <motion.div
//                 key={exp.id}
//                 className="timeline-item"
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//               >
//                 <div className="timeline-dot"></div>
//                 <div className="timeline-content glass-panel">
//                   <div className="timeline-header">
//                     <div className="role-company">
//                       <h3>{exp.title}</h3>
//                       <span className="company-name">
//                         <Briefcase size={16} /> {exp.company}
//                       </span>
//                     </div>
//                     <div className="duration">
//                       <Calendar size={16} /> {formatDuration(exp.start_date, exp.end_date, exp.current)}
//                     </div>
//                   </div>
//                   <p className="timeline-description">{exp.description}</p>
//                   <div className="timeline-tech">
//                     {exp.technologies && exp.technologies.map((tech, i) => (
//                       <span key={i} className="tech-badge">{tech}</span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default Experience;


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experienceService } from '../services/api';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experienceService.getExperiences();

        console.log("Fetched experiences:", data);

        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Directly display string dates from backend
  const formatDuration = (start, end, current) => {
    return `${start} - ${current ? 'Present' : end}`;
  };

  // Sort by start_date descending (latest to oldest)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.start_date).getTime();
    const dateB = new Date(b.start_date).getTime();
    return dateB - dateA;
  });

  return (
    <motion.div
      className="experience-page section"
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
          My <span className="text-gradient">Experience</span>
        </motion.h2>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : sortedExperiences.length === 0 ? (
          <p>No experiences found.</p>
        ) : (
          <div className="timeline-container">
            {sortedExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="timeline-item"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="timeline-dot"></div>

                <div className="timeline-content glass-panel">
                  <div className="timeline-header">

                    <div className="role-company">
                      <h3>{exp.title}</h3>

                      <span className="company-name">
                        <Briefcase size={16} />
                        {exp.company}
                      </span>

                      <span className="company-location">
                        <MapPin size={16} />
                        {exp.location}
                      </span>
                    </div>

                    <div className="duration">
                      <Calendar size={16} />
                      {formatDuration(
                        exp.start_date,
                        exp.end_date,
                        exp.current
                      )}
                    </div>
                  </div>

                  <p className="timeline-description">
                    {exp.description}
                  </p>

                  {exp.technologies &&
                    exp.technologies.length > 0 && (
                      <div className="timeline-tech">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Experience;