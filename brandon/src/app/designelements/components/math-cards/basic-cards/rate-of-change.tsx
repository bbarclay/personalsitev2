import React from 'react';

export const RateOfChange = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto transform -rotate-1">
      {/* Background glow */}
      <div className="absolute -inset-4 bg-gray-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Card with gear border */}
      <div className="relative">
        {/* Top gear edge */}
        <div className="w-full h-16 overflow-hidden">
          <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="h-full w-full">
            <path 
              d="M0,40 L0,30 L5,30 L10,20 L15,30 L20,20 L25,30 L30,20 L35,30 L40,20 L45,30 L50,20 L55,30 L60,20 L65,30 L70,20 L75,30 L80,20 L85,30 L90,20 L95,30 L100,20 L105,30 L110,20 L115,30 L120,20 L125,30 L130,20 L135,30 L140,20 L145,30 L150,20 L155,30 L160,20 L165,30 L170,20 L175,30 L180,20 L185,30 L190,20 L195,30 L200,30 L200,40 Z" 
              fill="#4b5563"
            />
          </svg>
        </div>
        
        {/* Main content */}
        <div className="bg-gray-600 p-8 relative overflow-hidden">
          {/* Background calculations and derivatives */}
          <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
            {[
              "f'(x) = lim[h→0] [f(x+h) - f(x)]/h",
              "dy/dx = d/dx[y]",
              "d/dx[x^n] = nx^(n-1)",
              "d/dx[sin(x)] = cos(x)",
              "d/dx[e^x] = e^x",
              "d/dx[ln(x)] = 1/x",
              "∫f'(x)dx = f(x) + C",
              "f''(x) = d²y/dx²",
              "v = ds/dt",
              "a = dv/dt = d²s/dt²"
            ].map((formula, i) => (
              <div 
                key={i} 
                className="inline-block m-3 font-mono opacity-80" 
                style={{
                  transform: `rotate(${Math.random() * 10 - 5}deg) scale(${0.8 + Math.random() * 0.4})`,
                  fontSize: `${16 + Math.random() * 4}px`
                }}
              >
                {formula}
              </div>
            ))}
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-block px-6 py-2 bg-gray-700 rounded-full text-white font-bold mb-5 shadow-lg">
              CALCULUS FUNDAMENTALS
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Rate of Change Calculator
            </h2>
            
            <p className="text-gray-100 text-xl max-w-2xl mb-8">
              Analyze how quantities change over time with differentiation techniques and practical applications.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-bold text-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all shadow-lg">
                Try Now
              </button>
              
              <div className="flex items-center text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xl">Engineering solutions</span>
              </div>
            </div>
            
            {/* Tangent line illustration */}
            <div className="absolute top-12 right-16 w-40 h-40 opacity-30">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Curve */}
                <path d="M10,70 C30,65 50,20 90,30" stroke="white" strokeWidth="1.5" fill="none" />
                
                {/* Tangent line */}
                <line x1="40" y1="10" x2="70" y2="70" stroke="white" strokeWidth="1" strokeDasharray="3,2" />
                
                {/* Point of tangency */}
                <circle cx="55" cy="40" r="2" fill="white" />
                
                {/* Slope indication */}
                <path d="M57,40 L65,40 L65,48" stroke="white" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
            
            {/* Rotating gear animation */}
            <div className="absolute top-10 right-10 w-24 h-24 opacity-20 animate-spin" style={{animationDuration: '20s'}}>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="1" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1" />
                <circle cx="50" cy="50" r="5" fill="white" />
                {/* Gear teeth */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30) * Math.PI / 180;
                  const x1 = 50 + 40 * Math.cos(angle);
                  const y1 = 50 + 40 * Math.sin(angle);
                  const x2 = 50 + 45 * Math.cos(angle);
                  const y2 = 50 + 45 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" />;
                })}
              </svg>
            </div>
          </div>
        </div>
        
        {/* Bottom gear edge */}
        <div className="w-full h-16 overflow-hidden">
          <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="h-full w-full">
            <path 
              d="M0,0 L0,10 L5,10 L10,20 L15,10 L20,20 L25,10 L30,20 L35,10 L40,20 L45,10 L50,20 L55,10 L60,20 L65,10 L70,20 L75,10 L80,20 L85,10 L90,20 L95,10 L100,20 L105,10 L110,20 L115,10 L120,20 L125,10 L130,20 L135,10 L140,20 L145,10 L150,20 L155,10 L160,20 L165,10 L170,20 L175,10 L180,20 L185,10 L190,20 L195,10 L200,10 L200,0 Z" 
              fill="#4b5563"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}; 