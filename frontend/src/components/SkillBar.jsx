import { motion } from 'framer-motion';
import './SkillBar.css';

const SkillBar = ({ skill, index }) => {
  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percentage">{skill.proficiency}%</span>
      </div>
      <div className="skill-bar-bg glass-panel">
        <motion.div 
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
