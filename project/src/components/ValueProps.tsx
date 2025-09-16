import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, FileText, Star, TrendingUp, Shield, Zap, Award, CheckCircle, ArrowRight } from 'lucide-react';

const ValueProps: React.FC = () => {

  const features = [
    {
      title: 'Smart Contract Discovery',
      subhead: 'Stop scrolling through endless government websites',
      description: 'Advanced search across opportunities, awards, and solicitations with targeted filtering by NAICS codes, agencies, contract values, deadlines, and locations to find contracts that match your business.',
      bullets: [
        'Search multiple opportunity sources',
        'Filter by your specific criteria',
        'Track deadlines and posting dates',
        'Focus on relevant opportunities only'
      ]
    },
    {
      title: 'Market Intelligence',
      subhead: 'Get the intel on competitors and agency behavior',
      description: 'Access vendor contract histories, business certifications, and performance data. Understand agency spending patterns and contracting preferences to better position your business.',
      bullets: [
        'Vendor contract analysis',
        'Agency spending insights',
        'Business certification data',
        'Historical performance tracking'
      ]
    },
    {
      title: 'Automated Monitoring',
      subhead: 'Let the platform watch the market for you',
      description: 'Set up custom alerts that monitor new opportunities and contract awards matching your criteria. Get email notifications on your schedule without constant manual checking.',
      bullets: [
        'Custom search alerts',
        'Email notification system',
        'Flexible frequency options',
        'Hands-off opportunity tracking'
      ]
    }
  ];

  const testimonials = [
    {
      quote: "GovChime transformed our business development process. We went from winning 15% to 45% of our bids in just 6 months.",
      author: "Sarah Chen",
      role: "BD Director at TechFlow Solutions",
      company: "TechFlow Solutions",
      avatar: "SC"
    },
    {
      quote: "The competitive intelligence alone paid for itself in the first month. We finally know who we're really competing against.",
      author: "Michael Rodriguez",
      role: "VP of Business Development",
      company: "Defense Dynamics Inc",
      avatar: "MR"
    },
    {
      quote: "Our proposal team is 3x more productive. What used to take weeks now takes days with GovChime's AI tools.",
      author: "Jennifer Park",
      role: "Proposal Manager",
      company: "CyberShield Technologies",
      avatar: "JP"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 mb-6"
          >
            <Award className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">Trusted by 500+ Federal Contractors</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent"
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
          >
            Win More Government Contracts
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl lg:text-2xl max-w-4xl mx-auto text-gray-700 leading-relaxed mb-8"
          >
            Powerful tools designed specifically for federal contractors at every stage of the government contract lifecycle.
          </motion.p>
        </motion.div>

        {/* Feature Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{
                duration: 0.4,
                delay: 1.0 + index * 0.1
              }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg group max-w-md w-full mx-auto hover:shadow-xl transition-all duration-300"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {feature.subhead}
              </p>
              <p className="text-sm leading-6 text-gray-700 mb-4">
                {feature.description}
              </p>

              <ul className="space-y-2">
                {feature.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start gap-3 text-sm text-gray-800">
                    <span className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true">
                      <CheckCircle className="w-4 h-4" />
                    </span>
                    <span className="leading-6">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>


        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              Trusted by everyday government contractors.
            </h3>
            <p className="text-gray-900 text-lg">
              See how GovChime is transforming federal contracting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 1.6 + index * 0.1
                }}
                className="relative overflow-hidden rounded-2xl border border-gray-300 p-8 group max-w-md w-full mx-auto bg-white shadow-lg"
              >
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-900 mb-6 leading-relaxed text-lg">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-black">{testimonial.author}</div>
                      <div className="text-sm text-gray-700">{testimonial.role}</div>
                      <div className="text-xs text-gray-600">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-center"
        >
          <div className="relative overflow-hidden rounded-3xl border border-blue-600/30 p-12 bg-white shadow-xl">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-black mb-8" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                Ready to Win More Contracts?
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="group px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl flex items-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="px-8 py-4 border-2 border-black text-black rounded-2xl font-semibold hover:bg-black hover:text-white transition-all duration-300 hover:shadow-xl"
                >
                  Schedule Demo
                </motion.button>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ValueProps;