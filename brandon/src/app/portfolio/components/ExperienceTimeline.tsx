'use client'

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Award,
  Star,
  TrendingUp,
  Code,
  Database,
  Cloud,
  Shield,
  Brain,
  Users,
  Bot,
  Network,
  Cpu,
  Server,
  Code2,
  Terminal,
  GanttChart,
  Store,
  Clock,
  Building,
  LineChart
} from 'lucide-react';

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
  metrics: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

const experiences: Experience[] = [
  {
    id: 'easypress',
    role: 'Chief Technology Officer | NLP - LLM - AI Machine Learning Engineer',
    company: 'Easypress',
    period: 'May 2023 - Present',
    description: 'Innovative AI Team Lead specializing in NLP, LLMs, and AI-powered content automation. Led the development of an ecosystem that automates blog and social media content generation using advanced NLP and NLG technologies.',
    achievements: [
      'Directed cross-functional teams to expand the AI engine, increasing feature offerings by 50% and improving functionality by 35%',
      'Led NLP implementations, including Named Entity Recognition (NER) and document classification',
      'Developed and integrated Large Language Models using Transformer architectures',
      'Deployed ML models through AWS SageMaker and GCP VertexAI with Kubernetes',
      'Managed DevOps and infrastructure for Laravel front-end'
    ],
    tech: ['Python', 'PyTorch', 'Hugging Face', 'AWS SageMaker', 'GCP VertexAI', 'Kubernetes', 'BERT', 'LLaMA', 'PHP Laravel'],
    metrics: [
      { label: 'Feature Growth', value: '50%', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'ML Performance', value: '35%', icon: <Brain className="w-4 h-4" /> },
      { label: 'Optimization', value: '40%', icon: <LineChart className="w-4 h-4" /> }
    ]
  },
  {
    id: 'whitealerts',
    role: 'Chief Security Officer | Research and Development',
    company: 'WhiteAlerts',
    period: 'May 2019 - September 2024',
    description: 'Lead Security Engineer specializing in cybersecurity, ethical hacking, and securing cloud infrastructures on AWS and Google Cloud.',
    achievements: [
      'Identified and remediated critical security vulnerabilities, improving security posture by 30%',
      'Specialized in ethical hacking and securing cloud infrastructures',
      'Honored in the Google Hall of Fame for security contributions',
      'Engineered resilient infrastructures improving system uptime by 15%'
    ],
    tech: ['Python', 'NLP', 'BERT', 'AWS', 'Google Cloud', 'Elasticsearch', 'ELK Stack', 'Security Tools'],
    metrics: [
      { label: 'Security Improvement', value: '30%', icon: <Shield className="w-4 h-4" /> },
      { label: 'Assets Protected', value: '$5M+', icon: <Database className="w-4 h-4" /> },
      { label: 'Uptime Improvement', value: '+15%', icon: <Cloud className="w-4 h-4" /> }
    ]
  },
  {
    id: 'ecomfrog',
    role: 'Chief Information Officer | eCommerce | ML Engineer',
    company: 'EcomFrog',
    period: 'March 2019 - July 2023',
    description: 'Lead Data Engineer and Fullstack Developer specializing in machine learning, NLP, and large-scale data analysis.',
    achievements: [
      'Engineered monitoring system tracking KPIs for 250,000+ stores',
      'Implemented machine learning models with Scikit-learn, BERT, and GPT-Neo',
      'Developed distributed scrapers and pipelines using BigQuery',
      'Technology acquired by Pattern, with IP rights retained'
    ],
    tech: ['Python', 'PHP Laravel', 'Kubernetes', 'Elasticsearch', 'Machine Learning', 'AWS', 'GCP', 'BigQuery'],
    metrics: [
      { label: 'Stores Monitored', value: '250K+', icon: <Store className="w-4 h-4" /> },
      { label: 'Data Processing', value: 'PB Scale', icon: <Database className="w-4 h-4" /> },
      { label: 'ML Performance', value: '40%', icon: <Brain className="w-4 h-4" /> }
    ]
  },
  {
    id: 'pattern',
    role: 'Senior Big Data Team Lead DBA',
    company: 'Pattern',
    period: 'September 2019 – July 2020',
    description: 'Experienced Lead Data Engineer specializing in Python, Machine Learning, and Natural Language Processing (NLP). Managed international teams, transforming petabytes of eCommerce data into actionable insights.',
    achievements: [
      'Led big data projects, processing eCommerce data and improving efficiency by 40%',
      'Directed international team, reverse-engineering analytics systems',
      'Optimized machine learning models, increasing training speed by 40%',
      'Applied ML for product classification and trend prediction'
    ],
    tech: ['Python', 'Machine Learning', 'NLP', 'Hadoop', 'Spark', 'AWS', 'GCP', 'Kubernetes'],
    metrics: [
      { label: 'Efficiency Gain', value: '40%', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Data Scale', value: 'PB+', icon: <Database className="w-4 h-4" /> },
      { label: 'Team Size', value: '15+', icon: <Users className="w-4 h-4" /> }
    ]
  }
];

const ExperienceCard: React.FC<{ experience: Experience; index: number }> = ({ experience, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.33 1"]
  });

  const scaleProgress = useSpring(useTransform(scrollYProgress, [0, 1], [0.8, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacityProgress = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress
      }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-primary/50" />

      {/* Experience Card */}
      <div className="ml-8 mb-12">
        <motion.div
          layout
          className="bg-card rounded-xl shadow-lg overflow-hidden border border-border"
        >
          {/* Header */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer p-6 hover:bg-muted transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {experience.role}
                  </h3>
                  <p className="text-primary">
                    {experience.company}
                  </p>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {experience.period}
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-6 h-6 text-muted-foreground" />
              </motion.div>
            </div>
          </div>

          {/* Expandable Content */}
          <motion.div
            animate={{ height: isExpanded ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">
              {/* Description */}
              <p className="text-muted-foreground mb-4">
                {experience.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {experience.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="bg-muted rounded-lg p-4 flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0 text-primary">
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {metric.label}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start space-x-2"
                    >
                      <Award className="w-5 h-5 text-primary mt-1" />
                      <span className="text-muted-foreground">
                        {achievement}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full
                               hover:bg-primary/20 transition-colors cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Professional Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A timeline of my experience building innovative solutions and leading technical teams.
          </p>
        </motion.div>

        <div className="relative pl-4">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
