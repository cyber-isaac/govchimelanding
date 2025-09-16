import React from 'react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Real-Time Search',
      description: 'Instant search across millions of government contracts and entity records with advanced filtering capabilities.',
      icon: '🔍',
    },
    {
      title: 'Entity Profiles',
      description: 'Comprehensive contractor profiles with risk assessment, performance history, and award analytics.',
      icon: '📊',
    },
    {
      title: 'Contract Analytics',
      description: 'Advanced analytics and visualizations for contract trends, performance metrics, and risk indicators.',
      icon: '📈',
    },
    {
      title: 'Compliance Tracking',
      description: 'Monitor compliance status, certification requirements, and regulatory updates in real-time.',
      icon: '✓',
    },
    {
      title: 'Export & Integration',
      description: 'Export data in multiple formats and integrate with existing procurement systems via API.',
      icon: '⚡',
    },
    {
      title: 'Security & Audit',
      description: 'Enterprise-grade security with comprehensive audit trails and role-based access controls.',
      icon: '🔒',
    },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
      id="features" 
      className="py-12 px-4 bg-gray-950/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center mb-8"
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-100 mb-4" 
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
          >
            Powerful Features for Government Procurement
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Everything you need to search, analyze, and manage government contract data efficiently and securely.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, y: -3 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                hover: { duration: 0.15 }
              }}
              key={index}
              className="bg-white/5 rounded-lg border border-white/10 p-4 hover:bg-white/10 transition-all duration-200 hover:shadow-xl cursor-pointer max-w-sm w-full mx-auto"
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="text-base font-semibold text-blue-300 mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;