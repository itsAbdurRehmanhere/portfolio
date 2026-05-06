import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillService } from '../services/api';
import SkillBar from '../components/SkillBar';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillService.getSkills();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Mock skills if API is empty
  const defaultSkills = [
    { id: 1, name: "Python / FastAPI", proficiency: 90, category: "Backend" },
    { id: 2, name: "PostgreSQL", proficiency: 85, category: "Database" },
    { id: 3, name: "Docker", proficiency: 75, category: "DevOps" },
    { id: 4, name: "React", proficiency: 80, category: "Frontend" },
    { id: 5, name: "JavaScript", proficiency: 85, category: "Frontend" }
  ];

  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  
  // Group skills by category if desired, or just show list
  const backendSkills = displaySkills.filter(s => s.category === 'Backend' || s.category === 'Database' || s.category === 'DevOps');
  const frontendSkills = displaySkills.filter(s => s.category === 'Frontend');

  return (
    <motion.div 
      className="skills-page section"
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
          My <span className="text-gradient">Skills</span>
        </motion.h2>

        <div className="skills-container">
          <motion.div 
            className="skills-category glass-panel"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="category-title">Backend & Infrastructure</h3>
            {backendSkills.length > 0 ? backendSkills.map((skill, index) => (
              <SkillBar key={skill.id} skill={skill} index={index} />
            )) : displaySkills.slice(0,3).map((skill, index) => (
              <SkillBar key={skill.id} skill={skill} index={index} />
            ))}
          </motion.div>

          <motion.div 
            className="skills-category glass-panel"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="category-title">Frontend & Others</h3>
            {frontendSkills.length > 0 ? frontendSkills.map((skill, index) => (
              <SkillBar key={skill.id} skill={skill} index={index} />
            )) : displaySkills.slice(3).map((skill, index) => (
              <SkillBar key={skill.id} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
