import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
// import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { useTheme } from './hooks/useTheme';
import { pageTransition } from './utils/animations';
import { portfolioData } from './data/portfolio';

function App() {
  const { theme, isDark, changeTheme, toggleDarkMode } = useTheme();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* <ParticleBackground /> */}
      
      <Header 
        theme={theme}
        isDark={isDark}
        onThemeChange={changeTheme}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <main>
        <Hero personalInfo={portfolioData.personalInfo} />
        <About personalInfo={portfolioData.personalInfo} />
        <Skills skills={portfolioData.skills} />
        <Experience experience={portfolioData.experience} />
        <Projects projects={portfolioData.projects} />
        <Contact personalInfo={portfolioData.personalInfo} />
      </main>
      
      <Footer 
        personalInfo={portfolioData.personalInfo}
        socialLinks={portfolioData.socialLinks}
      />
    </motion.div>
  );
}

export default App;
