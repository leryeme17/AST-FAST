import React from 'react';
import { BackgroundCurves } from './components/BackgroundCurves';
import { Hero } from './components/Hero';
import { AboutCompetition } from './components/AboutCompetition';
import { TechSection } from './components/TechSection';
import { Specs } from './components/Specs';
import  RegistrationForm  from './components/RegistrationForm';
import { FAQ } from './components/FAQ';
import  History  from './components/History';
import { AboutUs } from './components/AboutUs';
import { FollowUs } from './components/FollowUs';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { BackToTop } from './components/BackToTop';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white">
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0">
         <BackgroundCurves />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content Scroll Wrapper */}
      <div className="relative z-10">
        <Hero />
        
        <div className="space-y-12 pb-20">
          <div id="event">
             <AboutCompetition />
          </div>
          
          <TechSection />
          
          {/* Added IDs for navigation scrolling */}
          <div id="specs">
            <Specs />
          </div>
          <div id="faq">
            <FAQ />
          </div>
          
          {/* History moved above About Us */}
          <div id="history">
            <History />
          </div>
          
          <div id="about">
            <AboutUs />
          </div>

          {/* Registration moved before Follow Us */}
          <div id="register">
            <RegistrationForm />
          </div>

          <FollowUs />
        </div>

        <Footer />
      </div>

      {/* Floating UI */}
      <BackToTop />
      <Chatbot />
    </div>
  );
}

export default App;