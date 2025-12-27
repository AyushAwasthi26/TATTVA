import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black backdrop-blur-md border-b border-white/5">
      
      {/* LEFT: Logo + Brand */}
      <Link to="/" className="flex items-center gap-4 group">
        
        {/* CSS-Only Logo: 5-Box Star Concept */} 
        <div className="relative w-8 h-8 hidden items-center justify-center group-hover:scale-110 transition-transform duration-500">
        {/* <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"> */} {/* uncomment it to see this logo */}
            {/* The 5 "Tattvas" (Elements) represented as squares */}
            <div className="absolute w-2 h-2 bg-blue-500 rounded-sm -translate-y-3"></div> {/* Top */}
            <div className="absolute w-2 h-2 bg-blue-500 rounded-sm translate-x-3 -translate-y-1"></div> {/* Right Top */}
            <div className="absolute w-2 h-2 bg-blue-500 rounded-sm translate-x-2 translate-y-3"></div> {/* Right Bottom */}
            <div className="absolute w-2 h-2 bg-blue-500 rounded-sm -translate-x-2 translate-y-3"></div> {/* Left Bottom */}
            <div className="absolute w-2 h-2 bg-blue-500 rounded-sm -translate-x-3 -translate-y-1"></div> {/* Left Top */}
            
            {/* Center Glow */}
            <div className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        </div>
        <img src="/logo.png" alt="Tattva Logo" className="w-10" />
        
        <span className="text-xl font-bold tracking-wider text-slate-100 group-hover:text-white transition-colors">
          TATTVA
        </span>
      </Link>

      {/* RIGHT: About Link */}
      <Link 
        to="/about" 
        className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors"
      >
        About
      </Link>

    </nav>
  );
}