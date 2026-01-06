import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EventsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const events = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      title: "Season Kickoff 2025",
      description: "Join us for the official start of the racing season with team presentations and tech unveiling."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
      title: "Technical Workshop",
      description: "Deep dive into telemetry systems, sensor arrays, and autonomous navigation algorithms."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      title: "Track Testing Day",
      description: "Live testing sessions where teams optimize their vehicles for maximum performance."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
      title: "Championship Finals",
      description: "The ultimate showdown. Top teams compete for the championship trophy and glory."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1581092583537-20d51b3d4c0b?w=800&q=80",
      title: "Innovation Showcase",
      description: "Present your breakthrough designs and technologies to industry experts and sponsors."
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
      title: "Awards Ceremony",
      description: "Celebrating excellence in engineering, teamwork, and competitive spirit."
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