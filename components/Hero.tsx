import React, { useEffect, useState } from 'react';
import { Flag, ChevronRight, Timer } from 'lucide-react';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id="home" className="relative w-full min-h-screen md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* 
           NOTE: Replaced with a robotics/electronics image. 
           To use your specific uploaded image, place it in your public folder and update the src below (e.g., src="/your-robot-image.jpg")
        */}
        <img 
          src="https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?q=80&w=2070&auto=format&fit=crop" 
          alt="Robot Chassis" 
          className="w-full h-full object-cover opacity-50 grayscale-[20%]"
        />
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,#000_3px)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-[#050505]"></div>
      </div>

      {/* Adjusted margin: Higher on mobile (-mt-24), Lower on desktop (md:mt-12) */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto py-20 md:py-0 -mt-24 md:mt-12">
        
        {/* Restored Season Tag */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-red-600/30 bg-red-900/10 backdrop-blur-md mb-8 transition-all duration-1000 delay-300 transform -skew-x-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse skew-x-12"></div>
            <span className="text-red-500 font-mono text-xs md:text-sm tracking-widest uppercase font-bold skew-x-12">
                Season 2026 // Registration Open
            </span>
        </div>

        {/* Restored Large Title */}
        <h1 className={`text-8xl md:text-[10rem] leading-none font-black italic text-white tracking-tighter mb-4 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            F<span className="text-red-600 inline-block mx-1">-</span>AST
        </h1>

        <h2 className={`text-3xl md:text-5xl font-black text-white tracking-tighter italic uppercase mb-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            High-Speed Line Follower competition
        </h2>
        
        <p className={`text-lg md:text-xl text-neutral-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed border-l-2 border-red-600 pl-6 text-left bg-black/40 backdrop-blur-sm py-4 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          The ultimate autonomous line-following grand prix. Engineering precision meets high-speed code in a battle for the podium.
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-[1200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} className="group relative bg-red-600 hover:bg-red-700 text-white px-10 py-5 font-bold text-xl transition-all transform hover:scale-105 -skew-x-12 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            <div className="flex items-center gap-3 skew-x-12">
                <Flag className="w-6 h-6" />
                <span>START ENGINE</span>
            </div>
            {/* Button Shine Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
          </button>

          <button onClick={() => document.getElementById('event')?.scrollIntoView({ behavior: 'smooth' })} className="group border border-white/20 hover:border-white hover:bg-white/10 text-white px-10 py-5 font-bold text-xl transition-all transform hover:scale-105 -skew-x-12 backdrop-blur-sm">
             <div className="flex items-center gap-3 skew-x-12">
                <span>RACE SPECS</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};