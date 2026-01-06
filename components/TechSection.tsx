import React, { useEffect, useRef, useState } from 'react';
import { FileText, Download, ArrowRight } from 'lucide-react';

export const TechSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const specBookURL = "https://drive.google.com/drive/folders/1SUGH4sUpZUxEJ9EuRFo9DOudVnR_dxOS"


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

   return (
    <section ref={sectionRef} className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className={`bg-neutral-900/40 border border-neutral-800 p-1 md:p-2 relative overflow-hidden transition-all duration-1000 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Decorative Grid Lines */}
        <div className={`absolute top-0 left-0 w-full h-[1px] bg-red-600/30 transition-all duration-1000 delay-500 ${isVisible ? 'w-full' : 'w-0'}`}></div>
        <div className={`absolute bottom-0 right-0 w-full h-[1px] bg-red-600/30 transition-all duration-1000 delay-500 ${isVisible ? 'w-full' : 'w-0'}`}></div>
        
        <div className="bg-[#0a0a0a] p-8 md:p-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content: Order 1 on Mobile, Order 1 on Desktop */}
            <div className={`flex-1 order-1 lg:order-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                {/* Standardized Header Style */}
                <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">System Architecture</h4>
                <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-8">
                    Tech <span className="text-neutral-600">Specs</span>
                </h2>
                
                <p className="text-neutral-400 mb-8 leading-relaxed text-lg font-light border-l border-neutral-700 pl-4">
                Participants engineer vehicles equipped with infrared arrays for micro-second decision making. The core challenge: maintaining traction while executing high-g turns.
                </p>
                
                {/* Specification Book Link */}
                <a 
                    href={specBookURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] overflow-hidden"
                >
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <FileText className="w-6 h-6 relative z-10" />
                    <span className="relative z-10 text-sm md:text-base">View Full Specifications</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50"></div>
                </a>

                {/* Optional: Small download hint */}
                <p className="text-neutral-600 text-xs mt-3 font-mono flex items-center gap-2">
                    <Download className="w-3 h-3" />
                    PDF Document • Technical Regulations & Standards
                </p>
            </div>


            <div className={`flex-1 w-full order-1 lg:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-neutral-800 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative rounded-lg overflow-hidden border border-neutral-800">
                        <img 
                            src="https://media.formula1.com/image/upload/t_16by9Centre/f_auto/q_auto/v1739914801/fom-website/2025/Red%20Bull/Formula%201%20header%20templates%20(60).png"
                            alt="Robot Technology" 
                            className="w-full h-auto object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                        />
                        {/* HUD Overlay */}
                        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-1 text-xs font-mono text-red-500 border border-red-500/30">
                            CAM_FEED_01 // LIVE
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
      </div>
    </section>
  );
};