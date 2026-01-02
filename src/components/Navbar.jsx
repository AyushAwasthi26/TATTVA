import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-xl border-b border-gray-800/50">
      
      {/* LEFT: Logo + Brand */}
      <Link to="/" className="flex items-center gap-4 group">
        {/* Logo */}
        <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          {/* The 5 "Tattvas" (Elements) represented as squares */}
          <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm -translate-y-3"></div> {/* Top */}
          <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm translate-x-3 -translate-y-1"></div> {/* Right Top */}
          <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm translate-x-2 translate-y-3"></div> {/* Right Bottom */}
          <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm -translate-x-2 translate-y-3"></div> {/* Left Bottom */}
          <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm -translate-x-3 -translate-y-1"></div> {/* Left Top */}
          
          {/* Center Glow */}
          <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
        </div>
        
        <span className="text-xl font-bold tracking-wider text-white group-hover:text-[#bfff00] transition-colors duration-300">
          TATTVA
        </span>
      </Link>

      {/* RIGHT: Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link 
          to="/about" 
          className="text-lg font-medium text-gray-400 hover:text-[#bfff00] transition-colors duration-300"
        >
          About
        </Link>
        <Link 
          to="/" 
          className="text-lg font-medium text-gray-400 hover:text-[#bfff00] transition-colors duration-300"
        >
          Home
        </Link>
      </div>

      {/* RIGHT: Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-gray-800/50 px-6 py-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/about" 
              className="text-lg font-medium text-gray-400 hover:text-[#bfff00] transition-colors duration-300 py-2"
            >
              About
            </Link>
            <Link 
              to="/" 
              className="text-lg font-medium text-gray-400 hover:text-[#bfff00] transition-colors duration-300 py-2"
            >
              Home
            </Link>
          </nav>
        </div>
      )}
    </nav>
  );
}