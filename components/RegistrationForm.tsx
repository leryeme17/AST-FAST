import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function RegistrationForm() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    member1Name: '', member1Email: '', member1Phone: '',
    member2Name: '', member2Email: '', member2Phone: '',
    member3Name: '', member3Email: '', member3Phone: '',
    robotName: '', experienceLevel: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const SCRIPT_URL = 'https://docs.google.com/spreadsheets/d/1ouK5ssCS8hcjlKd2OFL0Moz_exeY6VGmus9ytVQrKUM/edit?gid=0#gid=0';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setSubmitStatus('success');
      setFormData({
        member1Name: '', member1Email: '', member1Phone: '',
        member2Name: '', member2Email: '', member2Phone: '',
        member3Name: '', member3Email: '', member3Phone: '',
        robotName: '', experienceLevel: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="relative z-10 py-20 px-4 md:px-8 max-w-3xl mx-auto">
      <div className={`mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
         <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">Join The Grid</h4>
         <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            Pit <span className="text-neutral-600">Lane</span>
         </h2>
      </div>

      <div className={`bg-[#080808] border border-neutral-800 p-8 md:p-10 relative transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-600 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-600 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-600 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-600 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className="space-y-8">
            
            {/* Member 1 */}
            <div className="space-y-6">
                <h3 className="text-sm font-mono text-red-500 uppercase tracking-widest border-b border-neutral-800 pb-2">01 // Member 1 <span className="text-red-400">(Required)</span></h3>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase">Full Name *</label>
                    <input 
                        type="text" 
                        name="member1Name"
                        value={formData.member1Name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                        placeholder="FULL NAME" 
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Email *</label>
                        <input 
                            type="email" 
                            name="member1Email"
                            value={formData.member1Email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                            placeholder="EMAIL@DOMAIN" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Phone *</label>
                        <input 
                            type="tel" 
                            name="member1Phone"
                            value={formData.member1Phone}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                            placeholder="+213XXXXXXXXX" 
                        />
                    </div>
                </div>
            </div>

            {/* Member 2 */}
            <div className="space-y-6">
                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-800 pb-2">02 // Member 2 <span className="text-neutral-600">(Optional)</span></h3>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase">Full Name</label>
                    <input 
                        type="text" 
                        name="member2Name"
                        value={formData.member2Name}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                        placeholder="FULL NAME" 
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Email</label>
                        <input 
                            type="email" 
                            name="member2Email"
                            value={formData.member2Email}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                            placeholder="EMAIL@DOMAIN" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Phone</label>
                        <input 
                            type="tel" 
                            name="member2Phone"
                            value={formData.member2Phone}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                            placeholder="+213XXXXXXXXX" 
                        />
                    </div>
                </div>
            </div>

            {/* Member 3 */}
            <div className="space-y-6">
                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-800 pb-2">03 // Member 3 <span className="text-neutral-600">(Optional)</span></h3>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase">Full Name</label>
                    <input 
                        type="text" 
                        name="member3Name"
                        value={formData.member3Name}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                        placeholder="FULL NAME" 
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Email</label>
                        <input 
                            type="email" 
                            name="member3Email"
                            value={formData.member3Email}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                            placeholder="EMAIL@DOMAIN" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Phone</label>
                        <input 
                            type="tel" 
                            name="member3Phone"
                            value={formData.member3Phone}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                            placeholder="+213XXXXXXXXX" 
                        />
                    </div>
                </div>
            </div>

            {/* Machine Spec */}
             <div className="space-y-6">
                <h3 className="text-sm font-mono text-red-500 uppercase tracking-widest border-b border-neutral-800 pb-2">04 // Machine Spec</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Robot Name *</label>
                        <input 
                            type="text" 
                            name="robotName"
                            value={formData.robotName}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm" 
                            placeholder="UNIT DESIGNATION" 
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Experience Level *</label>
                        <select 
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 focus:border-red-600 focus:outline-none focus:bg-neutral-900 transition-colors font-mono text-sm appearance-none"
                        >
                            <option value="" disabled>SELECT LEVEL</option>
                            <option value="beginner">BEGINNER</option>
                            <option value="intermediate">INTERMEDIATE</option>
                            <option value="advanced">ADVANCED</option>
                        </select>
                    </div>
                </div>
            </div>

            {submitStatus === 'success' && (
                <div className="bg-green-900/30 border border-green-600 text-green-400 p-4 font-mono text-sm">
                    ✓ REGISTRATION SUCCESSFUL - WELCOME TO THE GRID
                </div>
            )}
            
            {submitStatus === 'error' && (
                <div className="bg-red-900/30 border border-red-600 text-red-400 p-4 font-mono text-sm">
                    ✗ SUBMISSION FAILED - PLEASE TRY AGAIN
                </div>
            )}

            <div className="pt-6">
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-black italic uppercase py-4 tracking-wider transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 group"
                >
                    <span>{isSubmitting ? 'SUBMITTING...' : 'Confirm Entry'}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </div>
      </div>
    </section>
  );
}