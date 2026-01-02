import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/70 shadow-lg" 
        : "bg-black/40 backdrop-blur-md border-b border-gray-800/30"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* LEFT: Logo + Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            aria-label="Tattva Home"
          >
            {/* Logo */}
            <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-[#bfff00]/20 rounded-full blur-md group-hover:bg-[#bfff00]/30 transition-colors duration-300" />
              
              {/* Logo container */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* The 5 "Tattvas" (Elements) represented as squares */}
                <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm -translate-y-3 group-hover:animate-pulse"></div> {/* Top */}
                <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm translate-x-3 -translate-y-1 group-hover:animate-pulse" style={{ animationDelay: "0.1s" }}></div> {/* Right Top */}
                <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm translate-x-2 translate-y-3 group-hover:animate-pulse" style={{ animationDelay: "0.2s" }}></div> {/* Right Bottom */}
                <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm -translate-x-2 translate-y-3 group-hover:animate-pulse" style={{ animationDelay: "0.3s" }}></div> {/* Left Bottom */}
                <div className="absolute w-2.5 h-2.5 bg-[#bfff00] rounded-sm -translate-x-3 -translate-y-1 group-hover:animate-pulse" style={{ animationDelay: "0.4s" }}></div> {/* Left Top */}
                
                {/* Center Glow */}
                <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(191,255,0,0.8)]"></div>
              </div>
            </div>
            
            <span className="text-xl font-bold tracking-wider text-white group-hover:text-[#bfff00] transition-colors duration-300">
              TATTVA
            </span>
          </Link>

          {/* RIGHT: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-lg font-medium transition-all duration-300 py-1 ${
                  location.pathname === link.to
                    ? "text-[#bfff00]"
                    : "text-gray-400 hover:text-[#bfff00]"
                }`}
              >
                {link.label}
                {/* Active indicator */}
                {location.pathname === link.to && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#bfff00] rounded-full"></span>
                )}
              </Link>
            ))}
            
            {/* CTA Button - Matching Home/About Gradient */}
            {/* <Link
              to="/"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold shadow-lg hover:shadow-[#bfff00]/25 transition-all duration-300 flex items-center gap-2 group hover:scale-105"
            >
              <Sparkles size={16} className="group-hover:animate-pulse" />
              Try Now
            </Link> */}
          </div>

          {/* RIGHT: Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#bfff00]" /> : <Menu className="w-6 h-6 text-gray-400" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? "max-h-80" : "max-h-0"
      }`}>
        <div className="bg-black/90 backdrop-blur-xl border-t border-gray-800/50">
          <nav className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                  location.pathname === link.to
                    ? "text-[#bfff00] bg-[#bfff00]/10"
                    : "text-gray-400 hover:text-[#bfff00] hover:bg-gray-800/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile CTA Button - Matching Home/About Gradient */}
            {/* <Link
              to="/"
              className="block w-full mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold hover:shadow-lg hover:shadow-[#bfff00]/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              Try Now
            </Link> */}
          </nav>
        </div>
      </div>
    </nav>
  );
}