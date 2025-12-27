import { useState, useEffect } from "react";
import { BrainCircuit, Loader2 } from "lucide-react";

const MESSAGES = [
  "Reading ingredients...",
  "Inferring intent...",
  "Checking trade-offs...",
  "Analyzing scientific consensus...",
  "Formulating verdict..."
];

export default function Thinking() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1200); // Change text every 1.2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full space-y-6 animate-pulse">
      
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full" />
        <div className="relative bg-slate-900 p-4 rounded-2xl border border-slate-700/50">
          <BrainCircuit className="w-10 h-10 text-blue-400" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl font-medium text-slate-200">
          {MESSAGES[index]}
        </h2>
        <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-3 h-3 animate-spin" />
          Thinking
        </p>
      </div>
    </div>
  );
}