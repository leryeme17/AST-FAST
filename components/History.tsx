import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Users } from 'lucide-react';

export const History = () => {
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

    const events = [
        {
            year: "2024",
            title: "Formula 1 Championship 2024",
            teams: "45 Teams",
            desc: "Our biggest event yet with teams from 15 different schools competing in an intense line-following showdown."
        },
        {
            year: "2023",
            title: "Robot Racing League 2023",
            teams: "32 Teams",
            desc: "A thrilling competition featuring advanced obstacle courses and precision challenges."
        },
        {
            year: "2022",
            title: "Autonomous Racing Cup 2022",
            teams: "28 Teams",
            desc: "The inaugural event that started our journey into competitive robotics racing."
        }
    ];

    return (
        <section ref={sectionRef} className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className={`mb-16 text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                 <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">Hall of Fame</h4>
                 <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                    Previous <span className="text-neutral-600">Seasons</span>
                 </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map((event, idx) => (
                    <div 
                        key={idx} 
                        className={`bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-700 shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                        style={{ transitionDelay: `${idx * 200}ms` }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-red-900/30 p-3 rounded-lg border border-red-900/50">
                                <Calendar className="w-6 h-6 text-red-500" />
                            </div>
                            <span className="text-red-500 font-bold text-xl">{event.year}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        
                        <div className="flex items-center gap-2 text-neutral-400 mb-4 text-sm">
                            <Users className="w-4 h-4" />
                            <span>{event.teams}</span>
                        </div>
                        
                        <p className="text-neutral-500 leading-relaxed text-sm">
                            {event.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};