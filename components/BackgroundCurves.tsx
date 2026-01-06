import React from 'react';

export const BackgroundCurves = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] pointer-events-none z-0">
      
      <style>
        {`
          @keyframes dash-scroll {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -1000; }
          }
          .animate-dash {
            animation: dash-scroll 20s linear infinite;
          }
          .animate-dash-fast {
             animation: dash-scroll 15s linear infinite;
          }
           .animate-dash-slow {
             animation: dash-scroll 30s linear infinite;
          }
        `}
      </style>

      {/* Subtle Grid Texture for technical feel */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
            backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      ></div>

      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* 
            Dashed Lines Configuration:
            strokeDasharray="20 15" -> 20px dash, 15px gap.
            Consistent horizontal flow with sine-wave variations.
        */}

        {/* --- ROW 1 --- */}
        <path 
            d="M-100 50 C 400 100, 900 0, 1600 50" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="2" 
            strokeDasharray="20 15" 
            className="animate-dash-slow" 
        />
        
        {/* --- ROW 2 --- */}
        <path 
            d="M-100 150 C 300 100, 1000 200, 1600 150" 
            stroke="rgba(220, 38, 38, 0.4)" 
            strokeWidth="2" 
            strokeDasharray="30 20" 
            className="animate-dash" 
        />

        {/* --- ROW 3 --- */}
        <path 
            d="M-100 250 C 500 350, 800 150, 1600 250" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="2" 
            strokeDasharray="20 15" 
            className="animate-dash-slow" 
        />

        {/* --- ROW 4 --- */}
        <path 
            d="M-100 350 Q 720 450 1600 350" 
            stroke="rgba(220, 38, 38, 0.3)" 
            strokeWidth="2" 
            strokeDasharray="20 20" 
            className="animate-dash-fast" 
        />

        {/* --- ROW 5 --- */}
        <path 
            d="M-100 450 C 400 400, 1100 500, 1600 450" 
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="2" 
            strokeDasharray="25 15" 
            className="animate-dash" 
        />

        {/* --- ROW 6 --- */}
        <path 
            d="M-100 550 C 600 650, 900 450, 1600 550" 
            stroke="rgba(220, 38, 38, 0.5)" 
            strokeWidth="3" 
            strokeDasharray="40 20" 
            className="animate-dash-slow" 
        />

        {/* --- ROW 7 --- */}
        <path 
            d="M-100 650 C 300 550, 1200 750, 1600 650" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="2" 
            strokeDasharray="20 15" 
            className="animate-dash" 
        />

        {/* --- ROW 8 --- */}
        <path 
            d="M-100 750 Q 720 700 1600 750" 
            stroke="rgba(220, 38, 38, 0.3)" 
            strokeWidth="2" 
            strokeDasharray="30 30" 
            className="animate-dash-fast" 
        />

        {/* --- ROW 9 --- */}
        <path 
            d="M-100 850 C 500 950, 1000 750, 1600 850" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="2" 
            strokeDasharray="20 15" 
            className="animate-dash-slow" 
        />

        {/* --- ROW 10 (Bottom fill) --- */}
        <path 
            d="M-100 950 C 300 900, 900 1000, 1600 950" 
            stroke="rgba(220, 38, 38, 0.2)" 
            strokeWidth="2" 
            strokeDasharray="20 20" 
            className="animate-dash" 
        />

      </svg>
      
      {/* Vignette Overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
            background: 'radial-gradient(circle at center, transparent 0%, #050505 100%)',
            opacity: 0.8
        }}
      ></div>
    </div>
  );
};