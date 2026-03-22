export default function BiasScore({ score }) {
  let color = 'bg-emerald-500';
  let text = 'Low Risk';
  if (score > 30) { color = 'bg-amber-500'; text = 'Moderate Risk'; }
  if (score > 70) { color = 'bg-rose-500'; text = 'High Risk'; }

  return (
    <div className="glass-panel p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-100">Bias Risk Score</h2>
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold bg-slate-800/80 shadow-inner ${color.replace('bg-', 'text-')}`}>
          {text} ({score}/100)
        </span>
      </div>
      <div className="w-full bg-slate-800/80 rounded-full h-5 overflow-hidden border border-white/5 shadow-inner">
        <div className={`h-5 rounded-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}
