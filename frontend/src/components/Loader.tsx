import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  const dotVariants = {
    animate: {
      scale: [1, 1.5, 1],
      rotate: [0, 180, 360],
      opacity: [0.6, 1, 0.6],
      transition: {
        repeat: Infinity,
        duration: 1.2,
        ease: 'easeInOut' as any,
      },
    },
  };

  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 8,

      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 flex items-center justify-center relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 20 20&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.4&quot;%3E%3Ccircle cx=&quot;3&quot; cy=&quot;3&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;17&quot; cy=&quot;17&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/svg%3E')]"></div>

      </div>

      {/* Loader Container */}
      <motion.div
        className="relative flex items-center justify-center"
        variants={containerVariants}
        animate="animate"
      >
        {/* Dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg shadow-blue-500/50"
            style={{
              transform: `rotate(${i * 72}deg) translate(40px)`,
            }}
            variants={dotVariants}
            animate="animate"
            transition={{ delay: i * 0.15 }}
          />
        ))}

        {/* Center Glow */}
        <motion.div
          className="w-12 h-12 bg-blue-500/20 rounded-full absolute"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            transition: {
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut' as any,
            },
          }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        className="absolute bottom-20 text-lg font-medium text-gray-700 dark:text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        Crafting your experience...
      </motion.div>
    </div>
  );
};

export default Loader;