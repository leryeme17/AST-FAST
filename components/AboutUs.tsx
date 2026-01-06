import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  return (
    <section ref={sectionRef} className="relative z-10 py-20 px-4 md:px-8 max-w-5xl mx-auto">
       <div className={`mb-12 text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">AST Team</h4>
        <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            About <span className="text-neutral-600">Us</span>
        </h2>
      </div>

      <div className={`bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 md:p-14 transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h3 className="text-2xl font-bold text-white mb-6">Who We Are</h3>
        
        {/* Content Container */}
        <div className={`space-y-6 text-neutral-400 leading-relaxed text-lg transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-[150px] md:max-h-none'}`}>
            <p>
                We are a passionate community of robotics enthusiasts, engineers, and educators dedicated to promoting STEM education through competitive robotics. Since 2022, we've been organizing premier line-following robot competitions that challenge participants to push the boundaries of autonomous navigation and control systems.
            </p>
            <p>
                Our events bring together students, hobbyists, and professionals to share knowledge, compete fairly, and celebrate the exciting world of robotics and automation. We believe in open-source collaboration and the spirit of friendly competition to drive innovation in the field of embedded systems and AI.
            </p>
        </div>

        {/* Read More Button (Mobile Only) */}
        <div className="md:hidden mt-4 flex justify-center">
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-red-500 font-bold uppercase text-sm tracking-wider hover:text-white transition-colors"
            >
                {isExpanded ? (
                    <>
                        Read Less <ChevronUp className="w-4 h-4" />
                    </>
                ) : (
                    <>
                        Read More <ChevronDown className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>

      </div>
    </section>
  );
};