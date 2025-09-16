import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Bell,
  Target,
  Brain,
  Trophy,
  TrendingUp,
  Building,
  BarChart3,
  Briefcase,
  BookOpen,
  Wrench,
  Menu,
  X,
  ChevronRight,
  FileText,
  Gift,
  Users,
  MapPin,
  FileSearch,
  PieChart,
} from 'lucide-react';
import { mockContracts } from '../data/mockData';

type Subcategory = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  description?: string;
  isExpandable?: boolean;
  subcategories?: Subcategory[];
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState<string[]>(['opportunities', 'market-intelligence', 'analytics']);
  const [newOpsCount, setNewOpsCount] = useState<number>(0);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Compute initial new opportunities (mock: contracts awarded in the last 7 days)
  useEffect(() => {
    const daysAgo = (n: number) => {
      const d = new Date();
      d.setDate(d.getDate() - n);
      return d;
    };

    const sevenDaysAgo = daysAgo(7);
    const recent = mockContracts.filter(c => new Date(c.awardDate) >= sevenDaysAgo);
    setNewOpsCount(recent.length);

    // Simulate incoming opportunities every 20 seconds (demo only)
    const interval = setInterval(() => {
      setNewOpsCount(prev => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const navigationSections: NavSection[] = [
    {
      title: 'Workspace',
      items: [
        {
          id: 'dashboard',
          label: 'Feed',
          icon: Home,
          href: '#dashboard',
          description: 'Recent activity & signals'
        },
        {
          id: 'my-signals',
          label: 'Alerts',
          icon: Bell,
          href: '#my-signals',
          description: 'Saved notifications'
        }
      ]
    },
    {
      title: '',
      items: [
        {
          id: 'opportunities',
          label: 'Opportunities',
          icon: Target,
          href: '#opportunities',
          description: 'Active contracts & RFPs',
          isExpandable: true,
          subcategories: [
            { id: 'contracts', label: 'Contracts', icon: FileText },
            { id: 'grants', label: 'Grants', icon: Gift }
          ]
        },
        {
          id: 'market-intelligence',
          label: 'Intelligence',
          icon: Brain,
          href: '#market-intelligence',
          description: 'Market insights & profiles',
          isExpandable: true,
          subcategories: [
            { id: 'vendor-profiles', label: 'Vendors', icon: Users },
            { id: 'agency-profiles', label: 'Agencies', icon: Building },
            { id: 'market-maps', label: 'Maps', icon: MapPin },
            { id: 'references-guide', label: 'References', icon: FileSearch }
          ]
        }
      ]
    },
    {
      title: 'Analytics',
      items: [
        {
          id: 'analytics-section',
          label: 'Analytics',
          icon: BarChart3,
          href: '#analytics-section',
          description: 'Data insights & trends',
          isExpandable: true,
          subcategories: [
            { id: 'leaderboards', label: 'Leaderboards', icon: Trophy },
            { id: 'spending-trends', label: 'Spending', icon: TrendingUp },
            { id: 'agency-trends', label: 'Agencies', icon: Building },
            { id: 'set-aside-performance', label: 'Set-Asides', icon: PieChart }
          ]
        }
      ]
    },
    {
      title: '',
      items: [
        {
          id: 'pursuit-management',
          label: 'Pursuits',
          icon: Briefcase,
          href: '#pursuit-management',
          description: 'Manage bids & teams'
        },
        {
          id: 'resources',
          label: 'Resources',
          icon: BookOpen,
          href: '#resources',
          description: 'Guides & templates'
        },
        {
          id: 'tools-admin',
          label: 'Tools',
          icon: Wrench,
          href: '#tools-admin',
          description: 'Admin & settings'
        }
      ]
    }
  ];

  const handleItemClick = (itemId: string, href?: string) => {
    setActiveItem(itemId);
    // Smooth scroll to section
    if (!href) return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setActiveItem(subcategoryId);
    // Handle subcategory navigation here
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen z-40 flex flex-col bg-theme-bg-secondary shadow-xl border-r border-theme-border-primary transition-all duration-200 ${isExpanded ? 'w-80' : 'w-20'}`}>
        {/* Header */}
        <div className="border-b border-theme-border-primary p-4">
          <div className="flex items-center justify-between relative">
            {/* Logo and Brand - Centered */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg blur-sm opacity-30" />
                <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-soft w-8 h-8">
                  <Bell className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Brand text - Only when expanded */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-center min-h-[32px]"
                  >
                    <h1 className="text-xs font-bold text-theme-text-primary font-display tracking-tight leading-tight">
                      <span className="text-sm font-extrabold tracking-wider">GovChime</span>
                    </h1>
                    <p className="text-xs text-theme-text-secondary font-base leading-tight">Government Contract Intelligence</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Toggle button */}
            <button
              onClick={toggleSidebar}
              className="bg-theme-bg-tertiary border border-theme-border-secondary rounded-lg p-2 focus:ring-2 ring-primary-400 hover:bg-theme-bg-primary transition-colors duration-150"
            >
              {isExpanded ? <X className="w-5 h-5 text-theme-text-secondary" /> : <Menu className="w-5 h-5 text-theme-text-secondary" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Shortcuts section */}
          <div>
            <AnimatePresence>
              {isExpanded && (
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs uppercase tracking-wider text-theme-text-tertiary mb-2 px-2 font-semibold font-display"
                >
                  Shortcuts
                </motion.h3>
              )}
            </AnimatePresence>
            <div className="space-y-1">
              {/* Searches Shortcut */}
              <div className="relative group">
                <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-150 text-theme-text-secondary hover:bg-primary-700/20 hover:text-theme-text-primary focus:ring-2 focus:ring-primary-400 focus:outline-none">
                  <FileSearch className="w-6 h-6 text-theme-text-tertiary" />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-semibold font-base truncate"
                      >
                        Searches
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                {!isExpanded && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-[9999] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="relative">
                      <div className="whitespace-nowrap px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-xl border border-gray-700">
                        Searches
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 transform rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Teams Shortcut */}
              <div className="relative group">
                <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-150 text-theme-text-secondary hover:bg-primary-700/20 hover:text-theme-text-primary focus:ring-2 focus:ring-primary-400 focus:outline-none">
                  <Users className="w-6 h-6 text-theme-text-tertiary" />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-semibold font-base truncate"
                      >
                        Teams
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                {!isExpanded && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-[9999] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="relative">
                      <div className="whitespace-nowrap px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-xl border border-gray-700">
                        Teams
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 transform rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tools Shortcut */}
              <div className="relative group">
                <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-150 text-theme-text-secondary hover:bg-primary-700/20 hover:text-theme-text-primary focus:ring-2 focus:ring-primary-400 focus:outline-none">
                  <Wrench className="w-6 h-6 text-theme-text-tertiary" />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-semibold font-base truncate"
                      >
                        Tools
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                {!isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none"
                  >
                    <div className="relative">
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                        className="whitespace-nowrap px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-lg border border-gray-700"
                      >
                        Tools
                      </motion.span>
                      {/* Arrow */}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 transform rotate-45"></div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Main navigation sections */}
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <AnimatePresence>
                {isExpanded && section.title && (
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15, delay: sectionIndex * 0.02 }}
                    className="text-xs uppercase tracking-wider text-theme-text-tertiary mb-2 px-2 font-semibold font-display"
                  >
                    {section.title}
                  </motion.h3>
                )}
              </AnimatePresence>
              
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  const isSectionOpen = expandedSections.includes(item.id);
                  const isOpportunities = item.id === 'opportunities';
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: (sectionIndex * section.items.length + itemIndex) * 0.02 }}
                      className="relative group"
                    >
                      <button
                        onClick={() => {
                          if (item.isExpandable) {
                            toggleSection(item.id);
                          } else {
                            handleItemClick(item.id, item.href);
                          }
                        }}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-150 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                          isActive
                            ? 'bg-primary-700/40 border border-primary-400/70 shadow-md text-theme-text-primary'
                            : 'text-theme-text-secondary hover:bg-primary-700/20 hover:text-theme-text-primary border border-transparent'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${
                          isActive 
                            ? 'bg-primary-500/20' 
                            : 'bg-theme-bg-tertiary'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            isActive 
                              ? 'text-primary-400' 
                              : 'text-theme-text-tertiary'
                          }`} />
                        </div>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex-1 text-left min-w-0"
                            >
                              <div className="text-sm font-semibold font-base leading-5 truncate">
                                {item.label}
                              </div>
                              <div className="text-xs text-theme-text-tertiary font-base truncate">
                                {item.description}
                              </div>
                              {/* Opportunities badge */}
                              {isOpportunities && (
                                <div className="mt-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-theme-status-success text-white">
                                    {newOpsCount} new
                                  </span>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {isExpanded && item.isExpandable && (
                          <motion.div
                            animate={{ rotate: isSectionOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4 text-theme-text-tertiary" />
                          </motion.div>
                        )}
                      </button>

                      {/* Tooltip for minimized sidebar */}
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: (sectionIndex * section.items.length + itemIndex) * 0.02 }}
                          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none"
                        >
                          <div className="relative">
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              whileHover={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.15 }}
                              className="whitespace-nowrap px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-lg border border-gray-700"
                            >
                              {item.label}
                            </motion.span>
                            {/* Arrow */}
                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 transform rotate-45"></div>
                          </div>
                        </motion.div>
                      )}

                      {/* Subcategories */}
                      <AnimatePresence>
                        {item.subcategories && isExpanded && isSectionOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-6 mt-1 space-y-1 border-l border-theme-border-primary pl-4"
                          >
                            {item.subcategories.map((subcategory) => {
                              const SubIcon = subcategory.icon;
                              const isSubActive = activeItem === subcategory.id;
                              
                              return (
                                <motion.div
                                  key={subcategory.id}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="relative group"
                                >
                                  <button
                                    onClick={() => handleSubcategoryClick(subcategory.id)}
                                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-150 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                                      isSubActive
                                        ? 'bg-primary-700/30 text-theme-text-primary border border-primary-400/50 shadow-sm'
                                        : 'text-theme-text-secondary hover:bg-primary-700/10 hover:text-theme-text-primary'
                                    }`}
                                  >
                                    <div className={`p-1 rounded-md ${
                                      isSubActive 
                                        ? 'bg-primary-400/20' 
                                        : 'bg-theme-bg-tertiary'
                                    }`}>
                                      <SubIcon className="w-4 h-4 text-theme-text-tertiary" />
                                    </div>
                                    <span className="text-sm font-semibold font-base truncate">{subcategory.label}</span>
                                  </button>

                                  {/* Tooltip for minimized subcategories */}
                                  {!isExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none"
                                    >
                                      <div className="relative">
                                        <motion.span
                                          initial={{ opacity: 0, x: -10 }}
                                          whileHover={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.15 }}
                                          className="whitespace-nowrap px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-lg border border-gray-700"
                                        >
                                          {subcategory.label}
                                        </motion.span>
                                        {/* Arrow */}
                                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 transform rotate-45"></div>
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-theme-border-primary">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="p-3 rounded-lg bg-theme-bg-tertiary border border-theme-border-primary shadow-lg hover:shadow-xl transition-all duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-white">GA</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-theme-text-primary font-base truncate">Gov Admin</div>
                    <div className="text-xs text-theme-text-tertiary font-base truncate">Federal Contractor</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;