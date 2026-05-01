import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container-custom text-center py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Hassan Ali"
            className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-xl"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Hi, I'm <span className="text-blue-600">Hassan Ali</span>
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 mb-8"
        >
          <TypeAnimation
            sequence={[
              'Backend Developer',
              2000,
              'FastAPI Expert',
              2000,
              'Python Enthusiast',
              2000,
              'IoT Developer',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="btn-primary cursor-pointer"
          >
            Hire Me
          </Link>
          <a
            href="/resume.pdf"
            download
            className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;