import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-900 to-purple-800"
    >
      <div className="flex items-center gap-6">
        <motion.span 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="text-lg tracking-tight cursor-pointer" 
          style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
        >
          GOVCHIME
        </motion.span>
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 px-2">
          <a href="#features" className="apple-link px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">
            Features
          </a>
          <a href="#contracts" className="apple-link px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">
            Contracts
          </a>
          <a href="#entities" className="apple-link px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">
            Entities
          </a>
          <a href="#analytics" className="apple-link px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">
            Analytics
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          href="#signin"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-gray-100 text-black hover:bg-gray-200 transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign in
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Header;