import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Users } from 'lucide-react';
import { PersonalInfo } from '../../types';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '../../utils/animations';

interface AboutProps {
  personalInfo: PersonalInfo;
}

const About: React.FC<AboutProps> = ({ personalInfo }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Expert in React.js, .NET Core, and modern web technologies',
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'Proficient in SQL Server, MySQL, and Entity Framework',
    },
    {
      icon: Globe,
      title: 'Cloud Deployment',
      description: 'Experience with AWS and Azure cloud platforms',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Strong communication and Agile/Scrum methodologies',
    },
  ];

  const stats = [
    { number: '2+', label: 'Years Experience' },
    { number: '3', label: 'Major Projects' },
    { number: '10+', label: 'Technologies' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={staggerItem}>
            {/* <h2 className="text-responsive-lg font-bold mb-4"> */}
             <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate about creating innovative solutions and delivering exceptional user experiences
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div variants={staggerItem}>
              <div className="space-y-6">
                <motion.p
                  className="text text-gray-600 dark:text-gray-300 leading-relaxed"
                  variants={fadeInUp}
                >
                  {personalInfo.summary}
                </motion.p>

                <motion.p
                  className="text text-gray-600 dark:text-gray-300 leading-relaxed"
                  variants={fadeInUp}
                >
                  I have a proven ability to design efficient user interfaces, optimize application 
                  performance, and ensure seamless integration with back-end services. My strong 
                  understanding of JavaScript, TypeScript, and state management using Redux allows 
                  me to build maintainable and scalable solutions.
                </motion.p>

                {/* <motion.p
                  className="text text-gray-600 dark:text-gray-300 leading-relaxed"
                  variants={fadeInUp}
                >
                  I am also experienced in developing RESTful APIs and deploying applications on 
                  cloud platforms such as AWS and Azure. My commitment to continuous improvement 
                  and staying updated with the latest technologies enables me to deliver impactful 
                  and innovative results.
                </motion.p> */}

                {/* Personal Details */}
                <motion.div
                  className="grid sm:grid-cols-2 gap-4 pt-6"
                  variants={staggerContainer}
                >
                  <motion.div variants={staggerItem}>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">{personalInfo.location}</p>
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">{personalInfo.email}</p>
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-300">{personalInfo.phone}</p>
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Status</h4>
                    <p className="text-green-600 dark:text-green-400">Available for work</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Visual Elements */}
            <motion.div
              className="relative"
              variants={staggerItem}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="card card-hover p-6 text-center"
                    variants={scaleIn}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                        <highlight.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {highlight.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            variants={staggerItem}
          >
            <motion.div
              className="inline-flex items-center space-x-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-lg font-medium">Ready to work together?</span>
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
