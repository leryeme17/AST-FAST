import React, { useEffect, useRef, useState } from 'react';
import { Target, Zap, Award, Flag, Cpu } from 'lucide-react';

export const AboutCompetition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
        if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const cards = [
    {
      id: "01",
      icon: Target,
      title: "Line Following",
      desc: "High-speed navigation on complex black/white tracks."
    },
    {
      id: "02",
      icon: Zap,
      title: "Speed Trap",
      desc: "Pure velocity challenges on straightaways. Push your robots to the limit."
    },
    {
      id: "03",
      icon: Flag,
      title: "Track Sessions",
      desc: "Regular testing and development days. Push the limits and refine your skills."
    }
  ];

  // Helper to create duplicate sets for seamless looping
  // We need enough items to ensure the 'halfway' point of the container is strictly identical to the start
  // and covers the viewport width.
  // Strategy: Create 2 identical halves. Each half must be wide enough to fill the screen.
  
  // Base set quadrupled to ensure one "half" fills even 4k screens
  const halfSet = [...cards, ...cards, ...cards, ...cards]; 
  const fullRowData = [...halfSet, ...halfSet]; // This creates the [A, A] structure for 50% translation

  // Variations for other rows (rotated content)
  const cardsRotated1 = [...cards.slice(1), ...cards.slice(0, 1)];
  const halfSet2 = [...cardsRotated1, ...cardsRotated1, ...cardsRotated1, ...cardsRotated1];
  const row2Data = [...halfSet2, ...halfSet2];

  const cardsRotated2 = [...cards.slice(2), ...cards.slice(0, 2)];
  const halfSet3 = [...cardsRotated2, ...cardsRotated2, ...cardsRotated2, ...cardsRotated2];
  const row3Data = [...halfSet3, ...halfSet3];

  return (
    <section ref={sectionRef} className="relative z-10 py-24 overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 90s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 90s linear infinite;
        }
        
        /* Pause on Hover Interaction */
        .marquee-wrapper:hover .animate-scroll-left,
        .marquee-wrapper:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className={`flex flex-col md:flex-row justify-between items-end border-b border-neutral-800 pb-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
                <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">Event Overview</h4>
                <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                    Competition <span className="text-neutral-600">DNA</span>
                </h2>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 mt-4 md:mt-0">
                <Cpu className="w-5 h-5" />
                <span className="font-mono text-sm">SYS.STATUS: READY</span>
            </div>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div className={`marquee-wrapper flex flex-col gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        
        {/* Row 1: Right to Left */}
        <div className="relative w-full overflow-hidden">
           <div className="absolute top-0 left-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute top-0 right-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

           {/* NOTE: Using margin-right on cards instead of gap on parent for seamless loop physics */}
           <div className="flex w-max animate-scroll-left pl-6">
              {fullRowData.map((card, idx) => (
                  <MarqueeCard key={`row1-${card.id}-${idx}`} card={card} />
              ))}
           </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="relative w-full overflow-hidden">
           <div className="absolute top-0 left-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute top-0 right-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

           <div className="flex w-max animate-scroll-right pl-6">
              {row2Data.map((card, idx) => (
                  <MarqueeCard key={`row2-${card.id}-${idx}`} card={card} />
              ))}
           </div>
        </div>

        {/* Row 3: Right to Left */}
        <div className="relative w-full overflow-hidden">
           <div className="absolute top-0 left-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute top-0 right-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

           <div className="flex w-max animate-scroll-left pl-6">
              {row3Data.map((card, idx) => (
                  <MarqueeCard key={`row3-${card.id}-${idx}`} card={card} />
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

// Extracted Card Component
const MarqueeCard = ({ card }: { card: any }) => (
    <div className="w-[300px] md:w-[400px] bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 p-6 hover:bg-neutral-900 hover:border-red-600/50 transition-all duration-300 group/card relative flex-shrink-0 rounded-xl mr-6">
        {/* Racing Stripe */}
        <div className="absolute left-0 top-4 bottom-4 w-1 bg-red-600/20 group-hover/card:bg-red-600 transition-colors"></div>
        
        <div className="flex items-center gap-4 mb-3 ml-3">
            <div className="p-2 bg-black border border-neutral-800 rounded text-neutral-400 group-hover/card:text-red-500 group-hover/card:border-red-600/30 transition-all">
                <card.icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase italic tracking-wide truncate">{card.title}</h3>
        </div>
        
        <p className="text-neutral-400 text-sm leading-relaxed font-light ml-3 border-l border-neutral-800 pl-3 group-hover/card:border-neutral-600 transition-colors line-clamp-2">
            {card.desc}
        </p>

        {/* Tech Decor */}
        <div className="absolute top-2 right-2 flex gap-1">
            <div className="w-1 h-1 bg-neutral-700 rounded-full"></div>
            <div className="w-1 h-1 bg-neutral-700 rounded-full"></div>
        </div>
    </div>
);