export type Skill = string;

export type SkillCategory = {
  title: string;
  color: string;
  textColor: string;
  hoverColor: string;
  figure: 'robot' | 'owl' | 'dragon' | 'atom' | 'spaceship' | 'ninja' | 'pyramid';
  skills: Skill[][];
};

export type SkillBlockProps = {
  skill: string;
  color: string;
  textColor: string;
  hoverColor: string;
  isAnimated?: boolean;
  rotation?: string;
  size?: string;
  position?: string;
  onHover: () => void;
};

export type FigureProps = {
  category: SkillCategory;
  animate: boolean;
};

export const CATEGORIES: Record<string, SkillCategory> = {
  'AI & Machine Learning': {
    title: 'AI & Machine Learning',
    color: 'bg-gradient-to-br from-blue-500 to-indigo-700',
    textColor: 'text-white',
    hoverColor: 'hover:from-blue-600 hover:to-indigo-800',
    figure: 'robot',
    skills: [
      ['Deep Learning', 'NLP', 'Computer Vision'],
      ['PyTorch', 'TensorFlow', 'Keras'],
      ['Reinforcement Learning', 'GANs']
    ]
  },
  'Data Science & Analytics': {
    title: 'Data Science & Analytics',
    color: 'bg-gradient-to-br from-green-500 to-emerald-700',
    textColor: 'text-white',
    hoverColor: 'hover:from-green-600 hover:to-emerald-800',
    figure: 'owl',
    skills: [
      ['Statistical Analysis', 'Predictive Modeling'],
      ['Data Mining', 'Big Data', 'Data Visualization'],
      ['SQL', 'NoSQL', 'R']
    ]
  },
  'Mathematics & Algorithms': {
    title: 'Mathematics & Algorithms',
    color: 'bg-gradient-to-br from-red-500 to-rose-700',
    textColor: 'text-white',
    hoverColor: 'hover:from-red-600 hover:to-rose-800',
    figure: 'pyramid',
    skills: [
      ['Linear Algebra', 'Calculus', 'Statistics'],
      ['Optimization', 'Graph Theory', 'Number Theory'],
      ['Algorithms', 'Data Structures']
    ]
  },
  'Systems & Architecture': {
    title: 'Systems & Architecture',
    color: 'bg-gradient-to-br from-amber-500 to-orange-700',
    textColor: 'text-white',
    hoverColor: 'hover:from-amber-600 hover:to-orange-800',
    figure: 'dragon',
    skills: [
      ['Distributed Systems', 'Cloud Architecture'],
      ['Microservices', 'System Design', 'Scalability'],
      ['DevOps', 'CI/CD', 'Kubernetes']
    ]
  },
  'Quantum Computing': {
    title: 'Quantum Computing',
    color: 'bg-gradient-to-br from-purple-500 to-violet-700',
    textColor: 'text-white',
    hoverColor: 'hover:from-purple-600 hover:to-violet-800',
    figure: 'atom',
    skills: [
      ['Quantum Algorithms', 'Quantum Mechanics'],
      ['Qiskit', 'Quantum Machine Learning'],
      ['Quantum Cryptography', 'Quantum Simulation']
    ]
  },
  'Web & Mobile Development': {
    title: 'Web & Mobile Development',
    color: 'bg-gradient-to-br from-cyan-500 to-sky-700',
    textColor: 'text-white',
    hoverColor: 'hover:from-cyan-600 hover:to-sky-800',
    figure: 'spaceship',
    skills: [
      ['React', 'Node.js', 'TypeScript'],
      ['UI/UX', 'Responsive Design'],
      ['Mobile Development', 'PWAs']
    ]
  },
  'Programming Languages': {
    title: 'Programming Languages',
    color: 'bg-gradient-to-br from-gray-600 to-gray-800',
    textColor: 'text-white',
    hoverColor: 'hover:from-gray-700 hover:to-gray-900',
    figure: 'ninja',
    skills: [
      ['Python', 'JavaScript', 'TypeScript'],
      ['C++', 'Java', 'Go', 'Rust'],
      ['Functional Programming', 'OOP']
    ]
  }
}; 