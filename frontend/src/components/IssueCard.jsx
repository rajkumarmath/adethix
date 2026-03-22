export default function IssueCard({ issue }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-slate-500/50 hover:bg-slate-800/60 transition-all shadow-lg">
      <div className="flex items-center mb-3">
        <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
          {issue.type}
        </span>
      </div>
      <div className="mb-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Flagged Phrase</h4>
        <p className="text-slate-200 font-medium bg-slate-900/60 p-3 rounded-lg border border-white/5 font-serif italic">
          "{issue.text}"
        </p>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Explanation</h4>
        <p className="text-slate-300 text-sm leading-relaxed">{issue.explanation}</p>
      </div>
    </div>
  );
}
