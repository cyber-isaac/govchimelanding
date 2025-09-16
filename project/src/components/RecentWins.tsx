import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const RecentWins: React.FC = () => {
  const recentWins = [
    {
      company: 'Acme Systems Inc',
      amount: '$45.00M',
      agency: 'Department of Defense (DoD)',
      awardDate: '2025-01-15',
      location: 'Arlington, VA',
      naics: '541511',
      naicsDescription: 'Custom Computer Programming Services',
      setAside: '8(a)',
      color: 'text-blue-400'
    },
    {
      company: 'TechFlow Innovations',
      amount: '$12.30M',
      agency: 'Department of Homeland Security (DHS)',
      awardDate: '2025-01-14',
      location: 'San Diego, CA',
      naics: '541512',
      naicsDescription: 'Computer Systems Design Services',
      setAside: 'UNRESTRICTED',
      color: 'text-blue-400'
    },
    {
      company: 'Global Defense Solutions',
      amount: '$78.50M',
      agency: 'U.S. Navy',
      awardDate: '2025-01-13',
      location: 'Norfolk, VA',
      naics: '336411',
      naicsDescription: 'Aircraft Manufacturing',
      setAside: 'SDVOSB',
      color: 'text-blue-400'
    },
    {
      company: 'MedTech Solutions LLC',
      amount: '$6.70M',
      agency: 'Department of Veterans Affairs (VA)',
      awardDate: '2025-01-12',
      location: 'Denver, CO',
      naics: '541714',
      naicsDescription: 'Research and Development in Biotechnology',
      setAside: 'SB',
      color: 'text-blue-400'
    },
    {
      company: 'Infrastructure Partners',
      amount: '$156.00M',
      agency: 'General Services Administration (GSA)',
      awardDate: '2025-01-11',
      location: 'Atlanta, GA',
      naics: '237310',
      naicsDescription: 'Highway, Street, and Bridge Construction',
      setAside: 'HUBZone',
      color: 'text-blue-400'
    },
    {
      company: 'Cyber Shield Technologies',
      amount: '$28.90M',
      agency: 'U.S. Air Force',
      awardDate: '2025-01-10',
      location: 'Colorado Springs, CO',
      naics: '541513',
      naicsDescription: 'Computer Facilities Management Services',
      setAside: 'WOSB',
      color: 'text-blue-400'
    },
    {
      company: 'Healthcare Analytics Corp',
      amount: '$19.20M',
      agency: 'Department of Health and Human Services (HHS)',
      awardDate: '2025-01-09',
      location: 'Bethesda, MD',
      naics: '541611',
      naicsDescription: 'Administrative Management and General Management Consulting',
      setAside: 'UNRESTRICTED',
      color: 'text-blue-400'
    },
    {
      company: 'Energy Solutions Group',
      amount: '$92.00M',
      agency: 'Department of Energy (DOE)',
      awardDate: '2025-01-08',
      location: 'Houston, TX',
      naics: '237120',
      naicsDescription: 'Oil and Gas Pipeline and Related Structures Construction',
      setAside: 'UNRESTRICTED',
      color: 'text-blue-400'
    }
  ];

  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Filter function based on NAICS codes
  const getFilteredWins = () => {
    if (activeFilter === 'All') return recentWins.slice(0, 6);

    return recentWins.slice(0, 6).filter(win => {
      const naicsCode = parseInt(win.naics);

      switch (activeFilter) {
        case 'IT Services':
          return naicsCode >= 541500 && naicsCode <= 541599; // IT related codes in 5415xx range
        case 'Professional & Technical':
          return naicsCode >= 541000 && naicsCode <= 541999; // NAICS 54 - Professional, Scientific, and Technical Services
        case 'Construction & Infrastructure':
          return naicsCode >= 230000 && naicsCode <= 239999; // NAICS 23 - Construction
        case 'Manufacturing & Products':
          return (naicsCode >= 310000 && naicsCode <= 339999) || // NAICS 31-33 - Manufacturing
                 (naicsCode >= 420000 && naicsCode <= 429999);   // NAICS 42 - Wholesale Trade
        default:
          return true;
      }
    });
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const getSetAsideBadge = (setAside: string) => {
    const baseClasses = "inline-flex items-center rounded-md px-2 py-1 text-xs border";
    
    switch (setAside) {
      case '8(a)':
        return `${baseClasses} bg-blue-400/10 text-blue-400 border-blue-400/20`;
      case 'SDVOSB':
        return `${baseClasses} bg-blue-400/10 text-blue-400 border-blue-400/20`;
      case 'WOSB':
        return `${baseClasses} bg-blue-400/10 text-blue-400 border-blue-400/20`;
      case 'HUBZone':
        return `${baseClasses} bg-blue-400/10 text-blue-400 border-blue-400/20`;
      case 'SB':
        return `${baseClasses} bg-blue-400/10 text-blue-400 border-blue-400/20`;
      default:
        return `${baseClasses} bg-blue-400/10 text-blue-400 border-blue-400/20`;
    }
  };

  const scrollLeft = () => {
    const container = document.querySelector('.carousel-container');
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.querySelector('.carousel-container');
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="py-8 px-6"
    >
      <div className="w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl font-bold mb-4 dark:text-white text-gray-900 cursor-default" 
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
          >
            Just Awarded
          </motion.h2>
          <motion.p 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="text-lg mb-8 dark:text-gray-400 text-gray-600 cursor-default"
          >
            Recent contract awards to track market activity:
          </motion.p>
          
          {/* Filter Tabs */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="flex flex-wrap justify-center backdrop-blur-lg rounded-2xl p-2 dark:bg-white/5 dark:border-white/10 bg-white/90 border border-gray-300 shadow-lg gap-1">
              <button
                onClick={() => handleFilterClick('All')}
                className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200 ${
                  activeFilter === 'All'
                    ? 'bg-blue-500 text-white'
                    : 'dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterClick('IT Services')}
                className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200 ${
                  activeFilter === 'IT Services'
                    ? 'bg-blue-500 text-white'
                    : 'dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                IT Services
              </button>
              <button
                onClick={() => handleFilterClick('Professional & Technical')}
                className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200 ${
                  activeFilter === 'Professional & Technical'
                    ? 'bg-blue-500 text-white'
                    : 'dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Professional & Technical
              </button>
              <button
                onClick={() => handleFilterClick('Construction & Infrastructure')}
                className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200 ${
                  activeFilter === 'Construction & Infrastructure'
                    ? 'bg-blue-500 text-white'
                    : 'dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Construction & Infrastructure
              </button>
              <button
                onClick={() => handleFilterClick('Manufacturing & Products')}
                className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200 ${
                  activeFilter === 'Manufacturing & Products'
                    ? 'bg-blue-500 text-white'
                    : 'dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Manufacturing & Products
              </button>
            </div>
          </div>
        </motion.div>

  {/* Carousel Container */}
  <div className="relative max-w-7xl mx-auto">
    {/* Navigation Arrows */}
    <button
      onClick={scrollLeft}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700"
    >
      <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </button>
    <button
      onClick={scrollRight}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700"
    >
      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </button>

    <div className="overflow-x-auto scrollbar-hide pb-4 carousel-container">
      {/* Fixed width container showing 4 cards at once */}
      <div className="flex gap-4 px-12 min-w-0" style={{ width: 'max-content' }}>
        {getFilteredWins().map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + index * 0.1
              }}
              className="backdrop-blur-lg rounded-xl p-4 transition-all duration-300 hover:shadow-2xl cursor-pointer dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 bg-white/90 border border-gray-300 hover:bg-white shadow-lg w-72 flex-shrink-0"
            >
              <div className="mb-4">
                <h3 className="text-base font-semibold mb-1 dark:text-white text-gray-900">
                  {win.company}
                </h3>
                <div className={`text-xl font-bold ${win.color} mb-1`}>
                  {win.amount}
                </div>
                <div className="text-xs dark:text-gray-400 text-gray-500">
                  Awarded: {new Date(win.awardDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm dark:text-gray-300 text-gray-700">
                  <Building className="w-4 h-4" />
                  <span>Agency: {win.agency}</span>
                </div>
                <div className="flex items-center gap-2 text-sm dark:text-gray-300 text-gray-700">
                  <MapPin className="w-4 h-4" />
                  <span>Location: {win.location}</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  NAICS: <span className="font-mono dark:text-white text-gray-900">{win.naics}</span> — {win.naicsDescription}
                </p>
              </div>

              <div className="flex justify-end">
                <span className={getSetAsideBadge(win.setAside)}>
                  {win.setAside}
                </span>
              </div>
            </motion.div>
          ))}

          {/* View More Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{
              duration: 0.6,
              delay: 1.4
            }}
            onClick={() => window.location.href = '/awards'}
            className="backdrop-blur-lg rounded-xl p-4 transition-all duration-300 hover:shadow-2xl cursor-pointer dark:bg-gradient-to-br dark:from-blue-500/10 dark:to-purple-500/10 dark:border-blue-400/20 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 hover:bg-white shadow-lg w-72 flex-shrink-0 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-1 dark:text-white text-gray-900">
                View All Awards
              </h3>
              <p className="text-sm dark:text-gray-400 text-gray-600">
                See {Math.max(0, recentWins.length - getFilteredWins().length)} more recent awards
              </p>
              <div className="mt-3 text-xs text-blue-400 font-medium">
                Click to explore →
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className="w-3 h-3 rounded-full bg-blue-400/50 hover:bg-blue-400 transition-all duration-200"
              onClick={() => {
                const container = document.querySelector('.carousel-container');
                if (container) {
                  container.scrollTo({ left: index * 320 * 4, behavior: 'smooth' });
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
    </motion.section>
  );
};

export default RecentWins;