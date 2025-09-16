import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden sm:pt-28 pt-24 pb-14 bg-gradient-to-br from-theme-bg-primary via-theme-bg-secondary to-theme-bg-accent"
    >
      {/* Background pattern for light mode */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.08),transparent_50%)]" />

      <div className="relative w-full max-w-7xl sm:px-6 lg:px-8 mr-auto ml-auto pr-4 pl-4 flex flex-col gap-10 lg:gap-16 text-center items-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-accent-light/20 dark:bg-blue-500/20 border border-theme-accent-primary/20 dark:border-blue-400/20 backdrop-blur-sm"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-theme-accent-primary dark:text-blue-300">
              Real-Time Government Contract Insights
            </span>
            <div className="w-2 h-2 rounded-full bg-theme-accent-primary dark:bg-blue-400 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-h1 font-display text-theme-text-primary dark:text-white leading-tight tracking-tight"
          >
            GovChime
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-body text-theme-text-secondary dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Find, track, and win GOV contracts
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -12px rgba(37, 99, 235, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              href="#start"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-theme-accent-primary dark:bg-blue-500 text-white hover:bg-theme-accent-secondary dark:hover:bg-blue-600 transition-all duration-300 shadow-soft hover:shadow-medium focus:outline-none focus:ring-4 focus:ring-theme-accent-light dark:focus:ring-blue-300/30"
            >
              <span>Start Free Trial</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(37, 99, 235, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              href="#see-product"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 text-theme-text-primary dark:text-gray-100 bg-white/80 dark:bg-white/5 border border-theme-border-primary dark:border-white/10 backdrop-blur-lg hover:shadow-medium focus:outline-none focus:ring-4 focus:ring-theme-accent-light/30 dark:focus:ring-blue-300/20"
            >
              <span>Explore Platform</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-theme-text-primary dark:text-white mb-1">500K+</div>
              <div className="text-sm text-theme-text-tertiary dark:text-gray-400">Contracts Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-theme-text-primary dark:text-white mb-1">99.9%</div>
              <div className="text-sm text-theme-text-tertiary dark:text-gray-400">Data Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-theme-text-primary dark:text-white mb-1">24/7</div>
              <div className="text-sm text-theme-text-tertiary dark:text-gray-400">Real-time Updates</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;