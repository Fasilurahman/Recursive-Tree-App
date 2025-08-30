import { useEffect, useState } from 'react';
import type { ThemeMode } from '../types';

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as ThemeMode) || 'system';
  });

  const applyTheme = (themeMode: ThemeMode) => {
    const root = document.documentElement;
    
    if (themeMode === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemPrefersDark);
    } else {
      root.classList.toggle('dark', themeMode === 'dark');
    }
  };

  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);

  return { mode, setMode };
};