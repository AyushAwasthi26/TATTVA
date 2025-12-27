import { useState, useRef } from "react";
import { Camera, ImageUp, ArrowRight } from "lucide-react";

export default function Input({ onAnalyze }) {
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) onAnalyze(text, 'text');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Send Base64 string (removing the "data:image..." prefix)
        onAnalyze(reader.result.split(',')[1], 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-end gap-2 bg-gray-900/80 border border-slate-700/50 p-3 rounded-3xl shadow-2xl focus-within:border-blue-500/50 transition-all"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />

        {/* LEFT: Action Buttons */}
        <div className="flex items-center gap-1 pb-1 pl-1">
          <button 
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-colors"
            title="Upload Image"
          >
            <ImageUp size={20} />
          </button>
          
          <button 
            type="button"
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-colors"
            title="Use Camera (Coming Soon)"
          >
            <Camera size={20} />
          </button>
        </div>

        {/* CENTER: Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Scan a label or paste ingredients..."
          className="w-full bg-transparent border-none text-slate-100 placeholder:text-slate-500 focus:ring-0 resize-none py-3 max-h-32 min-h-[50px] scrollbar-hide"
          rows={1}
        />

        {/* RIGHT: Submit Button */}
        <button 
          type="submit"
          disabled={!text.trim()}
          className={`p-2.5 rounded-full mb-1 transition-all ${
            text.trim() 
              ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg" 
              : "bg-slate-800 text-slate-600 cursor-not-allowed"
          }`}
        >
          <ArrowRight size={18} />
        </button>
      </form>

      <p className="text-center text-xs text-slate-600 mt-4">
        Tattva AI can make mistakes. Check important info.
      </p>
    </div>
  );
}