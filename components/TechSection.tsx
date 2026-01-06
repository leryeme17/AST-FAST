import React, { useEffect, useRef, useState } from 'react';

export const TechSection = () => {
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
                
                <div className="space-y-4 font-mono text-sm">
                {[
                    { key: "SENSORS", val: "IR Array / Lidar / Optical Flow" },
                    { key: "CONTROL", val: "PID / Fuzzy Logic / Neural Net" },
                    { key: "CHASSIS", val: "Carbon Fiber / 3D Printed / PCB" },
                    { key: "POWER", val: "LiPo High-Discharge Cells" }
                ].map((item, idx) => (
                    <div 
                        key={idx} 
                        className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-800 pb-2 hover:pl-2 transition-all cursor-crosshair gap-1 md:gap-0"
                    >
                        <span className="text-neutral-500 text-xs md:text-sm uppercase tracking-wider">{item.key}</span>
                        <span className="text-white font-bold md:text-right">{item.val}</span>
                    </div>
                ))}
                </div>
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