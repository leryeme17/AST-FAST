import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import workshopImage from '../pics/workshop.jpg';
import opendayImage from '../pics/openday.jpg';
import seedImage from '../pics/seed.jpg';
import nestImage from '../pics/nest.jpg';
import birthdayImage from '../pics/birthday.jpg';
import afrobotImage from '../pics/afrobot.jpg';


const EventsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const events = [
    {
      id: 1,
      image: nestImage,
      title: "Nest 2025",
      description: "Our club`s hackathon which took place on 9-12 April 2025 with 200 participants competing in robotics, IoT and AI."

    },
    {
      id: 2,
      image: opendayImage,
      title: "Open Day 2024/2025",
      description: "AST’s first event where we presented the vision of the club and some projects done by the founders. First edition was on 19/10/2024 and the second on 22/09/2025."
    },
    {
      id: 3,
      image: seedImage,
      title: "Seed 2025",
      description: "the event that exhibits projects and clubs from all arround Algeria. SEED1 was on 8/2/2025 where 20 clubs have attended, SSED2 on 6/12/2025: more than 30 clubs came for the exhibition."
    },
    {
      id: 4,
      image: afrobotImage,
      title: "AFROBOT 2025",
      description: "with the collaboration of 4 other clubs and under the patronage of the Governor of Algiers and the Youth Center, four robotic competitions was organized. AST was the host of the AllTerrain robot competition."
    },
    {
      id: 5,
      image: workshopImage,
      title: "Workshops",
      description: "AST provides series of workshops and trainings in various fields. We hosted workshops in: Arduino, Python, Micropython, Latex, UI/UX design, Video editing, git/gitHub."
    },
    {
      id: 6,
      image: birthdayImage,
      title: "ASTBirthday 2025",
      description: "Celebrating the first birthday of the club on 18/10/2025 by organizing a small robotic competition, presenting our club’s team projects and a lot of fun activities."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % events.length;
      slides.push(events[index]);
    }
    return slides;
  };

  return (
    <section className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
          <span className="text-red-600 font-mono text-xs md:text-sm tracking-[0.2em] font-bold uppercase">
            Event Calendar
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
          Upcoming <span className="text-red-600">Events</span>
        </h2>
      </div>

      <div 
        className="relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Desktop View - 3 Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {getVisibleSlides().map((event, idx) => (
            <div
              key={event.id}
              className={`bg-neutral-900 border border-neutral-800 overflow-hidden group hover:border-red-600 transition-all duration-500 transform hover:scale-105 ${
                idx === 0 ? 'opacity-100' : idx === 1 ? 'opacity-90' : 'opacity-80'
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-white italic uppercase mb-3 group-hover:text-red-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View - 1 Card */}
        <div className="md:hidden">
          <div className="bg-neutral-900 border border-neutral-800 overflow-hidden">
            <div className="relative h-72 overflow-hidden">
              <img
                src={events[currentIndex].image}
                alt={events[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-black text-white italic uppercase mb-3">
                {events[currentIndex].title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {events[currentIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-black/80 border border-neutral-800 hover:border-red-600 p-3 transition-all duration-300 group z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-neutral-400 group-hover:text-red-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-black/80 border border-neutral-800 hover:border-red-600 p-3 transition-all duration-300 group z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-neutral-400 group-hover:text-red-600" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-red-600'
                : 'w-2 bg-neutral-700 hover:bg-neutral-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsSlider;