export default function SuggestedRewrite({ rewrite }) {
  if (!rewrite) return null;
  
  return (
    <div className="glass-panel p-6 border-indigo-500/30 bg-indigo-900/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-indigo-400">
          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <h2 className="text-xl font-bold">Inclusive Rewrite</h2>
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(rewrite)}
          className="text-slate-400 hover:text-indigo-400 bg-slate-800/50 hover:bg-slate-800 p-2 rounded-lg transition-all"
          title="Copy to clipboard"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <div className="bg-slate-900/80 p-5 rounded-xl border border-indigo-500/20 shadow-inner relative z-10">
        <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{rewrite}</p>
      </div>
    </div>
  );
}
