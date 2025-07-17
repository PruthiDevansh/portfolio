import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code, 
  Palette, 
  Server, 
  Database, 
  Cloud, 
  Users, 
  Lightbulb,
  MessageCircle,
  Zap,
  GitBranch,
  Search,
  Globe,
  Triangle,
  Atom
} from 'lucide-react';
import { Skill } from '../../types';
import { staggerContainer, staggerItem, progressBar, scaleIn } from '../../utils/animations';

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Code,
      Palette,
      Server,
      Database,
      Cloud,
      Users,
      Lightbulb,
      MessageCircle,
      Zap,
      GitBranch,
      Search,
      Globe,
      Triangle,
      Atom,
    };
    return icons[iconName] || Code;
  };

  const skillCategories = {
    frontend: { title: 'Frontend', color: 'from-blue-500 to-cyan-500' },
    backend: { title: 'Backend', color: 'from-green-500 to-emerald-500' },
    database: { title: 'Database', color: 'from-purple-500 to-violet-500' },
    tools: { title: 'Tools & Cloud', color: 'from-orange-500 to-red-500' },
    soft: { title: 'Soft Skills', color: 'from-pink-500 to-rose-500' },
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technical expertise across the full development stack
            </p>
          </motion.div>

          {/* Compact Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <motion.div
                key={category}
                className="card p-6"
                variants={staggerItem}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-5">
                  <div className={`w-1 h-6 bg-gradient-to-b ${skillCategories[category as keyof typeof skillCategories]?.color} rounded-full`} />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {skillCategories[category as keyof typeof skillCategories]?.title}
                  </h3>
                </div>

                {/* Skills in Category - Compact Layout */}
                <div className="space-y-3">
                  {categorySkills.map((skill, index) => {
                    const IconComponent = getIcon(skill.icon || 'Code');
                    return (
                      <motion.div
                        key={skill.name}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        variants={scaleIn}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${skillCategories[category as keyof typeof skillCategories]?.color} flex items-center justify-center`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {skill.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                            <motion.div
                              className={`h-1.5 rounded-full bg-gradient-to-r ${skillCategories[category as keyof typeof skillCategories]?.color}`}
                              variants={progressBar}
                              initial="hidden"
                              animate={inView ? "visible" : "hidden"}
                              custom={skill.level}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 w-8">
                            {skill.level}%
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compact Skills Summary */}
          <motion.div
            className="text-center"
            variants={staggerItem}
          >
            <div className="card p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold mb-3 gradient-text">
                Technical Expertise Summary
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Full-stack developer with 2+ years of experience in React, .NET Core, and modern web technologies.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold gradient-text mb-1">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold gradient-text mb-1">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Major Projects</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold gradient-text mb-1">2+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
