import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Building, ChevronRight } from 'lucide-react';
import type { Experience } from '../../types';
import { staggerContainer, staggerItem, timelineItem } from '../../utils/animations';

interface ExperienceProps {
  experience: Experience[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-10" variants={staggerItem}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My professional journey and the impact I've made in various roles
            </p>
          </motion.div>

          {/* Simplified Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div 
            // className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"
           className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-primary-600"
            // className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
           />
            {/* Experience Items */}
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="relative"
                  variants={timelineItem}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-gradient-to-br from-primary-300 to-primary-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg z-10" />

                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 md:w-full">
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg border border-gray-100 dark:border-gray-700"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Header */}
                      <div className="mb-3">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {exp.position}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            exp.endDate === 'Present' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {exp.endDate === 'Present' ? 'Current' : 'Completed'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center space-x-1">
                            <Building className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.startDate} - {exp.endDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Responsibilities - Compact */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-1">
                          {exp.responsibilities.slice(0, 4).map((responsibility, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-300"
                              initial={{ opacity: 0, x: -10 }}
                              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                            >
                              <ChevronRight className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{responsibility}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies - Compact */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {exp.technologies.map((tech, idx) => (
                            <motion.span
                              key={tech}
                              // className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium"
                              className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                              transition={{ delay: (index * 0.1) + (idx * 0.02) }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Compact Call to Action */}
          <motion.div
            className="text-center mt-10"
            variants={staggerItem}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-xl mx-auto shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-3 gradient-text">
                Ready for New Challenges
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                I'm always excited to take on new projects and collaborate with innovative teams. 
                Let's discuss how my experience can contribute to your next big idea.
              </p>
              <motion.button
                // className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all"
                className="inline-flex items-center space-x-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Work Together
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
