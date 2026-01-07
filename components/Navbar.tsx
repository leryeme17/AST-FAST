import React, { useEffect, useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import me from '../pics/black-logo-without-background.png';
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling 100px
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center transition-all duration-500 ease-in-out pointer-events-none ${
        isScrolled ? 'translate-y-4 opacity-100' : '-translate-y-20 opacity-0'
      }`}
    >
      {/* 
          Futuristic Container 
          - Skewed edges
          - Border accents
          - Technical feel
      */}
      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 px-6 md:px-8 py-3 pointer-events-auto transform -skew-x-12 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative group min-w-[300px] md:min-w-[750px] z-50">
        
        {/* Top Red Tech Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
        
        {/* Decorative bits */}
        <div className="absolute top-0 left-2 w-1 h-1 bg-white/50"></div>
        <div className="absolute top-0 right-2 w-1 h-1 bg-white/50"></div>
        <div className="absolute bottom-0 left-2 w-1 h-1 bg-white/50"></div>
        <div className="absolute bottom-0 right-2 w-1 h-1 bg-white/50"></div>

        <div className="flex items-center justify-between gap-6 md:gap-8 transform skew-x-12">
          
          {/* Logo Section */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 md:gap-4 cursor-pointer select-none"
          >
            {/* Event Logo Slot - Replaces abstract icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-transparent">
                 <img 
                    src={me}  
                    alt="Event Logo" 
                    className="w-full h-full object-contain filter invert opacity-90 hover:opacity-100 transition-opacity"
                 />
            </div>
            
            {/* F-AST Typography */}
            <div className="font-black italic text-xl md:text-2xl tracking-tighter leading-none flex items-baseline">
                <span className="text-white">F</span>
                <span className="text-red-600 mx-0.5">-</span>
                <span className="text-white">AST</span>
            </div>
          </div>

          {/* Desktop Links Section */}
          <div className="hidden md:flex items-center gap-6">
             <div className="flex items-center gap-1">
                {/* Reordered: FAQ before History */}
                {['Event', 'FAQ', 'History', 'About'].map((item) => (
                <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="relative px-5 py-2 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group/btn overflow-hidden"
                >
                    <span className="relative z-10">{item}</span>
                    {/* Hover Line */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out"></div>
                </button>
                ))}
             </div>

             {/* Join Race Button */}
             <button 
                onClick={() => scrollToSection('register')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 font-bold uppercase italic tracking-wider text-sm transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transform hover:-translate-y-0.5"
             >
                JOIN THE RACE
             </button>
          </div>

          {/* Status / Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
             {/* Removed SYS.ONLINE indicator */}

             {/* Hamburger Menu Button */}
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:text-red-500 transition-colors transform -skew-x-[-12deg]"
             >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden pointer-events-auto mt-2 w-[90%] max-w-[320px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 ease-out shadow-2xl ${
            isMobileMenuOpen ? 'max-h-[450px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}
      >
          <div className="p-4 flex flex-col gap-2">
            {['Event', 'FAQ', 'History', 'About'].map((item) => (
               <button
                 key={item}
                 onClick={() => scrollToSection(item.toLowerCase())}
                 className="w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-red-600"
               >
                 {item}
               </button>
             ))}
             
             {/* Mobile Join Race Button */}
             <button
                 onClick={() => scrollToSection('register')}
                 className="w-full text-center px-4 py-3 mt-2 text-sm font-black italic uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 transition-all shadow-[0_0_10px_rgba(220,38,38,0.3)]"
               >
                 JOIN THE RACE
             </button>
          </div>
          {/* Bottom decorative bar */}
          <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
      </div>

    </nav>
  );
};