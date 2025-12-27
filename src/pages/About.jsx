import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <NavBar />
      
      <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 border-l-2 border-blue-500 pl-6">
          <h1 className="text-5xl font-bold text-white mb-6">
            The Truth Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              The Label.
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
            Food marketing is designed to confuse. We built Tattva to cut through the noise and reveal the essence of what you eat.
          </p>
        </div>

        {/* The Problem Section */}
        <section className="mb-20 space-y-8">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
            <span className="w-8 h-[1px] bg-slate-600"></span>
            The Problem
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-blue-400 font-bold mb-2">The Information Gap</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Labels are optimized for regulatory compliance, not human understanding. "E471" tells you nothing about its effect on your gut health.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-blue-400 font-bold mb-2">Cognitive Overload</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Making healthy decisions requires memorizing hundreds of additives. That's cognitive work an AI should do for you.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-slate-600"></span>
            The Tattva Philosophy
          </h2>
          
          <div className="space-y-6">
            <p className="text-lg text-slate-300">
              <strong className="text-white">AI as the Interface.</strong> We don't just act as a database lookup. Tattva acts as a reasoning engine.
            </p>
            
            <ul className="space-y-4 ml-4">
              <li className="flex items-start gap-4 text-slate-400">
                <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                <span>It <strong>infers intent</strong>. Are you looking for allergens? Or just general health?</span>
              </li>
              <li className="flex items-start gap-4 text-slate-400">
                <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                <span>It <strong>reasons under uncertainty</strong>. If science is mixed, we tell you. We don't fake certainty.</span>
              </li>
              <li className="flex items-start gap-4 text-slate-400">
                <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                <span>It <strong>respects your time</strong>. Conclusion first. Details on demand.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center pt-10 border-t border-slate-800">
          <p className="text-slate-600 text-sm">
            Built for ENCODE 2026.
          </p>
        </div>

      </main>
    </div>
  );
}