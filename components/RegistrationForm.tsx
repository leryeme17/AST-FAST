import React, { useEffect, useRef, useState } from 'react';
import { Flag, User, Users, Mail, Phone, Cpu, Trophy } from 'lucide-react';
import { ChevronRight as ChevronRightIcon } from 'lucide-react';

const ChevronRight = ({ className }: { className?: string }) => <ChevronRightIcon className={className} />;

export const RegistrationForm = () => {
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

  return (
    <section ref={sectionRef} className="relative z-10 py-20 px-4 md:px-8 max-w-3xl mx-auto">
      <div className={`mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
         <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">Join The Grid</h4>
         <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            Pit <span className="text-neutral-600">Lane</span>
         </h2>
      </div>

      <div className={`bg-[#080808] border border-neutral-800 p-8 md:p-10 relative transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        {/* Decorative corner markers */}
        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-600 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-600 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-600 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-600 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

        <form className="space-y-8">
            
            {/* Section 01 - Team Data */}
            <div className="space-y-6">
                <h3 className="text-sm font-mono text-red-500 uppercase tracking-widest border-b border-neutral-800 pb-2">01 // Team Data</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Team Name</label>
                        <input type="text" className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" placeholder="ENTER NAME" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Team Principal</label>
                        <input type="text" className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" placeholder="FULL NAME" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase">Team Members</label>
                    <textarea 
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm resize-y min-h-[80px]" 
                        placeholder="List names of all team members..."
                        rows={3}
                    ></textarea>
                </div>
            </div>

            {/* Section 02 - Contact */}
             <div className="space-y-6">
                <h3 className="text-sm font-mono text-red-500 uppercase tracking-widest border-b border-neutral-800 pb-2">02 // Contact</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Comms Email</label>
                        <input type="email" className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" placeholder="EMAIL@DOMAIN" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Phone</label>
                        <input type="tel" className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" placeholder="NUMBER" />
                    </div>
                </div>
            </div>

            {/* Section 03 - Machine Spec */}
             <div className="space-y-6">
                <h3 className="text-sm font-mono text-red-500 uppercase tracking-widest border-b border-neutral-800 pb-2">03 // Machine Spec</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Robot Name</label>
                        <input type="text" className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" placeholder="UNIT DESIGNATION" />
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Experience Level</label>
                        <select className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm appearance-none">
                            <option value="" disabled selected>SELECT LEVEL</option>
                            <option value="beginner">BEGINNER</option>
                            <option value="intermediate">INTERMEDIATE</option>
                            <option value="advanced">ADVANCED</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <button type="button" className="w-full bg-red-600 hover:bg-red-700 text-white font-black italic uppercase py-4 tracking-wider transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 group">
                    <span>Confirm Entry</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </form>
      </div>
    </section>
  );
};