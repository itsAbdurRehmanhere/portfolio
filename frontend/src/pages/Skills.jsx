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
  
  // Sort skills by id
  const sortedSkills = [...displaySkills].sort((a, b) => a.id - b.id);
  
  // Group skills dynamically by category
  const categories = [...new Set(sortedSkills.map(s => s.category))];

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
          {categories.map((category, catIndex) => {
            const categorySkills = sortedSkills.filter(s => s.category === category);
            
            return (
              <motion.div 
                key={category}
                className="skills-category glass-panel"
                initial={{ x: catIndex % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + (catIndex * 0.1) }}
              >
                <h3 className="category-title">{category}</h3>
                {categorySkills.map((skill, index) => (
                  <SkillBar key={skill.id} skill={skill} index={index} />
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
