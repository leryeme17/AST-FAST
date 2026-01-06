import React, { useEffect, useRef, useState } from 'react';

export const Specs = () => {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
        if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const specs = [
    {
      id: "01",
      title: "Dimensions",
      text: "Max 20x30x15cm cube. Strictly enforced during scrutineering."
    },
    {
      id: "02",
      title: "Track Surface",
      text: "Black line on white substrate. With 8 different tracks used over the season."
    },
    {
      id: "03",
      title: "Time Trials",
      text: "3 minutes per run in all phases except for the final with 5 minutes."
    }
  ];

  return (
    <section ref={sectionRef} className="relative z-10 py-10 px-4 md:px-8 max-w-7xl mx-auto">
      
      <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">Official Rules</h4>
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
              Race <span className="text-neutral-600">Standards</span>
          </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {specs.map((item, idx) => (
          <div 
            key={idx} 
            className={`bg-[#090909] border border-neutral-800 p-8 relative overflow-hidden group hover:border-red-600/50 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            {/* Big Background Number */}
            <span className="absolute -right-4 -top-8 text-9xl font-black text-neutral-800/30 italic select-none group-hover:text-red-900/10 transition-colors">
                {item.id}
            </span>
            
            <div className="relative z-10">
                <div className={`w-10 h-1 bg-red-600 mb-6 transition-all duration-500 delay-500 ${isVisible ? 'w-10' : 'w-0'}`}></div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase italic tracking-wider">{item.title}</h3>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                {item.text}
                </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};