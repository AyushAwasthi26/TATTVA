import { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Thinking from "../components/Thinking";
import Result from "../components/Result";
import { analyzeWithTattva } from "../api/gemini";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [status, setStatus] = useState("IDLE"); // 'IDLE' | 'THINKING' | 'RESULT'
  const [resultData, setResultData] = useState(null);

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
    <div className="min-h-screen bg-black text-white font-sans flex flex-col relative overflow-hidden">
      
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
        
        {/* Subtle Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 z-10 flex flex-col justify-center pb-12 pt-50">
        
        {/* 1. IDLE STATE: Hero + Input */}
        {status === "IDLE" && (
          <div className="animate-fade-in-up space-y-16">
            <div className="text-center space-y-8">
              {/* <div className="inline-flex p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-green-500/20 shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:scale-105">
                <Sparkles className="w-8 h-8 text-[#bfff00]" />
              </div> */}
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight space-x-5">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                    Reveal the
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#bfff00] to-green-600">
                    Reality.
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                  AI-native reasoning for your food labels.
                </p>
              </div>
            </div>
            
            <Input onAnalyze={handleAnalyze} />
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00] text-sm text-gray-300">
                Instant Analysis
              </div>
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00] text-sm text-gray-300">
                Science-Backed
              </div>
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#bfff00] text-sm text-gray-300">
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