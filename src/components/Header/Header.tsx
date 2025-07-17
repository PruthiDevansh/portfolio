import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Palette } from 'lucide-react';
import { ThemeName, themes } from '../../utils/theme';
import { useScrollAnimation, useActiveSection, useScrollToSection } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/cn';
import { fadeInDown, buttonHover } from '../../utils/animations';

interface HeaderProps {
  theme: ThemeName;
  isDark: boolean;
  onThemeChange: (theme: ThemeName) => void;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  theme,
  isDark,
  onThemeChange,
  onToggleDarkMode,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { scrollDirection } = useScrollAnimation();
  const activeSection = useActiveSection();
  const scrollToSection = useScrollToSection();

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrollDirection === 'up' || window.scrollY < 100
          ? 'translate-y-0'
          : '-translate-y-full'
      )}
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
    >
      <div className="glass backdrop-blur-md border-b border-white/10 dark:border-gray-700/10">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold gradient-text">
                Devansh Pruthi
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
                    activeSection === item.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  )}
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                      layoutId="activeSection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Theme Controls & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Selector */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className="p-2 rounded-lg glass hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors"
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Palette className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {isThemeMenuOpen && (
                    <motion.div
                      className="absolute top-full right-0 mt-2 p-2 glass rounded-lg border border-white/10 dark:border-gray-700/10 min-w-[200px]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="space-y-1 bg-primary-50">
                        {Object.entries(themes).map(([key, themeData]) => (
                          <button
                            key={key}
                            onClick={() => {
                              onThemeChange(key as ThemeName);
                              setIsThemeMenuOpen(false);
                            }}
                            className={cn(
                              'w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors',
                              theme === key
                                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                : 'hover:bg-white/10 dark:hover:bg-gray-800/10'
                            )}
                          >
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                background: `rgb(${themeData.primary[500]})`,
                              }}
                            />
                            <span>{themeData.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={onToggleDarkMode}
                className="p-2 rounded-lg glass hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors"
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg glass hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors"
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden glass border-b border-white/10 dark:border-gray-700/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-4">
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      activeSection === item.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-800/10'
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
