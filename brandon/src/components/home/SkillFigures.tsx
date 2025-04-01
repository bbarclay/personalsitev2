import React, { useState } from 'react';

// Define types
interface Skill {
  skill: string;
  color: string;
  textColor: string;
  hoverColor: string;
  isAnimated?: boolean;
  rotation?: string;
  size?: string;
  position?: string;
}

interface Category {
  title: string;
  color: string;
  textColor: string;
  hoverColor: string;
  figure: string;
  skills: string[][];
}

const SkillFigures = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [animate, setAnimate] = useState(true);
  
  // Define custom animation styles
  const animationStyles = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
    @keyframes spin-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(-360deg); }
    }
    @keyframes flicker {
      0% { opacity: 0.5; height: 16px; }
      25% { opacity: 1; height: 20px; }
      50% { opacity: 0.7; height: 18px; }
      75% { opacity: 0.9; height: 22px; }
      100% { opacity: 0.5; height: 16px; }
    }
    .animate-float { animation: float 5s ease-in-out infinite; }
    .animate-pulse-custom { animation: pulse 2s ease-in-out infinite; }
    .animate-spin-slow { animation: spin-slow 20s linear infinite; }
    .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
    .animate-flicker { animation: flicker 1.5s ease-in-out infinite; }
  `;
  
  // Categories of skills
  const categories = [
    {
      title: "Technical Core",
      color: "bg-blue-800",
      textColor: "text-blue-200",
      hoverColor: "hover:bg-blue-700",
      figure: "robot",
      skills: [
        ["Python", "TypeScript", "JavaScript", "C++", "Rust"],
        ["Web Apps", "APIs", "Microservices", "Cloud Architecture", "DevOps"],
        ["Docker", "Kubernetes", "AWS", "Git", "CI/CD"]
      ]
    },
    {
      title: "AI & Data Science",
      color: "bg-purple-900",
      textColor: "text-purple-200",
      hoverColor: "hover:bg-purple-800",
      figure: "owl",
      skills: [
        ["Neural Networks", "Deep Learning", "Computer Vision", "NLP", "Generative AI"],
        ["Big Data", "Data Mining", "ETL Pipelines", "Data Warehousing"],
        ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NLTK"]
      ]
    },
    {
      title: "Mathematics & Algorithms",
      color: "bg-pink-900",
      textColor: "text-pink-200",
      hoverColor: "hover:bg-pink-800",
      figure: "dragon",
      skills: [
        ["Differential Equations", "Numerical Methods", "Stochastic Processes", "Simulation"],
        ["Graph Theory", "Dynamic Programming", "Optimization", "Cryptography"],
        ["Quantum Computing", "Complex Systems", "Chaos Theory", "Network Theory"]
      ]
    },
    {
      title: "Quantum Computing",
      color: "bg-indigo-900",
      textColor: "text-indigo-200",
      hoverColor: "hover:bg-indigo-800",
      figure: "atom",
      skills: [
        ["Shor's Algorithm", "Grover's Algorithm", "VQE", "QAOA", "Quantum Walks"],
        ["Qubits", "Quantum Gates", "Superposition", "Entanglement", "Decoherence"],
        ["Qiskit", "Cirq", "Quantum Simulation", "Error Correction"]
      ]
    },
    {
      title: "Research & Innovation",
      color: "bg-green-900",
      textColor: "text-green-200",
      hoverColor: "hover:bg-green-800",
      figure: "spaceship",
      skills: [
        ["Novel Algorithms", "AI Ethics", "Sustainable Computing", "Quantum ML"],
        ["Publications", "Peer Reviews", "Research Methods", "Data Analysis"],
        ["Cross-disciplinary", "Systems Thinking", "First Principles", "Prototyping"]
      ]
    },
    {
      title: "Professional Skills",
      color: "bg-amber-900",
      textColor: "text-amber-200",
      hoverColor: "hover:bg-amber-800",
      figure: "ninja",
      skills: [
        ["Project Management", "Team Leadership", "Mentorship", "Strategic Planning"],
        ["Analytical Thinking", "Critical Reasoning", "Innovation", "Adaptability"],
        ["Agile", "Lean", "DevOps", "Design Thinking"]
      ]
    }
  ];

  // Skill block component with hover effects
  const SkillBlock = ({ skill, color, textColor, hoverColor, isAnimated = false, rotation = "", size = "w-24 h-24", position = "" }: Skill) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        className={`${color} ${textColor} ${hoverColor} ${size} rounded-lg flex items-center justify-center 
                    transition-all duration-300 cursor-pointer ${position} ${rotation} 
                    ${isHovered ? "scale-110 shadow-lg z-20" : ""} 
                    ${isAnimated ? "animate-float" : ""}`}
        onMouseEnter={() => {
          setIsHovered(true);
          setHoveredSkill(skill);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredSkill(null);
        }}
        style={{ transformOrigin: "center" }}
      >
        <div className="text-center font-bold">
          {skill.length > 10 ? 
            <span className="text-xs">{skill}</span> : 
            <span>{skill}</span>
          }
        </div>
      </div>
    );
  };

  // Robot figure made from skill blocks
  const renderRobot = (category: Category) => {
    const { skills, color, textColor, hoverColor } = category;
    
    return (
      <div className="relative h-96 w-64 flex flex-col items-center">
        {/* Antenna */}
        <SkillBlock 
          skill={skills[0][4]} 
          color={color} 
          textColor={textColor} 
          hoverColor={hoverColor}
          size="w-8 h-16" 
          position="mb-2"
          isAnimated={animate}
        />
        
        {/* Head */}
        <div className="relative">
          <SkillBlock 
            skill={skills[0][0]} 
            color={color} 
            textColor={textColor} 
            hoverColor={hoverColor}
            size="w-32 h-32" 
            position="mb-4 z-10"
            isAnimated={animate}
          />
          
          {/* Eyes */}
          <div className="absolute top-6 left-6 w-6 h-6 bg-blue-200 rounded-full z-20 animate-pulse"></div>
          <div className="absolute top-6 right-6 w-6 h-6 bg-blue-200 rounded-full z-20 animate-pulse"></div>
          
          {/* Mouth */}
          <div className="absolute bottom-12 left-10 w-16 h-2 bg-blue-200 rounded-full z-20"></div>
        </div>
        
        {/* Body */}
        <SkillBlock 
          skill={skills[1][1]} 
          color={color} 
          textColor={textColor} 
          hoverColor={hoverColor}
          size="w-40 h-40" 
          position="mb-2 z-10"
          isAnimated={animate}
        />
        
        {/* Control Panel */}
        <div className="absolute top-48 left-16 w-24 h-16 bg-gray-800 rounded-lg z-20 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            ))}
          </div>
        </div>
        
        {/* Arms */}
        <div className="flex justify-between w-64 -mt-32">
          <SkillBlock 
            skill={skills[0][1]} 
            color={color} 
            textColor={textColor} 
            hoverColor={hoverColor}
            size="w-10 h-32" 
            rotation="-rotate-12" 
            position="z-10"
            isAnimated={animate}
          />
          <SkillBlock 
            skill={skills[0][2]} 
            color={color} 
            textColor={textColor} 
            hoverColor={hoverColor}
            size="w-10 h-32" 
            rotation="rotate-12" 
            position="z-10"
            isAnimated={animate}
          />
        </div>
        
        {/* Legs */}
        <div className="flex justify-between w-36 mt-2">
          <SkillBlock 
            skill={skills[2][0]} 
            color={color} 
            textColor={textColor} 
            hoverColor={hoverColor}
            size="w-14 h-40" 
            position="z-10"
            isAnimated={animate}
          />
          <SkillBlock 
            skill={skills[2][2]} 
            color={color} 
            textColor={textColor} 
            hoverColor={hoverColor}
            size="w-14 h-40" 
            position="z-10"
            isAnimated={animate}
          />
        </div>
      </div>
    );
  };

  // Mock implementations for the missing render functions
  const renderOwl = (category: Category) => {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-white text-xl">{category.title} visualization coming soon</div>
      </div>
    );
  };

  const renderDragon = (category: Category) => {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-white text-xl">{category.title} visualization coming soon</div>
      </div>
    );
  };

  const renderAtom = (category: Category) => {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-white text-xl">{category.title} visualization coming soon</div>
      </div>
    );
  };

  const renderSpaceship = (category: Category) => {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-white text-xl">{category.title} visualization coming soon</div>
      </div>
    );
  };

  const renderNinja = (category: Category) => {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-white text-xl">{category.title} visualization coming soon</div>
      </div>
    );
  };

  // Function to render the appropriate figure based on category
  const renderFigure = (category: Category) => {
    switch (category.figure) {
      case 'robot': return renderRobot(category);
      case 'owl': return renderOwl(category);
      case 'dragon': return renderDragon(category);
      case 'atom': return renderAtom(category);
      case 'spaceship': return renderSpaceship(category);
      case 'ninja': return renderNinja(category);
      default: return null;
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <style>{animationStyles}</style>
      
      <h1 className="text-white text-3xl font-bold mb-8 text-center">Tech Skills as Fun Characters</h1>
      
      <div className="flex justify-center mb-6">
        <button 
          onClick={() => setAnimate(!animate)} 
          className={`px-4 py-2 rounded-lg ${animate ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
        >
          {animate ? 'Animations ON' : 'Animations OFF'}
        </button>
      </div>
      
      {hoveredSkill && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50">
          Currently viewing: <span className="font-bold">{hoveredSkill}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow-xl">
            <h2 className={`text-xl font-bold mb-4 ${category.textColor}`}>{category.title}</h2>
            {renderFigure(category)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillFigures;
