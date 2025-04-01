'use client'

import React, { useState, useEffect } from 'react';
import { MousePointerClick } from 'lucide-react';
import { loadSkills, loadCategories, getIconComponent } from './dataLoader';
import type { Skill, Category } from './types/types';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface SkillCardProps {
  skill: Skill;
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, category, isSelected, onClick }) => {
  const iconComponent = getIconComponent(skill.icon);

  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer ${isSelected ? 'col-span-2 row-span-2' : 'col-span-1'} group`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full bg-background/80 dark:bg-background/90 border border-border
                    dark:border-border rounded-xl overflow-hidden p-4
                    group-hover:border-primary/50 transition-all duration-500">
        <div className="relative h-full">
          {/* Skill Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color}
              flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
              {iconComponent}
            </div>
            <div>
              <h3 className="font-semibold text-foreground dark:text-foreground">
                {skill.name}
              </h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                {skill.experience}
              </p>
            </div>
          </div>

          {/* Proficiency Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground dark:text-muted-foreground">Proficiency</span>
              <span className="text-sm font-semibold text-foreground dark:text-foreground">
                {skill.proficiency}%
              </span>
            </div>
            <div className="h-2 bg-muted dark:bg-muted rounded-full overflow-hidden">
              <div
                style={{ width: `${skill.proficiency}%` }}
                className={`h-full bg-gradient-to-r ${category.color}
                  transition-all duration-1000 ease-out`}
              />
            </div>
          </div>

          {/* Extended Content */}
          {isSelected && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                {skill.description}
              </p>
              <div className="space-y-4">
                <h4 className="font-medium text-foreground dark:text-foreground">
                  Related Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.relatedTech.map((tech, index) => (
                    <span
                      key={index}
                      className={`relative px-3 py-1 text-sm rounded-full bg-gradient-to-r ${category.slug === 'ai-machine-learning' ? 'from-purple-500' :
                          category.slug === 'cloud-devops' ? 'from-blue-500' :
                            category.slug === 'programming' ? 'from-emerald-500 ' :
                              category.slug === 'database-storage' ? 'from-amber-500 ' :
                                category.slug === 'security' ? 'from-rose-500 ' :
                                  category.slug === 'leadership' ? 'from-cyan-500' : 'from-gray-500'
                      } text-background dark:text-background transform hover:scale-105 transition-transform duration-300
                      [transform:skew(-10deg)] hover:[transform:skew(-10deg)_scale(1.05)]`}
                    >
                      <span className="inline-block [transform:skew(10deg)]">
                        {tech}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SkillsExpertise: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClickHint, setShowClickHint] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedSkills, loadedCategories] = await Promise.all([
          loadSkills(),
          loadCategories()
        ]);
        setSkills(loadedSkills);
        setCategories(loadedCategories);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowClickHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-20 relative">
      {/* Enhanced background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-indigo-600/20
                      dark:from-violet-500/10 dark:to-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]
                      dark:bg-[radial-gradient(ellipse_90%_90%_at_50%_-20%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent
                       bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600
                       dark:from-violet-400 dark:via-indigo-400 dark:to-violet-400 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground dark:text-muted-foreground">
            A comprehensive overview of my technical capabilities and specialized knowledge.
          </p>
        </motion.div>

        {/* Click Hint */}
        {showClickHint && (
          <div className="fixed bottom-8 right-8 bg-background/80 dark:bg-background/90 backdrop-blur-sm p-4 rounded-lg
                       border border-border shadow-lg z-50 animate-fadeIn">
            <div className="flex items-center space-x-2 text-muted-foreground dark:text-muted-foreground">
              <MousePointerClick className="w-5 h-5" />
              <span>Click on skills to see more details</span>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-background/80 dark:bg-background/90 backdrop-blur-sm text-muted-foreground hover:text-foreground'
                }`}
            >
              All Skills
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2
                  ${selectedCategory === category.slug
                    ? `bg-gradient-to-r ${category.color} text-background dark:text-background shadow-lg`
                    : 'bg-background/80 dark:bg-background/90 backdrop-blur-sm text-muted-foreground hover:text-foreground'
                  }`}
              >
                {getIconComponent(category.icon)}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const category = categories.find(c => c.slug === skill.category);
            if (!category) return null;

            return (
              <SkillCard
                key={skill.name}
                skill={skill}
                category={category}
                isSelected={selectedSkill === skill.name}
                onClick={() => setSelectedSkill(
                  selectedSkill === skill.name ? null : skill.name
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsExpertise;
