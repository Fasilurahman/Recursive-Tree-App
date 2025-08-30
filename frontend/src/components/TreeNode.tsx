import React, { useState } from 'react';
import { ChevronRight, Plus, Trash2, Edit3, Folder, FolderOpen, FileText } from 'lucide-react';
import type { Node, TreeOperations } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface TreeNodeProps {
  node: Node;
  operations: TreeOperations;
  level?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, operations, level = 0 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.name);
  const [isHovered, setIsHovered] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [loading, setLoading] = useState(false);

  const hasChildren = node.children && node.children.length > 0;
  const isFolder = hasChildren || showAddInput;
  const indentSize = Math.min(level * (window.innerWidth < 640 ? 12 : 16), 96);

  const LoadingSpinner: React.FC = () => (
    <motion.div
      className="flex items-center justify-center absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-xl z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="w-6 h-6 border-4 border-t-blue-600 border-gray-200 dark:border-t-blue-400 dark:border-gray-700 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );

  const handleToggleExpanded = () => {
    if (hasChildren || showAddInput) {
      operations.toggleExpanded(node.id);
    }
  };

const handleEditSubmit = async () => {
  if (!editValue.trim()) {
    toast.error('Node name cannot be empty');
    return;
  }
  setLoading(true);
  try {
    await operations.updateNode(node.id, editValue.trim(), node.parentId);
    toast.success('Node updated successfully');
    setIsEditing(false);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to update node');
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
};


  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setEditValue(node.name);
      setIsEditing(false);
    }
  };

const handleAddChild = async () => {
    if (!newChildName.trim()) {
      toast.error('Node name cannot be empty');
      return;
    }
    setLoading(true);
    try {
      await operations.addNode(node.id, newChildName.trim());
      toast.success('Node added successfully');
      setNewChildName('');
      setShowAddInput(false);

      console.log(node,'node');
      if (!node.isExpanded) {
        operations.toggleExpanded(node.id);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add node');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChildKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddChild();
    } else if (e.key === 'Escape') {
      setNewChildName('');
      setShowAddInput(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await operations.deleteNode(node.id);
      toast.success('Node deleted successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete node');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transition-all duration-300 ease-in-out z-10" style={{ marginLeft: `${indentSize}px` }}>
      {/* Main Node Card */}
      <motion.div
        className="group relative mb-2 rounded-xl border border-gray-200/50 bg-white/80 p-2 sm:p-3 shadow-sm backdrop-blur-sm hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
          {loading && <LoadingSpinner />}
        </AnimatePresence>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex min-w-[100px] sm:min-w-[150px] flex-1 items-center space-x-2 sm:space-x-3">
            {/* Expand/Collapse Button */}
            <button
              onClick={handleToggleExpanded}
              className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md transition-all duration-200 ${
                isFolder
                  ? 'text-blue-500 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
                  : 'invisible'
              }`}
            >
              <ChevronRight
                size={14}
                className={`transition-transform duration-300 sm:w-4 sm:h-4 ${node.isExpanded ? 'rotate-90' : ''}`}
              />
            </button>

            {/* Folder/File Icon */}
            <div className="flex-shrink-0 text-blue-500 dark:text-blue-400">
              {isFolder ? (
                node.isExpanded ? (
                  <FolderOpen size={16} className="fill-blue-100 dark:fill-blue-900/30 sm:w-5 sm:h-5" />
                ) : (
                  <Folder size={16} className="fill-blue-100 dark:fill-blue-900/30 sm:w-5 sm:h-5" />
                )
              ) : (
                <FileText size={16} className="sm:w-5 sm:h-5" />
              )}
            </div>

            {/* Node Name or Edit Input with Save Button */}
            {isEditing ? (
              <div className="flex flex-col sm:flex-row items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleEditKeyPress}
                  className="min-w-0 flex-1 rounded border-none bg-transparent px-2 py-1 font-medium text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100 text-sm sm:text-base"
                  autoFocus
                  disabled={loading}
                />
                <div className="flex space-x-2 w-full sm:w-auto">
                  <button
                    onClick={handleEditSubmit}
                    className="rounded-lg bg-blue-600 px-3 py-2 font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 text-sm sm:text-base"
                    disabled={loading || !editValue.trim()}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditValue(node.name);
                      setIsEditing(false);
                    }}
                    className="rounded-lg bg-gray-200 px-3 py-2 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 text-sm sm:text-base"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <span
                className="min-w-0 flex-1 cursor-pointer font-medium text-gray-900 transition-colors duration-200 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400 break-words text-sm sm:text-base"
                onClick={() => setIsEditing(true)}
                title={node.name}
              >
                {node.name}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          {!isEditing && (
            <motion.div
              className="flex flex-row items-center space-x-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isHovered ? 1 : 0.7, scale: isHovered ? 1 : 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setShowAddInput(true)}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-green-600 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-green-100 hover:to-green-200 dark:hover:bg-green-900/30"
                title="Add child node"
                disabled={loading}
              >
                <Plus size={16} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-blue-600 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 dark:hover:bg-blue-900/30"
                title="Edit node"
                disabled={loading}
              >
                <Edit3 size={16} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleDelete}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-red-600 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-red-100 hover:to-red-200 dark:hover:bg-red-900/30"
                title="Delete node"
                disabled={loading}
              >
                <Trash2 size={16} className="sm:w-5 sm:h-5" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Add Child Input */}
        {showAddInput && (
          <motion.div
            className="mt-2 sm:mt-3 border-t border-gray-200/50 pt-2 sm:pt-3 dark:border-gray-700/50 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
              <input
                type="text"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                onKeyDown={handleAddChildKeyPress}
                placeholder="Enter child node name..."
                className="flex-1 rounded-lg border border-gray-300/50 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600/50 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                autoFocus
                disabled={loading}
              />
              <div className="flex space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleAddChild}
                  className="rounded-lg bg-blue-600 px-3 py-2 font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 text-sm sm:text-base"
                  disabled={loading || !newChildName.trim()}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddInput(false);
                    setNewChildName('');
                  }}
                  className="rounded-lg bg-gray-200 px-3 py-2 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 text-sm sm:text-base"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Children Nodes */}
      {hasChildren && node.isExpanded && (
        <motion.div
          className="space-y-2 z-10"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              operations={operations}
              level={level + 1}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TreeNode;
