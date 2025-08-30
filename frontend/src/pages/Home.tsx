import React from 'react';
import { Trees as Tree, Github, ExternalLink } from 'lucide-react';
import TreeView from '../components/TreeView';
import ThemeToggle from '../components/ThemeToggle';
import { useTreeData } from '../hooks/useTreeData';
import { useTheme } from '../hooks/useTheme';

const HomePage: React.FC = () => {
  const { nodes, operations, loading } = useTreeData();
  const { mode, setMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 rounded-xl">
                <Tree size={20} className="text-white sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Recursive Tree App
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Build infinite nested structures
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center sm:justify-end space-x-4">
              <ThemeToggle mode={mode} onModeChange={setMode} />
              <a
                href="https://github.com/Fasilurahman"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
              >
                <Github size={16} className="sm:w-5 sm:h-5" />
                <ExternalLink size={12} className="sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Interactive Tree Builder
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create, edit, and organize nodes in an infinitely nested tree structure. 
              Click to expand, hover to reveal actions, and build complex hierarchies with ease.
            </p>
          </div>

          {/* Tree Component */}
          <TreeView nodes={nodes} operations={operations} loading={loading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Built with Vite, React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;