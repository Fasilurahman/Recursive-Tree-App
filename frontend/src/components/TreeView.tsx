import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Node, TreeOperations } from '../types';
import Button from './Button';
import TreeNode from './TreeNode';
import { toast } from 'sonner';

interface TreeViewProps {
  nodes: Node[];
  operations: TreeOperations;
  loading?: boolean;
}

const TreeView: React.FC<TreeViewProps> = ({ nodes, operations, loading = false }) => {
  const [showRootInput, setShowRootInput] = useState(false);
  const [newRootName, setNewRootName] = useState('');

const handleAddRoot = () => {
  console.log(newRootName,'newRootName');
  if (!newRootName.trim()) {
    toast.error('Root name cannot be empty');
    return;
  }

  operations.addNode(null, newRootName.trim());
  setNewRootName('');
  setShowRootInput(false);
};

  const handleRootKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddRoot();
    } else if (e.key === 'Escape') {
      setNewRootName('');
      setShowRootInput(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
        <div className="mx-auto max-w-7xl space-y-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-gray-200/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
                  <div className="h-4 w-1/3 rounded bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[url('data:image/svg+xml,%3Csvg width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 20 20&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M0 0h6v6H0zM10 0h6v6h-6zM0 10h6v6H0zM10 10h6v6h-6z&quot;/&gt;%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Add Root Node Section */}
      <motion.div
        className="relative z-10 mx-auto mb-8 max-w-3xl flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {showRootInput ? (
            <motion.div
              className="rounded-2xl border border-gray-200/50 bg-white/80 p-4 sm:p-6 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80 w-full sm:w-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:space-x-4">
                <div className="relative flex-1">
                  <motion.input
                    type="text"
                    value={newRootName}
                    onChange={(e) => setNewRootName(e.target.value)}
                    onKeyDown={handleRootKeyPress}
                    placeholder="Enter root node name..."
                    className="w-full rounded-xl border border-gray-300/50 bg-gradient-to-r from-white to-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-400/50 dark:border-gray-600/50 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 dark:text-gray-100 dark:placeholder-gray-400 pr-12 shadow-sm transition-all duration-300"
                    autoFocus
                    whileFocus={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
                  />
                  {newRootName && (
                    <motion.button
                      onClick={() => setNewRootName('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleAddRoot}
                    variant="primary"
                    size="md"
                    // disabled={!newRootName.trim()}
                    className="flex items-center space-x-2"
                  >
                    <motion.span
                      className="flex items-center space-x-2"
                      whileHover={{ x: 3 }}
                    >
                      <Plus size={18} />
                      <span>Add Root</span>
                    </motion.span>
                  </Button>
                  <Button
                    onClick={() => {
                      setShowRootInput(false);
                      setNewRootName('');
                    }}
                    variant="secondary"
                    size="md"
                    className="flex items-center space-x-2"
                  >
                    <motion.span
                      className="flex items-center space-x-2"
                      whileHover={{ x: 3 }}
                    >
                      <X size={18} />
                      <span>Cancel</span>
                    </motion.span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <Button
              onClick={() => setShowRootInput(true)}
              variant="primary"
              size="md"
              className="relative flex items-center space-x-2"
            >
              <motion.span
                className="flex items-center space-x-2"
                whileHover={{ x: 3 }}
              >
                <Plus size={20} />
                <span>Add Root Node</span>
              </motion.span>
              <motion.span
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0"
                whileHover={{ opacity: 0.25 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-300"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              />
              <motion.span
                className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-indigo-300"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </Button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tree Nodes */}
      <div className="relative z-10 mx-auto max-w-7xl space-y-2">
        {nodes.length === 0 ? (
          <motion.div
            className="py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Plus size={28} className="text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Start Your Tree
            </h3>
            <p className="mx-auto max-w-md text-gray-500 dark:text-gray-400">
              Create your first root node to begin building your tree structure
            </p>
          </motion.div>
        ) : (
          nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TreeNode node={node} operations={operations} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TreeView;