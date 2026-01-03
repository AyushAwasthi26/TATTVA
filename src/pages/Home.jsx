import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Thinking from "../components/Thinking";
import Result from "../components/Result";
import { analyzeWithTattva } from "../api/gemini";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [status, setStatus] = useState("IDLE"); // 'IDLE' | 'THINKING' | 'RESULT'
  const [resultData, setResultData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger initial animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalyze = async (data, type) => {
    setStatus("THINKING");
    try {
      const response = await analyzeWithTattva(data, type);
      setResultData(response);
      setStatus("RESULT");
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Try again.");
      setStatus("IDLE");
    }
  };

  const handleReset = () => {
    setStatus("IDLE");
    setResultData(null);
  };

  return (
    <div className={`min-h-screen bg-black text-white font-sans flex flex-col relative overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      <Navbar onReset={handleReset} />

      {/* Enhanced Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Multiple Gradient Layers for Depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-[#bfff00]/5 to-transparent rounded-full blur-[120px]" />
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px),
                           linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating Particles Effect */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#bfff00]/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: "0s", animationDuration: "4s" }} />
          <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-green-500/20 rounded-full blur-md animate-pulse" style={{ animationDelay: "1s", animationDuration: "5s" }} />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-emerald-500/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: "2s", animationDuration: "3.5s" }} />
          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-[#bfff00]/20 rounded-full blur-md animate-pulse" style={{ animationDelay: "1.5s", animationDuration: "6s" }} />
        </div>
        
        {/* Enhanced Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#bfff00]/10 to-transparent animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 z-10 flex flex-col justify-center pb-8 md:pb-12 pt-20 md:pt-52">
        
        {/* 1. IDLE STATE: Hero + Input */}
        {status === "IDLE" && (
          <div className={`animate-fade-in-up space-y-8 md:space-y-16 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}>
            <div className="text-center space-y-6 md:space-y-8">
              {/* Icon with enhanced glow effect */}
              {/* <div className="inline-flex p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-[#bfff00]/20 shadow-2xl hover:shadow-[#bfff00]/10 transition-all duration-500 hover:scale-105">
                <Sparkles className="w-8 h-8 text-[#bfff00]" />
              </div> */}
              
              <div className="space-y-4">
                {/* Desktop: One line heading, Mobile: Stacked with smaller font */}
                <h1 className="hidden md:block text-5xl lg:text-6xl font-bold tracking-tight leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                    Reveal the
                  </span>
                  <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-b from-[#bfff00] to-green-600">
                    Reality.
                  </span>
                </h1>
                
                <h1 className="md:hidden text-4xl sm:text-4xl font-bold tracking-tight leading-tight">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                    Reveal the
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#bfff00] to-green-600">
                    Reality.
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                  AI-native reasoning for your food labels.
                </p>
              </div>
            </div>
            
            <div className="w-full max-w-4xl mx-auto px-4">
              <Input onAnalyze={handleAnalyze} />
            </div>
            
            {/* Enhanced Feature Pills with better spacing and effects */}
            <div className="flex flex-wrap justify-center gap-3 pt-4 px-4">
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00]/20 text-sm text-gray-300 shadow-lg hover:shadow-[#bfff00]/10 transition-all duration-300 hover:scale-105">
                Instant Analysis
              </div>
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00]/20 text-sm text-gray-300 shadow-lg hover:shadow-[#bfff00]/10 transition-all duration-300 hover:scale-105">
                Science-Backed
              </div>
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00]/20 text-sm text-gray-300 shadow-lg hover:shadow-[#bfff00]/10 transition-all duration-300 hover:scale-105">
                Privacy First
              </div>
            </div>
          </div>
        )}

        {/* 2. THINKING STATE */}
        {status === "THINKING" && <Thinking />}

        {/* 3. RESULT STATE */}
        {status === "RESULT" && resultData && (
          <Result data={resultData} onReset={handleReset} />
        )}

      </main>
    </div>
  );
}