import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, MessageCircle, ExternalLink, Clock, Shield, Building, Globe } from 'lucide-react';
import { socialPosts as socialFeedSource, type SocialPlatform } from '../data/socialPosts';

const NewsSignals: React.FC = () => {
  const trustedArticles = [
    {
      title: 'New Cybersecurity Requirements for Federal Contractors',
      source: 'Federal News Network',
      time: '2 hours ago',
      url: '#',
      icon: Shield,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-400/10'
    },
    {
      title: 'SBA Increases Small Business Size Standards',
      source: 'SBA Newsroom',
      time: '5 hours ago',
      url: '#',
      icon: Building,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-400/10'
    },
    {
      title: 'GSA Schedules Modernization Initiative Update',
      source: 'GovExec',
      time: '1 day ago',
      url: '#',
      icon: Globe,
      iconColor: 'text-green-400',
      iconBg: 'bg-green-400/10'
    },
    {
      title: 'VA Announces $2.8B IT Infrastructure Solicitation',
      source: 'Federal Computer Week',
      time: '2 days ago',
      url: '#',
      icon: Building,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-400/10'
    }
  ];

  // Map social posts from data file into display model used by this card
  const getRelativeTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const sec = Math.max(1, Math.floor(diffMs / 1000));
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    if (day >= 1) return `${day} day${day > 1 ? 's' : ''} ago`;
    if (hr >= 1) return `${hr} hour${hr > 1 ? 's' : ''} ago`;
    if (min >= 1) return `${min} minute${min > 1 ? 's' : ''} ago`;
    return `${sec} second${sec > 1 ? 's' : ''} ago`;
  };

  const platformMeta: Record<SocialPlatform, { label: string; icon: string; iconColor: string; iconBg: string }> = {
    twitter: { label: 'Twitter', icon: '𝕏', iconColor: 'text-gray-900 dark:text-white', iconBg: 'bg-gray-100 dark:bg-gray-800' },
    linkedin: { label: 'LinkedIn', icon: 'in', iconColor: 'text-blue-600', iconBg: 'bg-blue-50 dark:bg-blue-900/20' },
    facebook: { label: 'Facebook', icon: 'f', iconColor: 'text-blue-500', iconBg: 'bg-blue-50 dark:bg-blue-900/20' },
  };

  const socialFeed = socialFeedSource.slice(0, 3).map(p => {
    const meta = platformMeta[p.platform];
    return {
      handle: p.handle ?? p.author,
      content: p.content,
      time: getRelativeTime(p.date),
      platform: meta.label,
      icon: meta.icon,
      iconColor: meta.iconColor,
      iconBg: meta.iconBg,
      url: p.url,
      imageUrl: p.imageUrl,
      imageAlt: p.imageAlt
    };
  });

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="py-8 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl font-bold mb-4 dark:text-white text-gray-900 cursor-default" 
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
          >
            News & Signals
          </motion.h2>
          <motion.p 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="text-lg dark:text-gray-400 text-gray-600 cursor-default"
          >
            Stay ahead with curated industry intelligence
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trusted Articles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="backdrop-blur-lg rounded-xl p-6 dark:bg-white/5 dark:border-white/10 bg-white/90 border border-gray-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-500 dark:text-blue-400">
                  Trusted Articles
                </h3>
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Official government sources
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {trustedArticles.map((article, index) => {
                const ArticleIcon = article.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
                    transition={{
                      duration: 0.6,
                      delay: 1.2 + index * 0.1
                    }}
                    className="group p-4 rounded-xl border transition-all duration-300 cursor-pointer dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 border-gray-200 bg-gray-50 hover:bg-gray-100 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${article.iconBg} flex-shrink-0`}>
                        <ArticleIcon className={`w-4 h-4 ${article.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors dark:text-white text-gray-900 leading-tight">
                          {article.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600">
                            <span className="font-medium">{article.source}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.time}</span>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 dark:text-gray-400 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Social & Community */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="backdrop-blur-lg rounded-xl p-6 dark:bg-white/5 dark:border-white/10 bg-white/90 border border-gray-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-500 dark:text-purple-400">
                  Social & Community
                </h3>
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Latest from social platforms
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-hidden relative" aria-live="polite">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: ['0%', '-100%'] }}
                transition={{ duration: Math.max(30, socialFeed.length * 15), ease: 'linear', repeat: Infinity }}
              >
                {[...socialFeed, ...socialFeed].map((post, index) => (
                  <motion.div
                    key={`${post.handle}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01, x: 4, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.4 }}
                    onClick={() => post.url && window.open(post.url, '_blank')}
                    className="group p-4 mb-4 rounded-xl border transition-all duration-300 cursor-pointer dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 border-gray-200 bg-gray-50 hover:bg-gray-100 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg ${post.iconBg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <span className={`text-sm font-bold ${post.iconColor}`}>{post.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-500 dark:text-blue-400 font-semibold">{post.handle}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-gray-300 text-gray-600">{post.platform}</span>
                          <span className="text-sm dark:text-gray-400 text-gray-600">•</span>
                          <div className="flex items-center gap-1 text-sm dark:text-gray-400 text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{post.time}</span>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed dark:text-gray-300 text-gray-700">{post.content}</p>
                        {/* Removed post image rendering per request */}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsSignals;