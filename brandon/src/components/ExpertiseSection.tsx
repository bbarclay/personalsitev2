import React from 'react';
import { motion } from 'framer-motion';
import { QuantumFieldVisualizerCard } from '../app/designelements/components/funky/quantumFieldVisualizer';

export const ExpertiseSection: React.FC = () => {
  return (
    <section className="relative min-h-[800px] overflow-hidden">
      <div className="absolute inset-0">
        <QuantumFieldVisualizerCard />
      </div>

      {/* Enterprise skills dashboard */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background/80 z-5"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-24">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-md"></div>
            <h2 className="relative text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Areas of Expertise
            </h2>
          </div>
        </motion.div>
        
        {/* Areas of expertise */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          {/* Technical Core */}
          <ExpertiseCard 
            title="Technical Core"
            icon="⚙️"
            color="blue"
            sections={[
              {
                title: "Programming Languages",
                skills: ["Python", "TypeScript", "JavaScript", "C++", "Rust"]
              },
              {
                title: "Software Development",
                skills: ["Web Apps", "APIs", "Microservices", "Cloud Architecture", "DevOps"]
              },
              {
                title: "Tools & Infrastructure",
                skills: ["Docker", "Kubernetes", "AWS", "Git", "CI/CD"]
              }
            ]}
          />
          
          {/* AI & Data Science */}
          <ExpertiseCard 
            title="AI & Data Science"
            icon="🧠"
            color="purple"
            sections={[
              {
                title: "Machine Learning",
                skills: ["Neural Networks", "Deep Learning", "Computer Vision", "NLP", "Generative AI"]
              },
              {
                title: "Data Engineering",
                skills: ["Big Data", "Data Mining", "ETL Pipelines", "Data Warehousing"]
              },
              {
                title: "Libraries & Frameworks",
                skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NLTK"]
              }
            ]}
          />
          
          {/* Mathematics & Algorithms */}
          <ExpertiseCard 
            title="Mathematics & Algorithms"
            icon="∑"
            color="pink"
            sections={[
              {
                title: "Mathematical Modeling",
                skills: ["Differential Equations", "Numerical Methods", "Stochastic Processes", "Simulation"]
              },
              {
                title: "Algorithms",
                skills: ["Graph Theory", "Dynamic Programming", "Optimization", "Cryptography"]
              },
              {
                title: "Areas of Interest",
                skills: ["Quantum Computing", "Complex Systems", "Chaos Theory", "Network Theory"]
              }
            ]}
          />
        </div>
        
        {/* Quantum Computing */}
        <div className="mt-6 grid grid-cols-3 gap-6">
          <ExpertiseCard 
            title="Quantum Computing"
            icon="⚛️"
            color="indigo"
            sections={[
              {
                title: "Quantum Algorithms",
                skills: ["Shor's Algorithm", "Grover's Algorithm", "VQE", "QAOA", "Quantum Walks"]
              },
              {
                title: "Quantum Systems",
                skills: ["Qubits", "Quantum Gates", "Superposition", "Entanglement", "Decoherence"]
              },
              {
                title: "Implementation",
                skills: ["Qiskit", "Cirq", "Quantum Simulation", "Error Correction"]
              }
            ]}
          />
          
          {/* Research & Innovation */}
          <ExpertiseCard 
            title="Research & Innovation"
            icon="🔬"
            color="green"
            sections={[
              {
                title: "Research Focus",
                skills: ["Novel Algorithms", "AI Ethics", "Sustainable Computing", "Quantum ML"]
              },
              {
                title: "Academic Background",
                skills: ["Publications", "Peer Reviews", "Research Methods", "Data Analysis"]
              },
              {
                title: "Innovation Approaches",
                skills: ["Cross-disciplinary", "Systems Thinking", "First Principles", "Prototyping"]
              }
            ]}
          />
          
          {/* Professional Skills */}
          <ExpertiseCard 
            title="Professional Skills"
            icon="🏆"
            color="amber"
            sections={[
              {
                title: "Leadership",
                skills: ["Project Management", "Team Leadership", "Mentorship", "Strategic Planning"]
              },
              {
                title: "Problem Solving",
                skills: ["Analytical Thinking", "Critical Reasoning", "Innovation", "Adaptability"]
              },
              {
                title: "Methodologies",
                skills: ["Agile", "Lean", "DevOps", "Design Thinking"]
              }
            ]}
          />
        </div>
      </div>
    </section>
  );
};

interface ExpertiseCardProps {
  title: string;
  icon: string;
  color: string;
  sections: {
    title: string;
    skills: string[];
  }[];
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, icon, color, sections }) => {
  const colorClasses = {
    blue: "bg-blue-900/20 rounded-xl backdrop-blur-sm border border-blue-500/10 shadow-blue-500/5 shadow-lg",
    purple: "bg-purple-900/20 rounded-xl backdrop-blur-sm border border-purple-500/10 shadow-purple-500/5 shadow-lg",
    pink: "bg-pink-900/20 rounded-xl backdrop-blur-sm border border-pink-500/10 shadow-pink-500/5 shadow-lg",
    indigo: "bg-indigo-900/20 rounded-xl backdrop-blur-sm border border-indigo-500/10 shadow-indigo-500/5 shadow-lg",
    green: "bg-green-900/20 rounded-xl backdrop-blur-sm border border-green-500/10 shadow-green-500/5 shadow-lg",
    amber: "bg-amber-900/20 rounded-xl backdrop-blur-sm border border-amber-500/10 shadow-amber-500/5 shadow-lg"
  };

  const textColorClasses = {
    blue: "text-blue-200",
    purple: "text-purple-200",
    pink: "text-pink-200",
    indigo: "text-indigo-200",
    green: "text-green-200",
    amber: "text-amber-200"
  };

  const bgColorClasses = {
    blue: "bg-blue-800",
    purple: "bg-purple-800",
    pink: "bg-pink-800",
    indigo: "bg-indigo-800",
    green: "bg-green-800",
    amber: "bg-amber-800"
  };

  return (
    <div className={colorClasses[color as keyof typeof colorClasses]}>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-6 h-6 ${bgColorClasses[color as keyof typeof bgColorClasses]} rounded-sm flex items-center justify-center ${textColorClasses[color as keyof typeof textColorClasses]}`}>
            <span className="text-lg">{icon}</span>
          </div>
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
        
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className={`text-sm ${textColorClasses[color as keyof typeof textColorClasses]} mb-1`}>{section.title}</h4>
              <div className="flex flex-wrap gap-1">
                {section.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className={`px-2 py-1 ${bgColorClasses[color as keyof typeof bgColorClasses]} ${textColorClasses[color as keyof typeof textColorClasses]} text-xs rounded`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
