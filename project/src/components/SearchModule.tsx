import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchModuleProps {
  onSearch: (query: string) => void;
}

const SearchModule: React.FC<SearchModuleProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto mt-10 px-4"
    >
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          type="text"
          placeholder="Search by CAGE Code or UEI SAM..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full md:w-2/3 px-5 py-3 rounded-xl bg-gray-950 text-gray-100 border border-white/10 focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow hover:shadow-lg focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={handleSearch}
          className="px-5 py-3 rounded-xl bg-blue-400 text-black hover:bg-blue-300 transition-all duration-200 text-sm font-semibold hover:shadow-xl"
        >
          Search
        </motion.button>
      </div>
    </motion.section>
  );
};

export default SearchModule;