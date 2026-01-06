import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Youtube, Linkedin, Github } from 'lucide-react';

export const FollowUs = () => {
    const socialLinks = [
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Youtube, href: "#", label: "Youtube" },
        { icon: Github, href: "#", label: "Github" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

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
            {
                threshold: 0.2 // Trigger when 20% of the element is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

  return (
    <section 
        ref={sectionRef} 
        className={`relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
        <div className="relative bg-black border border-neutral-800 p-8 md:p-16 flex flex-col xl:flex-row items-center justify-between gap-12 overflow-hidden group hover:border-red-900/50 transition-colors duration-500">
            
            {/* Left Red Stripe - Animate Height */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 md:w-3 bg-red-600 transition-all duration-1000 delay-300 ease-in-out ${isVisible ? 'h-full' : 'h-0'}`}></div>

            {/* Top Right Accent Bar - Animate Width */}
            <div className={`absolute top-0 right-0 h-2 bg-red-600 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'w-24 md:w-48' : 'w-0'}`}></div>
            <div className={`absolute top-0 right-24 md:right-48 w-8 h-2 bg-red-800 skew-x-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-50 translate-y-0' : 'opacity-0 -translate-y-4'}`}></div>

            <div className="flex-1 text-left z-10 w-full">
                 {/* Label */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
                    <span className="text-red-600 font-mono text-xs md:text-sm tracking-[0.2em] font-bold uppercase">Team Telemetry</span>
                </div>

                {/* Headline */}
                <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6 leading-[0.9]">
                    JOIN THE <span className="text-red-600 inline-block hover:scale-105 transition-transform duration-300">PADDOCK</span>
                </h2>
                
                {/* Description */}
                <p className="text-neutral-400 text-lg md:text-xl max-w-2xl font-normal leading-relaxed">
                    Access real-time race data, pit wall strategies, and exclusive behind-the-scenes content from our engineering teams.
                </p>
            </div>

            {/* Social Icons - Staggered Entrance */}
            <div className="flex flex-wrap justify-center gap-4 z-10">
                {socialLinks.map((item, idx) => (
                    <a 
                        key={idx} 
                        href={item.href}
                        style={{ transitionDelay: `${800 + (idx * 100)}ms` }}
                        className={`group relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transform -skew-x-12 bg-[#0a0a0a] border border-neutral-800 hover:border-red-600 hover:bg-neutral-900 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                        aria-label={item.label}
                    >
                         {/* Icon needs to be un-skewed */}
                        <div className="transform skew-x-12">
                             <item.icon className="w-6 h-6 md:w-8 md:h-8 text-neutral-300 group-hover:text-white transition-colors stroke-[1.5]" />
                        </div>
                    </a>
                ))}
            </div>
            
            {/* Background Gradient/Texture */}
             <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-full bg-gradient-to-l from-red-900/5 to-transparent pointer-events-none"></div>
        </div>
    </section>
  );
};