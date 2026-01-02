import { useState, useEffect, useRef } from "react";
import { BrainCircuit, Loader2, Activity, Zap, Database, CheckCircle } from "lucide-react";

const MESSAGES = [
  { text: "Reading ingredients...", icon: <Database size={16} /> },
  { text: "Inferring intent...", icon: <BrainCircuit size={16} /> },
  { text: "Checking trade-offs...", icon: <Activity size={16} /> },
  { text: "Analyzing scientific consensus...", icon: <Zap size={16} /> },
  { text: "Formulating verdict...", icon: <CheckCircle size={16} /> }
];

const DETAILED_MESSAGES = [
  "Scanning ingredient database...",
  "Cross-referencing with health guidelines...",
  "Analyzing potential allergens...",
  "Evaluating nutritional trade-offs...",
  "Checking scientific research...",
  "Processing health impact...",
  "Generating personalized insights...",
  "Finalizing recommendations..."
];

export default function Thinking({ isComplete = false }) {
  const [index, setIndex] = useState(0);
  const [detailedIndex, setDetailedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('initializing');
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const progressInterval = useRef(null);
  const messageInterval = useRef(null);
  const detailedMessageInterval = useRef(null);

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Only run animations if not complete
    if (!isComplete) {
      // Start with initial message
      const messageTimer = setTimeout(() => {
        setIndex(1);
        setProcessingStage('analyzing');
      }, 800);
      
      // Simulate progress based on actual processing time
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) { // Stop at 95% to show we're almost done
            clearInterval(progressInterval.current);
            setProcessingStage('finalizing');
            return 95;
          }
          return prev + Math.random() * 3 + 1; // Variable progress speed
        });
      }, 200);
      
      // Change messages based on progress milestones
      messageInterval.current = setInterval(() => {
        setIndex(prev => {
          if (prev >= MESSAGES.length - 1) return prev;
          return prev + 1;
        });
      }, 3000);
      
      // Change detailed messages more frequently
      detailedMessageInterval.current = setInterval(() => {
        setDetailedIndex(prev => {
          if (prev >= DETAILED_MESSAGES.length - 1) return 0;
          return prev + 1;
        });
      }, 1500);
      
      return () => {
        clearTimeout(messageTimer);
        clearInterval(progressInterval.current);
        clearInterval(messageInterval.current);
        clearInterval(detailedMessageInterval.current);
      };
    } else {
      // When complete, set progress to 100%
      setProgress(100);
      setProcessingStage('complete');
      // Clear all intervals
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (messageInterval.current) clearInterval(messageInterval.current);
      if (detailedMessageInterval.current) clearInterval(detailedMessageInterval.current);
    }
  }, [isComplete]);

  const getProcessingColor = () => {
    if (isComplete) return '#D3FD50';
    if (progress > 75) return '#bfff00';
    if (progress > 50) return '#9fe500';
    if (progress > 25) return '#7fcc00';
    return '#5fb300';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full space-y-8" ref={containerRef}>
      
      {/* Enhanced Animated Icon Container */}
      <div className="relative">
        {/* Outer Glow Ring */}
        <div 
          className={`absolute inset-0 blur-xl rounded-full transition-all duration-1000`}
          style={{
            backgroundColor: `${getProcessingColor()}${isComplete ? '50' : '30'}`,
            transform: `scale(${isComplete ? 1.2 : 1})`
          }}
        />
        
        {/* Middle Ring */}
        <div 
          className={`absolute inset-0 blur-lg rounded-full scale-75 transition-all duration-1000 ${isComplete ? '' : 'animate-ping'}`}
          style={{
            backgroundColor: `${getProcessingColor()}${isComplete ? '40' : '20'}`,
          }}
        />
        
        {/* Icon Container */}
        <div className="relative bg-black/60 backdrop-blur-xl p-8 rounded-3xl border transition-all duration-1000 shadow-2xl"
          style={{
            borderColor: `${getProcessingColor()}40`,
            transform: `scale(${isComplete ? 1.05 : 1})`
          }}
        >
          <BrainCircuit 
            className={`w-20 h-20 transition-all duration-1000`}
            style={{ color: getProcessingColor() }}
          />
        </div>
        
        {/* Enhanced Rotating Particles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 relative">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className={`absolute rounded-full transition-all duration-1000`}
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: getProcessingColor(),
                  top: '0',
                  left: '50%',
                  transform: `translateX(-50%) rotate(${isComplete ? 0 : (Date.now() / 20) % 360}deg) translateY(-70px)`,
                  opacity: isComplete ? 0.8 : 0.6,
                  animation: isComplete ? 'none' : `pulse ${particle.duration}s infinite`,
                  animationDelay: `${particle.delay}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <div className="flex items-center justify-center gap-2">
          {MESSAGES[index].icon}
          <h2 className="text-3xl font-bold text-white transition-all duration-500">
            {MESSAGES[index].text}
          </h2>
        </div>
        
        <div className="text-gray-400 flex items-center justify-center gap-2 text-lg">
          <Loader2 
            className={`w-5 h-5 transition-all duration-500`}
            style={{
              color: getProcessingColor(),
              animation: isComplete ? 'none' : 'spin 1s linear infinite'
            }}
          />
          <span className="transition-all duration-500">
            {isComplete ? 'Analysis complete' : 
              processingStage === 'initializing' ? 'Initializing...' :
              processingStage === 'analyzing' ? 'Analyzing...' :
              'Finalizing...'}
          </span>
        </div>
        
        {/* Detailed Status */}
        <div className="text-sm text-gray-500 italic transition-all duration-500">
          {DETAILED_MESSAGES[detailedIndex]}
        </div>
      </div>
      
      {/* Enhanced Progress Bar */}
      <div className="w-full max-w-md">
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${getProcessingColor()} 0%, ${isComplete ? '#D3FD50' : '#bfff00'} 100%)`
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-600">Analyzing</span>
          <span className="text-xs font-medium" style={{ color: getProcessingColor() }}>
            {Math.round(progress)}%
          </span>
          <span className="text-xs text-gray-600">Complete</span>
        </div>
      </div>
      
      {/* Additional Context */}
      <div className="text-center max-w-md space-y-2">
        <p className="text-gray-500 text-sm">
          Our AI is cross-referencing scientific databases and health guidelines to provide you with accurate insights.
        </p>
        {isComplete && (
          <div className="flex items-center justify-center gap-2 text-green-400 animate-fade-in">
            <CheckCircle size={16} />
            <span className="text-sm">Analysis complete! Loading results...</span>
          </div>
        )}
      </div>
    </div>
  );
}