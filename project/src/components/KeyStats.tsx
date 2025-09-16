import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Clock, Award, MapPin, Building, PieChart, X, BarChart3, TrendingDown } from 'lucide-react';

// Define the filter types for navigation
interface OpportunityFilter {
  dateRange?: string;
  expirationRange?: string;
  awardRange?: string;
  states?: string[];
  naicsCodes?: string[];
  searchQuery?: string;
}

const KeyStats: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const stats = [
    {
      title: 'New Opportunities Today',
      value: '247',
      change: '+12% vs yesterday',
      icon: TrendingUp,
      color: 'text-green-300',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20',
      detailedContent: {
        description: 'Fresh contract opportunities posted in the last 24 hours across all federal agencies.',
        breakdown: [
          { label: 'Defense Contracts', value: '89', percentage: '36%' },
          { label: 'IT Services', value: '67', percentage: '27%' },
          { label: 'Construction', value: '45', percentage: '18%' },
          { label: 'Healthcare', value: '46', percentage: '19%' }
        ],
        trend: 'up',
        period: 'vs yesterday'
      }
    },
    {
      title: 'Opportunities Expiring in 7 Days',
      value: '134',
      change: '',
      icon: Clock,
      color: 'text-amber-300',
      bgColor: 'bg-amber-400/10',
      borderColor: 'border-amber-400/20',
      detailedContent: {
        description: 'Time-sensitive opportunities that require immediate attention to avoid missing deadlines.',
        breakdown: [
          { label: 'High Priority', value: '23', percentage: '17%' },
          { label: 'Medium Priority', value: '67', percentage: '50%' },
          { label: 'Low Priority', value: '44', percentage: '33%' }
        ],
        trend: 'neutral',
        period: 'Next 7 days'
      }
    },
    {
      title: 'Awards Last 30 Days',
      value: '+8.3%',
      change: 'vs last year',
      icon: Award,
      color: 'text-blue-300',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20',
      detailedContent: {
        description: 'Contract award growth compared to the previous 30-day period, showing market momentum.',
        breakdown: [
          { label: 'Small Business', value: '+12.4%', percentage: '45%' },
          { label: 'Large Business', value: '+5.8%', percentage: '32%' },
          { label: 'Non-Profit', value: '+7.2%', percentage: '23%' }
        ],
        trend: 'up',
        period: 'vs last month'
      }
    },
    {
      title: 'Top States This Quarter',
      value: 'CA, TX, VA',
      change: '$8.2B, $6.1B, $5.4B',
      icon: MapPin,
      color: 'text-purple-300',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/20',
      detailedContent: {
        description: 'States with the highest contract award values this quarter, indicating regional market strength.',
        breakdown: [
          { label: 'California', value: '$8.2B', percentage: '28%' },
          { label: 'Texas', value: '$6.1B', percentage: '21%' },
          { label: 'Virginia', value: '$5.4B', percentage: '18%' },
          { label: 'Florida', value: '$3.8B', percentage: '13%' },
          { label: 'Maryland', value: '$3.2B', percentage: '11%' },
          { label: 'New York', value: '$2.9B', percentage: '9%' }
        ],
        trend: 'up',
        period: 'Q4 2024'
      }
    },
    {
      title: 'Top Growing Industries',
      value: '541511',
      change: 'Custom Computer Programming +45% vs last period',
      icon: Building,
      color: 'text-teal-300',
      bgColor: 'bg-teal-400/10',
      borderColor: 'border-teal-400/20',
      detailedContent: {
        description: 'NAICS codes showing the highest growth in contract awards compared to previous periods.',
        breakdown: [
          { label: '541511 - Custom Computer Programming', value: '+45%', percentage: 'Top Growth' },
          { label: '541512 - Computer Systems Design', value: '+32%', percentage: 'High Growth' },
          { label: '541513 - Computer Facilities Management', value: '+28%', percentage: 'Growing' },
          { label: '561210 - Facilities Support Services', value: '+24%', percentage: 'Moderate' }
        ],
        trend: 'up',
        period: 'vs Q3 2024'
      }
    },
    {
      title: 'Set-Aside Mix (YTD)',
      value: 'Small Business — 62%',
      change: 'WOSB — 14%, HUBZone — 9%',
      icon: PieChart,
      color: 'text-indigo-300',
      bgColor: 'bg-indigo-400/10',
      borderColor: 'border-indigo-400/20',
      detailedContent: {
        description: 'Distribution of contract awards by set-aside category year-to-date, showing diversity in contracting.',
        breakdown: [
          { label: 'Small Business', value: '62%', percentage: '62%' },
          { label: 'Women-Owned Small Business', value: '14%', percentage: '14%' },
          { label: 'HUBZone', value: '9%', percentage: '9%' },
          { label: 'Minority-Owned', value: '8%', percentage: '8%' },
          { label: 'Service-Disabled Veteran', value: '7%', percentage: '7%' }
        ],
        trend: 'stable',
        period: 'Year to Date 2024'
      }
    }
  ];

  // Navigation handler with filters
  const handleCardNavigation = (index: number) => {
    const filterConfigs: OpportunityFilter[] = [
      // Card 1: New Opportunities Today
      { dateRange: 'last-24-hours' },
      // Card 2: Opportunities Expiring in 7 Days
      { expirationRange: 'next-7-days' },
      // Card 3: Awards Last 30 Days
      { awardRange: 'last-30-days' },
      // Card 4: Top States This Quarter
      { states: ['CA', 'TX', 'VA'] },
      // Card 5: Top Growing Industries
      { naicsCodes: ['541511'] },
      // Card 6: Set-Aside Mix (no navigation for this one)
      {}
    ];

    const filter = filterConfigs[index];
    if (filter && Object.keys(filter).length > 0) {
      // Create URL with filters
      const params = new URLSearchParams();

      if (filter.dateRange) params.set('dateRange', filter.dateRange);
      if (filter.expirationRange) params.set('expirationRange', filter.expirationRange);
      if (filter.awardRange) params.set('awardRange', filter.awardRange);
      if (filter.states) params.set('states', filter.states.join(','));
      if (filter.naicsCodes) params.set('naicsCodes', filter.naicsCodes.join(','));
      if (filter.searchQuery) params.set('q', filter.searchQuery);

      // Navigate to opportunities page with filters
      const url = `/opportunities?${params.toString()}`;
      window.location.href = url;
    } else {
      // For cards without navigation filters, show modal as before
      setActiveCard(index);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="py-4 px-4"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  scale: 1.03,
                  y: -3,
                  rotateX: 2,
                  boxShadow: "0 20px 40px -12px rgba(0,0,0,0.25), 0 8px 32px -8px rgba(0,0,0,0.12)"
                }}
                whileTap={{ scale: 0.98, y: -1 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.03,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                onClick={() => handleCardNavigation(index)}
                className={`backdrop-blur-lg rounded-xl border ${stat.borderColor} p-3 transition-all duration-150 hover:shadow-2xl cursor-pointer dark:bg-white/5 dark:hover:bg-white/15 bg-white/95 hover:bg-white shadow-lg hover:shadow-blue-500/10 group max-w-xs w-full mx-auto aspect-[1/1.35] min-h-[175px] flex flex-col justify-center overflow-hidden relative`}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Icon at top */}
                <div className="flex justify-center mb-1.5">
                  <motion.div
                    className={`p-2 rounded-lg ${stat.bgColor} ${stat.color} relative overflow-hidden`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    {/* Subtle glow effect */}
                    <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-200 ${stat.bgColor} blur-sm`} />
                    <motion.div
                      animate={{
                        y: [0, -1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    >
                      <Icon className="w-5 h-5 relative z-10" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Title - readable size */}
                <h3 className="text-xs font-semibold mb-1.5 dark:text-gray-200 text-gray-800 text-center leading-tight px-1 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  lineHeight: '1.2',
                  fontSize: '12px'
                }}>
                  {stat.title}
                </h3>

                {/* Main value - smaller but still prominent */}
                <div className="text-center mb-0.5 relative">
                  {/* Subtle background pulse on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, ${stat.color.includes('green') ? '#10b981' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#8b5cf6' : stat.color.includes('teal') ? '#14b8a6' : '#f59e0b'} 0%, transparent 70%)`
                    }}
                  />
                  <motion.span
                    className={`text-lg font-bold ${stat.color} inline-block break-words relative z-10`}
                    style={{ fontSize: '16px' }}
                    whileHover={{
                      scale: 1.05,
                      textShadow: `0 0 8px ${stat.color.includes('green') ? '#10b981' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#8b5cf6' : stat.color.includes('teal') ? '#14b8a6' : '#f59e0b'}40`
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {stat.value}
                  </motion.span>
                </div>

                {/* Minimal change indicator - readable size */}
                {stat.change && (
                  <p className="text-[10px] dark:text-gray-400 text-gray-600 text-center leading-tight px-1 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const,
                    lineHeight: '1.2',
                    fontSize: '11px'
                  }}>
                    {stat.change}
                  </p>
                )}

                {/* Click hint - smaller with animation */}
                <motion.div
                  className="mt-1 text-center"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="text-[9px] text-gray-500 inline-block"
                    style={{ fontSize: '10px' }}
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1
                    }}
                  >
                    {index < 5 ? 'View opportunities' : 'Click for details'}
                  </motion.span>
                </motion.div>

                {/* Subtle border glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, ${stat.color.includes('green') ? '#10b981' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#8b5cf6' : stat.color.includes('teal') ? '#14b8a6' : '#f59e0b'}08 50%, transparent 100%)`,
                    filter: 'blur(1px)'
                  }}
                />

                {/* Floating particles effect */}
                <motion.div
                  className="absolute top-2 right-2 w-1 h-1 bg-current opacity-0 group-hover:opacity-40 rounded-full"
                  animate={{
                    y: [0, -4, 0],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                  style={{ color: stat.color.includes('green') ? '#10b981' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#8b5cf6' : stat.color.includes('teal') ? '#14b8a6' : '#f59e0b' }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-current opacity-0 group-hover:opacity-30 rounded-full"
                  animate={{
                    y: [0, -3, 0],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  style={{ color: stat.color.includes('green') ? '#10b981' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#8b5cf6' : stat.color.includes('teal') ? '#14b8a6' : '#f59e0b' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotateX: 15 }}
              transition={{
                duration: 0.25,
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mx-auto relative overflow-hidden border border-white/20 dark:border-gray-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-5"
                animate={{
                  background: [
                    `linear-gradient(45deg, ${stats[activeCard].color.includes('green') ? '#10b981' : stats[activeCard].color.includes('blue') ? '#3b82f6' : stats[activeCard].color.includes('purple') ? '#8b5cf6' : stats[activeCard].color.includes('teal') ? '#14b8a6' : '#f59e0b'} 0%, transparent 100%)`,
                    `linear-gradient(135deg, ${stats[activeCard].color.includes('green') ? '#10b981' : stats[activeCard].color.includes('blue') ? '#3b82f6' : stats[activeCard].color.includes('purple') ? '#8b5cf6' : stats[activeCard].color.includes('teal') ? '#14b8a6' : '#f59e0b'} 0%, transparent 100%)`,
                    `linear-gradient(225deg, ${stats[activeCard].color.includes('green') ? '#10b981' : stats[activeCard].color.includes('blue') ? '#3b82f6' : stats[activeCard].color.includes('purple') ? '#8b5cf6' : stats[activeCard].color.includes('teal') ? '#14b8a6' : '#f59e0b'} 0%, transparent 100%)`,
                    `linear-gradient(315deg, ${stats[activeCard].color.includes('green') ? '#10b981' : stats[activeCard].color.includes('blue') ? '#3b82f6' : stats[activeCard].color.includes('purple') ? '#8b5cf6' : stats[activeCard].color.includes('teal') ? '#14b8a6' : '#f59e0b'} 0%, transparent 100%)`,
                    `linear-gradient(45deg, ${stats[activeCard].color.includes('green') ? '#10b981' : stats[activeCard].color.includes('blue') ? '#3b82f6' : stats[activeCard].color.includes('purple') ? '#8b5cf6' : stats[activeCard].color.includes('teal') ? '#14b8a6' : '#f59e0b'} 0%, transparent 100%)`
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stats[activeCard].bgColor}`}>
                    {(() => {
                      const IconComponent = stats[activeCard].icon;
                      if (!IconComponent) {
                        return <div className="w-5 h-5 bg-gray-400 rounded" />;
                      }
                      return <IconComponent className={`w-5 h-5 ${stats[activeCard].color}`} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {stats[activeCard].title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stats[activeCard].detailedContent.period}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveCard(null)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {stats[activeCard].detailedContent.description}
                </p>

                {/* Main Value Display */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-1 ${stats[activeCard].color}`}>
                      {stats[activeCard].value}
                    </div>
                    {stats[activeCard].change && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stats[activeCard].change}
                      </div>
                    )}
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Breakdown
                  </h4>
                  <div className="space-y-2">
                    {stats[activeCard].detailedContent.breakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${stats[activeCard].color}`}>
                            {item.value}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({item.percentage})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trend Indicator */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Trend
                    </span>
                    <div className="flex items-center gap-2">
                      {stats[activeCard].detailedContent.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      )}
                      {stats[activeCard].detailedContent.trend === 'down' && (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        stats[activeCard].detailedContent.trend === 'up' ? 'text-green-600' :
                        stats[activeCard].detailedContent.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {stats[activeCard].detailedContent.trend === 'up' ? 'Trending Up' :
                         stats[activeCard].detailedContent.trend === 'down' ? 'Trending Down' :
                         'Stable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default KeyStats;