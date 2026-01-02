import Navbar from "../components/Navbar";
import { Sparkles, Shield, Zap, Users, Brain, Target, Lightbulb, ChevronRight, ArrowRight, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      photo: "/m3.jpg"
    },
    {
      name: "Ashish Shukla",
      role: "Backend & ML Engineer",
      description: "Worked on data processing and model optimization",
      photo: "/m4.jpg"
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
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Enhanced Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#bfff00]/5 to-transparent rounded-full blur-[150px]"
          style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.02}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#D3FD50]/5 to-transparent rounded-full blur-[150px]"
          style={{ transform: `translate(${-scrollY * 0.03}px, ${-scrollY * 0.03}px)` }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #bfff00 1px, transparent 1px),
                           linear-gradient(to bottom, #bfff00 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      <main className="relative pt-65 pb-20 px-6 max-w-6xl mx-auto z-10">
        
        {/* Hero Section */}
        <section className="mb-40 text-center space-y-8">
          {/* <div className="inline-flex p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-[#bfff00]/20 shadow-2xl hover:shadow-[#bfff00]/10 transition-all duration-500 hover:scale-105">
            <Sparkles className="w-8 h-8 text-[#bfff00]" />
          </div> */}
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                The Truth Behind
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#bfff00] to-[#D3FD50]">
                The Label.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              Food marketing is designed to confuse. We built Tattva to cut through the noise and reveal the essence of what you eat.
            </p>
            
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00]/20 text-sm text-gray-300">
                ENCODE 2026 Project
              </div>
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00]/20 text-sm text-gray-300">
                AI-Native Design
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet The Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Four developers united by a vision to transform how people understand food through AI-native design
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative mb-6">
                  <div className="w-65 h-65 mx-auto rounded-full bg-gradient-to-br from-[#bfff00] to-[#D3FD50] p-1 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-black overflow-hidden">
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full">
                    <span className="text-xs text-[#bfff00]">ENCODE 2026</span>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-[#D3FD50] font-medium">{member.role}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Approach</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journey.map((item, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800 hover:border-[#bfff00]/30 transition-all duration-500 group ${
                  activeSection === index ? 'border-[#bfff00]/50 bg-[#bfff00]/5' : ''
                }`}
                ref={el => sectionRefs.current[index] = el}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#bfff00]/10 text-[#bfff00] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Problem Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Challenge We Addressed</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-gray-800 hover:border-[#bfff00]/30 transition-all duration-500 group">
              <div className="p-3 rounded-xl bg-gray-800/60 w-fit mb-6 group-hover:bg-[#bfff00]/10 transition-colors">
                <Shield className="w-8 h-8 text-[#D3FD50]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The Information Gap</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Food labels are optimized for regulatory compliance, not human understanding. "E471" tells you nothing about its effect on your gut health. This creates confusion exactly when consumers need clarity most.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-gray-800 hover:border-[#bfff00]/30 transition-all duration-500 group">
              <div className="p-3 rounded-xl bg-gray-800/60 w-fit mb-6 group-hover:bg-[#bfff00]/10 transition-colors">
                <Zap className="w-8 h-8 text-[#D3FD50]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cognitive Overload</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Making healthy decisions requires memorizing hundreds of additives. That's cognitive work an AI should do for you. Traditional apps expect users to interpret chemical names and conflicting health advice.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Tattva Philosophy</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="p-8 md:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-gray-800">
            <p className="text-2xl md:text-3xl text-center font-light text-white mb-12">
              <strong className="text-[#D3FD50]">AI as the Interface.</strong> We don't just act as a database lookup. Tattva acts as a reasoning engine that infers intent and explains only what matters.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gradient-to-br ${principle.color} border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-3">{principle.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI-Native Technology</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800">
              <h3 className="text-xl font-bold text-[#bfff00] mb-4">Intent Inference</h3>
              <p className="text-gray-400 mb-4">
                Our system automatically detects what you care about - allergens, additives, or general health - without any forms or filters.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Brain className="w-4 h-4 mr-2" />
                Multimodal Understanding
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800">
              <h3 className="text-xl font-bold text-[#D3FD50] mb-4">Reasoning Engine</h3>
              <p className="text-gray-400 mb-4">
                We explain trade-offs and uncertainty honestly, helping you make confident decisions rather than providing false certainty.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Lightbulb className="w-4 h-4 mr-2" />
                Contextual Analysis
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800">
              <h3 className="text-xl font-bold text-green-400 mb-4">Cognitive Ease</h3>
              <p className="text-gray-400 mb-4">
                We reduce mental effort at the moment of decision by providing clear, actionable insights rather than overwhelming data.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Target className="w-4 h-4 mr-2" />
                Decision Support
              </div>
            </div>
          </div>
        </section>

        

        {/* Project Context Section */}
        <section className="mb-20">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#bfff00]/5 to-[#D3FD50]/5 border border-[#bfff00]/20">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-[#bfff00]/10 mb-4">
                <Target className="w-8 h-8 text-[#bfff00]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Project Context</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Developed for the ENCODE 2026 hackathon challenge: "Designing AI-Native Consumer Health Experiences"
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800">
                <div className="text-3xl font-bold text-[#bfff00] mb-2">AI-Native</div>
                <div className="text-sm text-gray-400">Experience Design</div>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800">
                <div className="text-3xl font-bold text-[#D3FD50] mb-2">50%</div>
                <div className="text-sm text-gray-400">Judging Weight</div>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-800">
                <div className="text-3xl font-bold text-green-400 mb-2">2000+</div>
                <div className="text-sm text-gray-400">Participants</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Experience Tattva</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how our AI-native approach transforms food label understanding
            </p>
            <Link 
              to="/"
              className="inline-flex px-8 py-4 rounded-2xl bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold shadow-lg hover:shadow-[#bfff00]/25 transition-all duration-300 items-center gap-2 group"
            >
              Try Tattva Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center pt-10 border-t border-gray-800">
          <p className="text-gray-600 text-sm">
            Built for ENCODE 2026. Designed to make food transparency accessible to everyone.
          </p>
          
          {/* Social Links - Space for you to add your actual links */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <a href="#" className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-[#bfff00] hover:border-[#bfff00]/50 transition-all duration-300">
              <Github size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-[#bfff00] hover:border-[#bfff00]/50 transition-all duration-300">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-[#bfff00] hover:border-[#bfff00]/50 transition-all duration-300">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-[#bfff00] hover:border-[#bfff00]/50 transition-all duration-300">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}