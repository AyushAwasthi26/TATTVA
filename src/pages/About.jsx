import Navbar from "../components/Navbar";
import { Sparkles, Shield, Zap, Users, Brain, Target, Lightbulb, ChevronRight, ArrowRight, Github, Twitter, Linkedin, Mail, Upload, FileText, Loader2, CheckCircle, BarChart3, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Trigger initial animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = sectionRefs.current;
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }

      // Check which sections are visible for animations
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible && !visibleSections[index]) {
            setVisibleSections(prev => ({ ...prev, [index]: true }));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleSections]);

  const teamMembers = [
    {
      name: "Ayush Awasthi",
      role: "Full Stack Developer & AI Engineer",
      description: "Led the full-stack development and AI integration for the reasoning engine",
      photo: "/m5.png"
    },
    {
      name: "Atharv Dubey",
      role: "Backend & ML Engineer",
      description: "Developed the backend infrastructure and machine learning pipelines",
      photo: "/m2.jpeg"
    },
    {
      name: "Aditya Srivastava",
      role: "Full Stack Developer",
      description: "Implemented the frontend components and user interface",
      photo: "/m4.jpg"
    },
    {
      name: "Ashish Shukla",
      role: "Backend & ML Engineer",
      description: "Worked on data processing and model optimization",
      photo: "/m3.jpg"
    }
  ];

  const journey = [
    {
      title: "The Challenge",
      description: "Designing AI-Native Consumer Health Experiences at ENCODE 2026",
      icon: <Target className="w-5 h-5" />
    },
    {
      title: "The Insight",
      description: "Food labels create information gaps exactly when consumers need clarity most",
      icon: <Lightbulb className="w-5 h-5" />
    },
    {
      title: "The Solution",
      description: "An AI co-pilot that infers intent and explains only what matters",
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: "The Approach",
      description: "Experience design over data scale, reasoning over database lookup",
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  const principles = [
    {
      title: "Intent-First Design",
      description: "We infer what matters to you without forms or filters",
      color: "from-[#bfff00]/20 to-[#bfff00]/5"
    },
    {
      title: "Reasoning Over Data",
      description: "We explain why ingredients matter, not just what they are",
      color: "from-[#D3FD50]/20 to-[#D3FD50]/5"
    },
    {
      title: "Honest Uncertainty",
      description: "We acknowledge when science is mixed rather than pretending certainty",
      color: "from-green-500/20 to-green-500/5"
    },
    {
      title: "Cognitive Ease",
      description: "We reduce mental effort at the moment of decision",
      color: "from-emerald-500/20 to-emerald-500/5"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar onReset={() => {}} />
      
      {/* Enhanced Background Elements with Parallax */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs with Parallax */}
        <div 
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-[#bfff00]/5 to-transparent rounded-full blur-[150px]"
          style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.02}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-[#D3FD50]/5 to-transparent rounded-full blur-[150px]"
          style={{ transform: `translate(${-scrollY * 0.03}px, ${-scrollY * 0.03}px)` }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #bfff00 1px, transparent 1px),
                           linear-gradient(to bottom, #bfff00 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating Particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#bfff00]/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: "0s", animationDuration: "4s" }} />
          <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-green-500/20 rounded-full blur-md animate-pulse" style={{ animationDelay: "1s", animationDuration: "5s" }} />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-emerald-500/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: "2s", animationDuration: "3.5s" }} />
          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-[#bfff00]/20 rounded-full blur-md animate-pulse" style={{ animationDelay: "1.5s", animationDuration: "6s" }} />
        </div>
      </div>
      
      <main className="relative pt-20 md:pt-67 pb-20 px-4 sm:px-6 max-w-6xl mx-auto z-10">
        
        {/* Hero Section */}
        <section 
          ref={el => sectionRefs.current[0] = el}
          className={`mb-20 md:mb-60 text-center space-y-8 transition-all duration-700 ${
            visibleSections[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider leading-tight font-[font5]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                The Truth Behind
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#bfff00] to-[#D3FD50]">
                The Label.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed px-4 font-[font1]">
              Food marketing is designed to confuse. We built Tattva to cut through the noise and reveal the essence of what you eat.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4 px-4">
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00]/20 text-sm text-gray-300 hover:bg-[#bfff00]/10 transition-colors duration-300 font-[font1]">
                ENCODE 2026 Project
              </div>
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00]/20 text-sm text-gray-300 hover:bg-[#bfff00]/10 transition-colors duration-300 font-[font1]">
                AI-Native Design
              </div>
            </div>
          </div>
        </section>

        {/* Team Section - Fixed for 2x2 Mobile Grid */}
        <section 
          ref={el => sectionRefs.current[1] = el}
          className={`mb-20 transition-all duration-700 ${
            visibleSections[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[font5] tracking-widest">Meet The Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto px-4 font-[font1]">
              Four developers united by a vision to transform how people understand food through AI-native design
            </p>
          </div>
          
          {/* Changed to grid-cols-2 for mobile 2x2 layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group transform transition-all duration-500 hover:scale-105"
                style={{
                  transitionDelay: `${visibleSections[1] ? index * 100 : 0}ms`
                }}
              >
                <div className="relative mb-4 md:mb-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 mx-auto rounded-full bg-gradient-to-br from-[#bfff00] to-[#D3FD50] p-1 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-black overflow-hidden">
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 md:px-3 py-1 bg-black/80 backdrop-blur-md rounded-full">
                    <span className="text-xs text-[#bfff00] font-[font1]">ENCODE 2026</span>
                  </div>
                </div>
                
                <div className="text-center space-y-1 md:space-y-2 px-1">
                  <h3 className="text-sm md:text-lg lg:text-2xl font-bold text-white font-[font5] tracking-wider">{member.name}</h3>
                  <p className="text-xs md:text-sm text-[#D3FD50] font-medium font-[font1]">{member.role}</p>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed hidden md:block font-[font1]">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use Section - NEW */}
        <section 
          ref={el => sectionRefs.current[8] = el}
          className={`mb-20 transition-all duration-700 ${
            visibleSections[8] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[font5] tracking-wider">How to Use Tattva</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto px-4 font-[font1]">
              Get instant insights about your food in four simple steps
            </p>
          </div>
          
          {/* Mobile: Single column, Desktop: Two columns with alternating steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Step 1: Input */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md">
                <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-[#bfff00]/30 transition-all duration-300">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="aspect-square bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-[#bfff00] mx-auto mb-2" />
                        <p className="text-sm text-gray-400 font-[font1]">Upload Image</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-[#bfff00] mx-auto mb-2" />
                        <p className="text-sm text-gray-400 font-[font1]">Paste Text</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#bfff00]/20 border border-[#bfff00]/30 mt-6">
                <span className="text-[#bfff00] font-bold font-[font5]">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mt-4 font-[font5]">Input Your Food Information</h3>
              <p className="text-gray-400 mt-2 text-center max-w-lg font-[font1]">
                Choose to upload a photo of the food label or paste the ingredients list directly.
              </p>
            </div>
            
            {/* Step 2: Processing */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md">
                <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-[#bfff00]/30 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <Loader2 className="w-10 h-10 text-[#bfff00] animate-spin" />
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-white font-medium font-[font1]">AI is analyzing your food...</p>
                    <p className="text-sm text-gray-400 font-[font1]">Cross-referencing with health guidelines</p>
                    <div className="w-full bg-gray-800 rounded-full h-2 mt-4">
                      <div className="bg-gradient-to-r from-[#bfff00] to-[#D3FD50] h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#bfff00]/20 border border-[#bfff00]/30 mt-6">
                <span className="text-[#bfff00] font-bold font-[font5]">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mt-4 font-[font5]">AI Processing</h3>
              <p className="text-gray-400 mt-2 text-center max-w-lg font-[font1]">
                Our AI analyzes ingredients and cross-references scientific databases.
              </p>
            </div>
            
            {/* Step 3: Initial Results */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md">
                <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-[#bfff00]/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-orange-500/20">
                      <AlertCircle className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium font-[font1]">Highly Processed</p>
                      <p className="text-sm text-gray-400 font-[font1]">Use Caution</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <p className="text-sm text-gray-300 font-[font1]">AI Verified</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#bfff00]" />
                      <p className="text-sm text-gray-300 font-[font1]">Confidence: High</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-300 font-[font1]">Contains multiple added sugars and refined ingredients</p>
                  </div>
                </div>
              </div>
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#bfff00]/20 border border-[#bfff00]/30 mt-6">
                <span className="text-[#bfff00] font-bold font-[font5]">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mt-4 font-[font5]">Get Instant Results</h3>
              <p className="text-gray-400 mt-2 text-center max-w-lg font-[font1]">
                Receive immediate insights with a clear verdict and key findings.
              </p>
            </div>
            
            {/* Step 4: Detailed Analysis */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md">
                <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-[#bfff00]/30 transition-all duration-300">
                  <button className="w-full py-2 bg-gradient-to-r from-[#bfff00]/10 to-[#D3FD50]/10 border border-[#bfff00]/20 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#bfff00]/20 transition-colors font-[font1]">
                    <span>See Detailed Analysis</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="mt-4 space-y-2 text-sm text-gray-400 font-[font1]">
                    <p>• Ingredient breakdown with risk levels</p>
                    <p>• Scientific consensus on controversial ingredients</p>
                    <p>• Personalized recommendations</p>
                  </div>
                </div>
              </div>
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#bfff00]/20 border border-[#bfff00]/30 mt-6">
                <span className="text-[#bfff00] font-bold font-[font5]">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mt-4 font-[font5]">Explore Detailed Analysis</h3>
              <p className="text-gray-400 mt-2 text-center max-w-lg font-[font1]">
                Dive deeper with comprehensive ingredient analysis and personalized recommendations.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/"
              className="inline-flex px-8 py-4 rounded-2xl bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold shadow-lg hover:shadow-[#bfff00]/25 transition-all duration-300 items-center gap-2 group transform hover:scale-105 font-[font1]"
            >
              Try Tattva Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Journey Timeline */}
        <section 
          ref={el => sectionRefs.current[2] = el}
          className={`mb-20 transition-all duration-700 ${
            visibleSections[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[font5] tracking-wider">Our Approach</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journey.map((item, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800 hover:border-[#bfff00]/30 transition-all duration-500 group transform hover:-translate-y-2 ${
                  activeSection === index ? 'border-[#bfff00]/50 bg-[#bfff00]/5' : ''
                }`}
                ref={el => sectionRefs.current[index + 10] = el}
                style={{
                  transitionDelay: `${visibleSections[2] ? index * 100 : 0}ms`
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#bfff00]/10 text-[#bfff00] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white font-[font5]">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-[font1]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Problem Section */}
        <section 
          ref={el => sectionRefs.current[3] = el}
          className={`mb-20 transition-all duration-700 ${
            visibleSections[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[font5] tracking-wide">The Challenge We Addressed</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 md:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-gray-800 hover:border-[#bfff00]/30 transition-all duration-500 group transform hover:-translate-y-2">
              <div className="p-3 rounded-xl bg-gray-800/60 w-fit mb-6 group-hover:bg-[#bfff00]/10 transition-colors">
                <Shield className="w-8 h-8 text-[#D3FD50]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-[font5]">The Information Gap</h3>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-[font1]">
                Food labels are optimized for regulatory compliance, not human understanding. "E471" tells you nothing about its effect on your gut health. This creates confusion exactly when consumers need clarity most.
              </p>
            </div>
            
            <div className="p-6 md:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-gray-800 hover:border-[#bfff00]/30 transition-all duration-500 group transform hover:-translate-y-2">
              <div className="p-3 rounded-xl bg-gray-800/60 w-fit mb-6 group-hover:bg-[#bfff00]/10 transition-colors">
                <Zap className="w-8 h-8 text-[#D3FD50]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-[font5]">Cognitive Overload</h3>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-[font1]">
                Making healthy decisions requires memorizing hundreds of additives. That's cognitive work an AI should do for you. Traditional apps expect users to interpret chemical names and conflicting health advice.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section 
          ref={el => sectionRefs.current[4] = el}
          className={`mb-20 transition-all duration-700 ${
            visibleSections[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[font5]">The Tattva Philosophy</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="p-6 md:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-gray-800">
            <p className="text-xl md:text-2xl lg:text-3xl text-center font-light text-white mb-12 px-4 font-[font1]">
              <strong className="text-[#D3FD50] font-[font5]">AI as the Interface.</strong> We don't just act as a database lookup. Tattva acts as a reasoning engine that infers intent and explains only what matters.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {principles.map((principle, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-2xl bg-gradient-to-br ${principle.color} border border-gray-800 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg`}
                  style={{
                    transitionDelay: `${visibleSections[4] ? index * 100 : 0}ms`
                  }}
                >
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-[font5]">{principle.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base font-[font1]">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section 
          ref={el => sectionRefs.current[5] = el}
          className={`mb-20 transition-all duration-700 ${
            visibleSections[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[font5]">AI-Native Technology</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
              <h3 className="text-xl font-bold text-[#bfff00] mb-4 font-[font5]">Intent Inference</h3>
              <p className="text-gray-400 mb-4 text-sm md:text-base font-[font1]">
                Our system automatically detects what you care about - allergens, additives, or general health - without any forms or filters.
              </p>
              <div className="flex items-center text-sm text-gray-500 font-[font1]">
                <Brain className="w-4 h-4 mr-2" />
                Multimodal Understanding
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
              <h3 className="text-xl font-bold text-[#D3FD50] mb-4 font-[font5]">Reasoning Engine</h3>
              <p className="text-gray-400 mb-4 text-sm md:text-base font-[font1]">
                We explain trade-offs and uncertainty honestly, helping you make confident decisions rather than providing false certainty.
              </p>
              <div className="flex items-center text-sm text-gray-500 font-[font1]">
                <Lightbulb className="w-4 h-4 mr-2" />
                Contextual Analysis
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
              <h3 className="text-xl font-bold text-green-400 mb-4 font-[font5]">Cognitive Ease</h3>
              <p className="text-gray-400 mb-4 text-sm md:text-base font-[font1]">
                We reduce mental effort at the moment of decision by providing clear, actionable insights rather than overwhelming data.
              </p>
              <div className="flex items-center text-sm text-gray-500 font-[font1]">
                <Target className="w-4 h-4 mr-2" />
                Decision Support
              </div>
            </div>
          </div>
        </section>

        {/* Project Context Section */}
        <section 
          ref={el => sectionRefs.current[6] = el}
          className={`mb-20 transition-all duration-700 ${
            visibleSections[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="p-6 md:p-12 rounded-3xl bg-gradient-to-br from-[#bfff00]/5 to-[#D3FD50]/5 border border-[#bfff00]/20">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-[#bfff00]/10 mb-4">
                <Target className="w-8 h-8 text-[#bfff00]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[font5]">Project Context</h2>
              <p className="text-gray-400 max-w-2xl mx-auto px-4 font-[font1]">
                Developed for the ENCODE 2026 hackathon challenge: "Designing AI-Native Consumer Health Experiences"
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800 transform transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold text-[#bfff00] mb-2 font-[font5]">AI-Native</div>
                <div className="text-sm text-gray-400 font-[font1]">Experience Design</div>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800 transform transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold text-[#D3FD50] mb-2 font-[font5]">50%</div>
                <div className="text-sm text-gray-400 font-[font1]">Judging Weight</div>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800 transform transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold text-green-400 mb-2 font-[font5]">2000+</div>
                <div className="text-sm text-gray-400 font-[font1]">Participants</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={el => sectionRefs.current[7] = el}
          className={`mb-20 transition-all duration-700 ${
            visibleSections[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center space-y-6 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-[font5]">Experience Tattva</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-[font1]">
              See how our AI-native approach transforms food label understanding
            </p>
            <Link 
              to="/"
              className="inline-flex px-8 py-4 rounded-2xl bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold shadow-lg hover:shadow-[#bfff00]/25 transition-all duration-300 items-center gap-2 group transform hover:scale-105 font-[font1]"
            >
              Try Tattva Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center pt-10 border-t border-gray-800">
          <p className="text-gray-600 text-sm px-4 font-[font1]">
            Built for ENCODE 2026. Designed to make food transparency accessible to everyone.
          </p>
          
          {/* Social Links - Space for you to add your actual links */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <a href="#" className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-[#bfff00] hover:border-[#bfff00]/50 transition-all duration-300 transform hover:scale-110">
              <Github size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-[#bfff00] hover:border-[#bfff00]/50 transition-all duration-300 transform hover:scale-110">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-[#bfff00] hover:border-[#bfff00]/50 transition-all duration-300 transform hover:scale-110">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-[#bfff00] hover:border-[#bfff00]/50 transition-all duration-300 transform hover:scale-110">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}