import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-neutral-800 bg-neutral-900/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-neutral-700">
      <button 
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="font-semibold text-lg text-neutral-200">{question}</span>
        {isOpen ? <ChevronUp className="text-red-500" /> : <ChevronDown className="text-neutral-500" />}
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-neutral-400">{answer}</p>
      </div>
    </div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  const faqs = [
    {
      question: "What are the robot specifications?",
      answer: "Robots must be fully autonomous with maximum dimensions of 25cm x 25cm x 25cm. They should use sensors (infrared, optical, or camera-based) to follow the track line. Any microcontroller platform is allowed (Arduino, Raspberry Pi, etc.)."
    },
    {
      question: "How do I register my team?",
      answer: "Complete the registration form above with your team details. Once submitted, you will receive a confirmation email with further instructions and payment details for the entry fee."
    },
    {
      question: "What is the competition format?",
      answer: "The competition consists of a qualifying round followed by knockout stages. Teams will have multiple attempts to set their best time on the track."
    },
    {
      question: "Can I modify my robot during the event?",
      answer: "Minor repairs and calibration are allowed between runs in the pit area. Major structural changes or swapping robots entirely is not permitted once the competition has begun."
    },
    {
      question: "What programming languages can I use?",
      answer: "You can use any programming language supported by your hardware platform (C++, Python, etc.). The robot must run autonomously without remote control."
    },
    {
      question: "Are there any prizes?",
      answer: "Yes! There are cash prizes for the top 3 teams in each category, as well as awards for 'Best Design', 'Most Innovative Code', and 'Fastest Lap'."
    },
    {
        question: "What should I bring to the event?",
        answer: "Bring your robot, spare batteries, chargers, laptops for coding, tools for repairs, and extension cords. Power strips will be provided in the pit area."
    },
    {
        question: "Is there a registration fee?",
        answer: "Yes, there is a nominal team registration fee of $50 to cover event costs, materials, and prizes. This fee is per team, not per individual member."
    },
  ];

  return (
    <section ref={sectionRef} className="relative z-10 py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">Help Center</h4>
        <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            Common <span className="text-neutral-600">Queries</span>
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
             key={index} 
             className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: `${index * 100}ms` }}
          >
              <FAQItem 
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
          </div>
        ))}
      </div>
    </section>
  );
};