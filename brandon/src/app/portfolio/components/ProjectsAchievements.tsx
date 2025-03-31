'use client'

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Award,
  GitFork,
  Star,
  Users,
  TrendingUp,
  ExternalLink,
  Code,
  ArrowRight,
  ChevronRight,
  LineChart,
  Zap,
  Shield,
  Brain
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AI/ML' | 'Security' | 'Cloud' | 'Full Stack';
  image: string;
  metrics: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  technologies: string[];
  achievements: string[];
  link?: string;
}

const getCategoryStyles = (category: string) => {
  switch (category) {
    case 'AI/ML':
      return 'bg-purple-500/90 dark:bg-purple-600/90';
    case 'Security':
      return 'bg-red-500/90 dark:bg-red-600/90';
    case 'Cloud':
      return 'bg-blue-500/90 dark:bg-blue-600/90';
    default:
      return 'bg-green-500/90 dark:bg-green-600/90';
  }
};

const projects: Project[] = [
  /*{
    id: 'ai-content-engine',
    title: 'AI Content Generation Engine',
    description: 'Advanced NLP system for automating blog and social media content creation using state-of-the-art language models.',
    category: 'AI/ML',
    image: '/api/placeholder/800/600',
    metrics: [
      { label: 'Content Generated', value: '50M+', icon: <LineChart className="w-4 h-4" /> },
      { label: 'Performance Boost', value: '40%', icon: <Zap className="w-4 h-4" /> },
      { label: 'Active Users', value: '10K+', icon: <Users className="w-4 h-4" /> }
    ],
    technologies: ['Python', 'PyTorch', 'AWS SageMaker', 'BERT', 'LLaMA', 'Kubernetes'],
    achievements: [
      'Increased content generation efficiency by 50%',
      'Reduced content delivery time by 40%',
      'Implemented advanced NLP techniques'
    ]
  },
  {
    id: 'security-platform',
    title: 'Enterprise Security Platform',
    description: 'Comprehensive security monitoring and vulnerability management system for cloud infrastructure.',
    category: 'Security',
    image: '/api/placeholder/800/600',
    metrics: [
      { label: 'Vulnerabilities Fixed', value: '1000+', icon: <Shield className="w-4 h-4" /> },
      { label: 'Security Score', value: '95%', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Protected Assets', value: '$5M+', icon: <LineChart className="w-4 h-4" /> }
    ],
    technologies: ['Python', 'AWS', 'Google Cloud', 'Elasticsearch', 'ELK Stack'],
    achievements: [
      'Improved security posture by 30%',
      'Recognized in Google Hall of Fame',
      'Protected over $5M in assets'
    ]
  }*/
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleSpring = useSpring(scale, springConfig);
  const ySpring = useSpring(y, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale: scaleSpring,
        y: ySpring,
        opacity: opacitySpring
      }}
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative group">
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
          {/* Project Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyles(project.category)} text-white`}>
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {project.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {project.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <div className="text-primary">{metric.icon}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full
                             hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              {project.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* View Project Link */}
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 mt-6 text-primary hover:text-primary/80"
                whileHover={{ x: 5 }}
              >
                <span>View Project</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Interactive Elements */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-primary/5 rounded-2xl pointer-events-none transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
};

const Achievements: React.FC = () => {
  const achievements = [
    {
      title: 'Google Hall of Fame',
      description: 'Recognized for identifying critical security vulnerabilities',
      icon: <Award className="w-6 h-6" />
    },
    {
      title: 'AI Innovation',
      description: 'Led development of advanced NLP systems processing 50M+ articles',
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: 'Security Excellence',
      description: 'Protected over $5M in assets through security implementations',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {achievements.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-card rounded-xl p-6 shadow-lg border border-border"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <div className="text-primary">{achievement.icon}</div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {achievement.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ProjectsAchievements: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Featured Projects & Achievements
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Highlighting key projects and professional accomplishments.
          </p>
        </motion.div>

        {/* Achievements Section */}
        <Achievements />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsAchievements;
