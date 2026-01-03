import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ onReset }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Handle logo click to reset and navigate home
  const handleLogoClick = () => {
    // If onReset function is provided, call it to reset state
    if (onReset) {
      onReset();
    }
    
    // Navigate to home page
    navigate("/");
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/70 shadow-lg" 
        : "bg-black/40 backdrop-blur-md border-b border-gray-800/30"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          
          {/* LEFT: Logo + Brand */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-3 group"
            aria-label="Tattva Home"
          >
            {/* Logo */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-[#bfff00]/20 rounded-full blur-md group-hover:bg-[#bfff00]/30 transition-colors duration-300" />
              
              {/* Logo container */}
              <div className="relative w-10 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                {/* The 5 "Tattvas" (Elements) represented as squares */}
                <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#bfff00] rounded-sm -translate-y-3 sm:-translate-y-3 group-hover:animate-pulse"></div> {/* Top */}
                <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#bfff00] rounded-sm translate-x-2 sm:translate-x-3 -translate-y-1 group-hover:animate-pulse" style={{ animationDelay: "0.1s" }}></div> {/* Right Top */}
                <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#bfff00] rounded-sm translate-x-1.5 sm:translate-x-2 translate-y-2 sm:translate-y-3 group-hover:animate-pulse" style={{ animationDelay: "0.2s" }}></div> {/* Right Bottom */}
                <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#bfff00] rounded-sm -translate-x-1.5 sm:-translate-x-2 translate-y-2 sm:translate-y-3 group-hover:animate-pulse" style={{ animationDelay: "0.3s" }}></div> {/* Left Bottom */}
                <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#bfff00] rounded-sm -translate-x-2 sm:-translate-x-3 -translate-y-1 group-hover:animate-pulse" style={{ animationDelay: "0.4s" }}></div> {/* Left Top */}
                
                {/* Center Glow */}
                <div className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(191,255,0,0.8)]"></div>
              </div>
            </div>
            
            <span className="text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-[#bfff00] transition-colors duration-300">
              TATTVA
            </span>
          </button>

          {/* RIGHT: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-base lg:text-lg font-medium transition-all duration-300 py-1 ${
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
          </div>

          {/* RIGHT: Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#bfff00]" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? "max-h-80" : "max-h-0"
      }`}>
        <div className="bg-black/90 backdrop-blur-xl border-t border-gray-800/50">
          <nav className="px-4 sm:px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block text-base sm:text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                  location.pathname === link.to
                    ? "text-[#bfff00] bg-[#bfff00]/10"
                    : "text-gray-400 hover:text-[#bfff00] hover:bg-gray-800/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
}