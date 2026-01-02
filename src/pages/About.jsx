import Navbar from "../components/Navbar";
import { Sparkles, Shield, Zap, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Green Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-full blur-[150px]" />
        
        {/* Simple Grid Pattern - Using CSS instead of SVG */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px),
                           linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      <main className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto z-10">
        
        {/* Header Section */}
        <div className="mb-20 text-center space-y-6">
          <div className="inline-flex p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-green-500/20 shadow-2xl">
            <Sparkles className="w-8 h-8 text-[#bfff00]" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                The Truth Behind
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-[#D3FD50]">
                The Label.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              Food marketing is designed to confuse. We built Tattva to cut through the noise and reveal the essence of what you eat.
            </p>
          </div>
        </div>

        {/* The Problem Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Problem</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-gray-800 hover:border-green-500/30 transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-gray-800/60 w-fit mb-6 group-hover:bg-green-500/10 transition-colors">
                <Shield className="w-8 h-8 text-[#D3FD50]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The Information Gap</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Labels are optimized for regulatory compliance, not human understanding. "E471" tells you nothing about its effect on your gut health.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-gray-800 hover:border-green-500/30 transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-gray-800/60 w-fit mb-6 group-hover:bg-green-500/10 transition-colors">
                <Zap className="w-8 h-8 text-[#D3FD50]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cognitive Overload</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Making healthy decisions requires memorizing hundreds of additives. That's cognitive work an AI should do for you.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Tattva Philosophy</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="p-8 md:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-gray-800">
            <p className="text-2xl md:text-3xl text-center font-light text-white mb-12">
              <strong className="text-[#D3FD50]">AI as the Interface.</strong> We don't just act as a database lookup. Tattva acts as a reasoning engine.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <span className="text-3xl font-bold text-[#D3FD50]">01</span>
                </div>
                <h3 className="text-xl font-bold text-white">Infer Intent</h3>
                <p className="text-gray-400">
                  Are you looking for allergens? Or just general health? We understand your context.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <span className="text-3xl font-bold text-[#D3FD50]">02</span>
                </div>
                <h3 className="text-xl font-bold text-white">Reason Under Uncertainty</h3>
                <p className="text-gray-400">
                  If science is mixed, we tell you. We don't fake certainty.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <span className="text-3xl font-bold text-[#D3FD50]">03</span>
                </div>
                <h3 className="text-xl font-bold text-white">Respect Your Time</h3>
                <p className="text-gray-400">
                  Conclusion first. Details on demand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet The Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-[#D3FD50] mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-[#D3FD50] p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Users className="w-12 h-12 text-[#D3FD50]" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Sébas Roy</h3>
              <p className="text-gray-400">Associate Creative Director</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-[#D3FD50] p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Users className="w-12 h-12 text-[#D3FD50]" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Alex Chen</h3>
              <p className="text-gray-400">Lead AI Engineer</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-[#D3FD50] p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Users className="w-12 h-12 text-[#D3FD50]" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Jordan Miller</h3>
              <p className="text-gray-400">Head of Nutrition Science</p>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center pt-10 border-t border-gray-800">
          <p className="text-gray-600 text-sm">
            Built for ENCODE 2026.
          </p>
        </div>
      </main>
    </div>
  );
}