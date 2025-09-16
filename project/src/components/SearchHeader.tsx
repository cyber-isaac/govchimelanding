import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell } from 'lucide-react';

const SearchHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={`relative border-b overflow-hidden transition-all duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-slate-950 via-blue-950/30 to-purple-950/20 border-white/10'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 border-gray-200'
      }`}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${
        isDark
          ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]'
      }`} />
      <div className={`absolute inset-0 ${
        isDark
          ? 'bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)]'
          : 'bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_50%,transparent_75%)]'
      }`} />
      
  <div className="relative w-full px-6 py-20 lg:py-24 xl:py-28">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          {/* Logo and Brand Name - Centered Together */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center items-center gap-4 mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-lg opacity-30 animate-pulse" />
              <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-full p-4 shadow-2xl flex items-center justify-center">
                <Bell className="w-12 h-12 text-white" />
              </div>
            </div>
            <motion.h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              GovChime
            </motion.h2>
          </motion.div>

          <motion.h1
            className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-8 leading-[1.1] tracking-tight transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}
          >
            <span className="block">Find, track, and win</span>
            <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
              government contracts
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed font-medium transition-colors duration-500 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              lineHeight: '1.7'
            }}
          >
            Real-time data, powerful insights, and tools to help you compete and win in federal contracting.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative group">
            <div className={`absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
            }`} />
            <div className={`relative backdrop-blur-xl rounded-2xl p-2 shadow-2xl transition-all duration-500 ${
              isDark
                ? 'bg-white/10 border border-white/20'
                : 'bg-white/80 border border-gray-200'
            }`}>
              <div className="relative">
                <Search className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 transition-colors duration-500 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  type="text"
                  placeholder="Search by keywords, contracts, industry codes, agencies, vendors, and more."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-16 pr-6 py-5 bg-transparent text-lg focus:outline-none focus:ring-0 border-0 transition-colors duration-500 ${
                    isDark
                      ? 'text-white placeholder-gray-400'
                      : 'text-gray-900 placeholder-gray-500'
                  }`}
                  style={{ 
                    fontFamily: "'Inter', system-ui, sans-serif"
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default SearchHeader;