import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, RefreshCcw, Info, ArrowLeft, Shield, TrendingUp, AlertCircle } from "lucide-react";

export default function Result({ data, onReset }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // DESTRUCTURING THE NEW SCHEMA
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

  // ENHANCED LOGIC: Color Coding based on Recommendation
  const getStatusConfig = () => {
    const rec = buy_guidance.recommendation?.toLowerCase() || "";
    
    if (rec.includes("buy")) {
      return { 
        icon: CheckCircle2, 
        color: "text-emerald-400", 
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
        badgeColor: "bg-emerald-500/20 text-emerald-300",
        gradient: "from-emerald-500/20 to-emerald-600/10",
        glow: "shadow-emerald-500/20",
        alertLevel: "low",
        alertText: "Safe Choice"
      };
    }
    if (rec.includes("avoid") || rec.includes("skip")) {
      return { 
        icon: XCircle, 
        color: "text-red-500", 
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        badgeColor: "bg-red-500/20 text-red-300",
        gradient: "from-red-500/20 to-red-600/10",
        glow: "shadow-red-500/20",
        alertLevel: "high",
        alertText: "Avoid"
      };
    }
    // Default / Caution - Using orange instead of yellow
    return { 
      icon: AlertCircle, 
      color: "text-orange-400", 
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      badgeColor: "bg-orange-500/20 text-orange-300",
      gradient: "from-orange-500/20 to-orange-600/10",
      glow: "shadow-orange-500/20",
      alertLevel: "medium",
      alertText: "Use Caution"
    };
  };

  const status = getStatusConfig();
  const StatusIcon = status.icon;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700 px-4 md:px-0">
      
      {/* Enhanced Back Button */}
      <button
        onClick={onReset}
        className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors duration-300 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className={isMobile ? "text-sm" : ""}>Scan Another Product</span>
      </button>
      
      {/* LAYER 1: THE QUICK RESULT CARD */}
      <div className={`rounded-3xl border ${status.borderColor} bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl ${status.glow}`}>
        
        {/* HEADER: The Verdict */}
        <div className={`relative p-6 md:p-8 border-b ${status.borderColor} bg-gradient-to-br ${status.gradient}`}>
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />
          
          {/* Alert Level Badge */}
          <div className="absolute top-4 right-4">
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status.badgeColor} flex items-center gap-1`}>
              <div className={`w-2 h-2 rounded-full ${status.alertLevel === 'high' ? 'bg-red-400' : status.alertLevel === 'medium' ? 'bg-orange-400' : 'bg-emerald-400'} animate-pulse`} />
              <span className={isMobile ? "hidden" : ""}>{status.alertText}</span>
            </div>
          </div>
          
          <div className="relative flex items-start gap-4 md:gap-6">
            <div className={`p-3 md:p-4 rounded-2xl ${status.badgeColor} shadow-lg`}>
              <StatusIcon className={`w-6 h-6 md:w-8 md:h-8`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 md:mb-4`}>
                {headline}
              </h2>
              
              {/* Enhanced Metadata Tags */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <span className={`text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg ${status.badgeColor}`}>
                  {buy_guidance.recommendation || "ANALYSIS"}
                </span>
                <span className="text-xs md:text-sm text-gray-300 flex items-center gap-2">
                  <Info size={isMobile ? 14 : 16} /> Confidence: <span className="text-white font-medium">{decision_confidence}</span>
                </span>
                <span className="text-xs md:text-sm text-gray-300 flex items-center gap-2">
                  <Shield size={isMobile ? 14 : 16} /> <span className="text-white font-medium">AI Verified</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BODY: The Summary Points */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <TrendingUp className={`w-4 h-4 md:w-5 md:h-5 text-[#bfff00]`} />
            <h3 className={`text-lg md:text-xl font-semibold text-white`}>Key Findings</h3>
          </div>
          <ul className="space-y-3 md:space-y-5">
            {summary_points.map((point, i) => (
              <li key={i} className={`flex items-start gap-3 md:gap-4 text-gray-300 ${isMobile ? "text-sm leading-relaxed" : "text-lg leading-relaxed"}`}>
                <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${status.color}`} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER: Toggle Details */}
        <div className="p-6 md:p-8 bg-black/20 border-t border-gray-800/50">
          {!showDetails ? (
            <button 
              onClick={() => setShowDetails(true)}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-[#bfff00]/10 to-[#D3FD50]/10 hover:from-[#bfff00]/20 hover:to-[#D3FD50]/20 border border-[#bfff00]/20 hover:border-[#bfff00]/40 text-white rounded-2xl text-base md:text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              See detailed analysis 
              <ChevronDown size={isMobile ? 18 : 20} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          ) : (
            // LAYER 2: DEEP DIVE (Revealed)
            <div className="pt-2 animate-in fade-in space-y-6 md:space-y-8">
               
               {/* Section A: Intent */}
               <div className="p-4 md:p-6 rounded-2xl bg-[#bfff00]/5 border border-[#bfff00]/10">
                 <h3 className="text-sm font-bold text-[#bfff00] uppercase tracking-widest mb-3">Inferred Intent</h3>
                 <p className={`${isMobile ? "text-base" : "text-lg"} text-gray-300 italic`}>"{inferred_intent}"</p>
               </div>

               {/* Section B: Key Ingredients */}
               <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 md:w-5 md:h-5 text-[#bfff00]`} />
                    <h3 className={`text-base md:text-lg font-bold text-white uppercase tracking-wider`}>Key Drivers</h3>
                  </div>
                  {key_ingredients_that_matter.map((ing, i) => (
                    <div key={i} className="p-4 md:p-6 rounded-2xl bg-black/40 border border-gray-800 hover:border-[#bfff00]/30 transition-all duration-300">
                      <div className="flex justify-between items-center mb-3">
                        <span className={`text-base md:text-xl font-semibold text-white`}>{ing.name}</span>
                        <span className={`text-xs md:text-sm font-bold px-3 py-1 rounded-lg border 
                          ${ing.risk_level?.toLowerCase().includes('high') 
                            ? 'border-red-500/30 text-red-400 bg-red-500/10' 
                            : ing.risk_level?.toLowerCase().includes('med') 
                              ? 'border-orange-500/30 text-orange-400 bg-orange-500/10' 
                              : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'}`}>
                          {ing.risk_level?.toUpperCase()}
                        </span>
                      </div>
                      <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : ""}`}>{ing.reason}</p>
                    </div>
                  ))}
               </div>

               {/* Section C: Trade-offs & Science */}
               <div className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "md:grid-cols-2"}`}>
                 <div className="p-4 md:p-6 rounded-2xl bg-black/40 border border-gray-800">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">The Trade-off</h3>
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : ""}`}>{tradeoffs_and_context}</p>
                 </div>
                 <div className="p-4 md:p-6 rounded-2xl bg-black/40 border border-gray-800">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Scientific Consensus</h3>
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : ""}`}>{uncertainty_and_limits}</p>
                 </div>
               </div>

            </div>
          )}
        </div>
      </div>

      {/* New Scan Another Product Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="group relative px-8 py-4 bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold rounded-2xl shadow-lg hover:shadow-[#bfff00]/25 transition-all duration-300 flex items-center gap-3 text-lg"
        >
          <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Scan Another Product
        </button>
      </div>

    </div>
  );
}