'use client';

import { motion } from 'framer-motion';
import CodeTyper from '../TypingOutCodeAnimation';

const CodeTyperSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Code Showcase
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Explore different programming languages and frameworks that power modern applications.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CodeTyper />
        </motion.div>
      </div>
    </section>
  );
};

export default CodeTyperSection; 