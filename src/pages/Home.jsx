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
    <div className="min-h-screen bg-black text-slate-100 font-sans flex flex-col relative overflow-hidden">
      
      <Navbar />

      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] -z-0 pointer-events-none" />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 z-10 flex flex-col justify-center pb-20 pt-20">
        
        {/* 1. IDLE STATE: Hero + Input */}
        {status === "IDLE" && (
          <div className="animate-fade-in-up space-y-10">
            <div className="text-center space-y-6">
              <div className="inline-flex p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                Reveal the Reality.
              </h1>
              <p className="text-slate-400 text-lg">
                AI-native reasoning for your food labels.
              </p>
            </div>
            
            <Input onAnalyze={handleAnalyze} />
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