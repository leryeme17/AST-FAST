import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      // Moved to bottom-28 to sit above the Chatbot button
      className={`fixed bottom-28 right-8 z-40 bg-neutral-900 hover:bg-neutral-800 text-white p-3 border border-neutral-700 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      } -skew-x-12 group`}
      aria-label="Back to Top"
    >
      <div className="skew-x-12">
         <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
      </div>
    </button>
  );
};