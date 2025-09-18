import React from 'react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  // Single plan: $189/mo + $49/mo per additional seat
  const plans = [
    {
      name: 'GovChime',
      price: '$189',
      period: '/month',
      description: 'Includes 1 seat. Additional seats $49/mo each.',
      features: [
        'Unlimited searches',
        'Full contract database access',
        'Advanced analytics dashboard',
        'Custom views of niche categories',
        'Saved searches',
        'Priority support',
        'Risk assessment tools',
        'API access',
        'Custom reports',
      ],
      highlighted: true,
    },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
      className="py-12 px-4"
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
            className="text-4xl font-bold text-black mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
          >
            Simple Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-gray-700 max-w-2xl mx-auto text-lg"
          >
            One plan with everything you need. Add teammates anytime for $49/mo per extra seat.
          </motion.p>
        </motion.div>

        {/* Single-column layout for one plan */}
        <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, y: -5 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.05
              }}
              key={index}
              className={`relative rounded-xl border p-8 ${
                plan.highlighted
                  ? 'bg-white border-2 border-blue-600 shadow-lg'
                  : 'bg-white border border-gray-200 shadow-md'
              } transition-all duration-200 hover:shadow-xl cursor-pointer`}
            >
              {plan.highlighted && (
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                >
                  <span className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md">
                    Most Popular
                  </span>
                </motion.div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-black mb-3">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-blue-900">{plan.price}</span>
                  <span className="text-lg font-semibold text-gray-600 ml-1">{plan.period}</span>
                </div>
                {/* Extra-seat note just below price */}
                <div className="text-sm text-gray-600 mb-2">+ $49/mo per additional seat</div>
                <p className="text-gray-700 text-base font-medium">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-base text-gray-800 font-medium">
                    <span className="text-blue-600 mr-3 mt-1 flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-bold text-base hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Start Free Trial
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Pricing;