import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import type { ThemeMode } from '../types';

interface ThemeToggleProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, onModeChange }) => {
  const modes: Array<{ key: ThemeMode; icon: React.ReactNode; label: string }> = [
    { key: 'light', icon: <Sun size={18} />, label: 'Light' },
    { key: 'dark', icon: <Moon size={18} />, label: 'Dark' },
    { key: 'system', icon: <Monitor size={18} />, label: 'System' },
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {modes.map((themeMode) => (
        <button
          key={themeMode.key}
          onClick={() => onModeChange(themeMode.key)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
            mode === themeMode.key
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          {themeMode.icon}
          <span className="text-sm font-medium hidden sm:inline">{themeMode.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;