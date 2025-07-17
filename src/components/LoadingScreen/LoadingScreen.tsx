import React from 'react';
import { motion } from 'framer-motion';
import { loadingSpinner, loadingDots } from '../../utils/animations';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Animated Logo/Name */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">
            Devansh Pruthi
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-2">
            Software Engineer
          </p>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          className="relative mx-auto mb-6"
          variants={loadingSpinner}
          animate="animate"
        >
          <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent border-t-primary-600 rounded-full"></div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-gray-600 dark:text-gray-400"
          variants={loadingDots}
          animate="animate"
        >
          <span className="text-lg">Loading</span>
          <span className="loading-dots"></span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mt-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
