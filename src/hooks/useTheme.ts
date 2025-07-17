import { useState, useEffect } from 'react';
import { ThemeName, applyTheme, getStoredTheme } from '../utils/theme';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>('blue');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize theme from localStorage
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
    applyTheme(storedTheme);

    // Initialize dark mode from localStorage or system preference
    const storedDarkMode = localStorage.getItem('portfolio-dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : prefersDark;
    
    setIsDark(initialDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);
  }, []);

  const changeTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('portfolio-dark-mode', JSON.stringify(newDarkMode));
  };

  return {
    theme,
    isDark,
    changeTheme,
    toggleDarkMode,
  };
}
