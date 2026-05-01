import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FiGithub size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FiLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FiTwitter size={24} />
            </a>
            <a
              href="mailto:hassan.ali@example.com"
              className="hover:text-blue-400 transition-colors"
            >
              <FiMail size={24} />
            </a>
          </div>
          <p className="text-gray-400 text-center">
            © {currentYear} Hassan Ali. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;