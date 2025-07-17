import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { PersonalInfo } from '../../types';
import { useScrollToSection } from '../../hooks/useScrollAnimation';
import { 
  // fadeInUp, 
  // fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  staggerItem,
  // typingContainer,
  // typingText,
  floatingAnimation,
  buttonHover
} from '../../utils/animations';

interface HeroProps {
  personalInfo: PersonalInfo;
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  const scrollToSection = useScrollToSection();
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    'Software Engineer',
    'React Developer',
    '.NET Developer',
    'Full Stack Developer'
  ];

  // Typing animation effect
 useEffect(() => {
    let timeout: number;
    const currentRoleText = roles[currentRole];
    
    if (typedText.length < currentRoleText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentRoleText.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setTypedText('');
      }, 2000);
    }
    
    return () => clearTimeout(timeout);
  }, [typedText, currentRole, roles]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 aurora opacity-30" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting */}
            <motion.div
              className="mb-6"
              variants={staggerItem}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium">
                👋 Hello, I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-responsive-xl font-bold mb-6"
              variants={staggerItem}
            >
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            {/* Animated Role */}
            <motion.div
              className="text-responsive-lg text-gray-600 dark:text-gray-300 mb-8 h-16 flex items-center justify-center lg:justify-start"
              variants={staggerItem}
            >
              <span className="mr-2">I'm a</span>
              <span className="text-primary-600 dark:text-primary-400 font-semibold min-w-[200px] text-left">
                {typedText}
                <motion.span
                  className="inline-block w-0.5 h-6 bg-primary-600 dark:bg-primary-400 ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={staggerItem}
            >
              Experienced full-stack developer with 2+ years of expertise in React, .NET Core, React Native, and modern web technologies. 
              I specialize in building scalable web applications, mobile apps, and enterprise solutions that drive business growth and user engagement.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 "
              variants={staggerItem}
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Mail className="w-5 h-5" />
                <span>Get In Touch</span>
              </motion.button>

              {/* <motion.button
                onClick={() => window.open('/resume.pdf', '_blank')}
                className="btn-outline flex items-center justify-center space-x-2 px-8 py-4 text-lg"
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.button> */}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-400"
              variants={staggerItem}
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            {/* Main Circle */}
            <motion.div
              className="relative w-80 h-80 rounded-full bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 p-1"
              variants={floatingAnimation}
              animate="animate"
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-text mb-2">2+</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">Years</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Experience</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-lg"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              React
            </motion.div>

            {/* <motion.div
              className="absolute -bottom-2 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
               React Native
            </motion.div>

            <motion.div
              className="absolute -top-2 -left-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Angular
            </motion.div> */}

            <motion.div
              className="absolute -bottom-0 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center text-white font-bold shadow-lg"
              animate={{
                y: [10, -10, 10],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              .NET
            </motion.div>

             <motion.div
              className="absolute bottom-1/3 -right-0 w-12 h-12 rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
              animate={{
                x: [-5, 5, -5],
                scale: [1.3, 1.1, 1.3],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              SQL
            </motion.div>

            <motion.div
              className="top- absolute top-1/4 -left-2 w-12 h-12 rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
              animate={{
                x: [-5, 5, -5],
                scale: [1.3, 0.9, 1.3],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              JS
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm">Scroll Down</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
