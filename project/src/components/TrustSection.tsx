import React from 'react';
import { motion } from 'framer-motion';

const TrustSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="py-16 px-6 border-b transition-colors duration-500 dark:border-white/10 border-gray-200"
    >
  <div className="w-full text-center">
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <p className="text-sm mb-6 font-medium tracking-wider uppercase transition-colors duration-500 dark:text-gray-400 text-gray-600">
            TRUSTED BY THOUSANDS OF CONTRACTORS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 transition-colors duration-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium dark:text-gray-300 text-gray-700">Live Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium dark:text-gray-300 text-gray-700">1M+ Contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium dark:text-gray-300 text-gray-700">AI-Powered</span>
            </div>
          </div>
        </motion.div>

        {/* Main Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <motion.h2 
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight transition-colors duration-500 dark:text-white text-gray-900"
            style={{ 
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: '-0.02em',
              cursor: 'default'
            }}
          >
            Real-Time Contract Data
          </motion.h2>
          
          <motion.p 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed font-medium transition-colors duration-500 dark:text-gray-300 text-gray-600"
            style={{ 
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              lineHeight: '1.6',
              cursor: 'default'
            }}
          >
            Live insights from federal contracting activity
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TrustSection;