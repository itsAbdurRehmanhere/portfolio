import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = ['home', 'experience', 'projects', 'skills', 'contact'];
      let currentSection = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is somewhat near the top of the viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '#home', id: 'home' },
    { name: 'Experience', path: '#experience', id: 'experience' },
    { name: 'Projects', path: '#projects', id: 'projects' },
    { name: 'Skills', path: '#skills', id: 'skills' },
    { name: 'Contact', path: '#contact', id: 'contact' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <Code2 className="logo-icon" />
          <span className="logo-text">Abdur Rehman<span className="text-gradient">.Dev</span></span>
        </a>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <a 
                href={link.path} 
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  closeMenu();
                  // Optional: prevent default and use JS scroll for precise offset if needed
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass-panel ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.path} 
                className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
