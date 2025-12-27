import { useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, RefreshCcw, Info } from "lucide-react";

export default function Result({ data, onReset }) {
  const [showDetails, setShowDetails] = useState(false);
  
  // ⚡ DESTRUCTURING THE NEW SCHEMA
  // We handle potential missing data safely with default empty objects
  const { quick_result = {}, detailed_analysis = {} } = data;
  
  const { 
    headline, 
    decision_confidence, 
    summary_points = [], 
    buy_guidance = {} 
  } = quick_result;

  const {
    inferred_intent,
    key_ingredients_that_matter = [],
    tradeoffs_and_context,
    uncertainty_and_limits
  } = detailed_analysis;

  // --- LOGIC: Color Coding based on Recommendation ---
  const getStatusConfig = () => {
    // Normalize to lowercase to be safe
    const rec = buy_guidance.recommendation?.toLowerCase() || "";
    
    if (rec.includes("buy")) {
      return { 
        icon: CheckCircle2, 
        color: "text-emerald-400", 
        border: "border-emerald-500/20", 
        bg: "bg-emerald-500/10",
        badge: "bg-emerald-500/20 text-emerald-300"
      };
    }
    if (rec.includes("avoid") || rec.includes("skip")) {
      return { 
        icon: XCircle, 
        color: "text-rose-400", 
        border: "border-rose-500/20", 
        bg: "bg-rose-500/10",
        badge: "bg-rose-500/20 text-rose-300"
      };
    }
    // Default / Caution
    return { 
      icon: AlertTriangle, 
      color: "text-amber-400", 
      border: "border-amber-500/20", 
      bg: "bg-amber-500/10",
      badge: "bg-amber-500/20 text-amber-300"
    };
  };

  const status = getStatusConfig();
  const StatusIcon = status.icon;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* 🟢 LAYER 1: THE QUICK RESULT CARD */}
      <div className={`rounded-3xl border ${status.border} bg-slate-900/50 overflow-hidden shadow-2xl`}>
        
        {/* HEADER: The Verdict */}
        <div className={`p-6 border-b ${status.border} ${status.bg} flex items-start gap-4`}>
          <div className={`p-3 rounded-full ${status.badge} shrink-0`}>
            <StatusIcon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 leading-tight mb-2">
              {headline}
            </h2>
            
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${status.badge}`}>
                {buy_guidance.recommendation || "ANALYSIS"}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Info size={12} /> Confidence: <span className="text-slate-200">{decision_confidence}</span>
              </span>
            </div>
          </div>
        </div>

        {/* BODY: The 6-8 Summary Bullets */}
        <div className="p-6 bg-slate-900/40">
          <ul className="space-y-4">
            {summary_points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm md:text-base leading-relaxed">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${status.color} shrink-0`} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER: Toggle Details */}
        <div className="p-4 bg-slate-950/30 border-t border-slate-800/50">
          {!showDetails ? (
            <button 
              onClick={() => setShowDetails(true)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 group"
            >
              See detailed analysis 
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          ) : (
            // 🟡 LAYER 2: DEEP DIVE (Revealed)
            <div className="pt-2 animate-in fade-in space-y-8">
               
               {/* Section A: Intent */}
               <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                 <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Inferred Intent</h3>
                 <p className="text-sm text-slate-300 italic">"{inferred_intent}"</p>
               </div>

               {/* Section B: Key Ingredients */}
               <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Key Drivers</h3>
                  {key_ingredients_that_matter.map((ing, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-slate-200">{ing.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border 
                          ${ing.risk_level?.toLowerCase().includes('high') ? 'border-rose-500/30 text-rose-400 bg-rose-500/10' : 
                            ing.risk_level?.toLowerCase().includes('med') ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' : 
                            'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'}`}>
                          {ing.risk_level?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{ing.reason}</p>
                    </div>
                  ))}
               </div>

               {/* Section C: Trade-offs & Science */}
               <div className="grid gap-4 md:grid-cols-2">
                 <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-800">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">The Trade-off</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{tradeoffs_and_context}</p>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-800">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Scientific Consensus</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{uncertainty_and_limits}</p>
                 </div>
               </div>

            </div>
          )}
        </div>
      </div>

      {/* RESET ACTION */}
      <button 
        onClick={onReset}
        className="w-full py-4 text-slate-500 hover:text-white flex items-center justify-center gap-2 transition-colors opacity-70 hover:opacity-100"
      >
        <RefreshCcw size={16} /> Scan Another Product
      </button>

    </div>
  );
}