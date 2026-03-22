import BiasScore from './BiasScore';
import IssueCard from './IssueCard';
import HighlightedText from './HighlightedText';
import SuggestedRewrite from './SuggestedRewrite';

export default function ResultsDashboard({ results, originalText }) {
  if (!results) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out mt-8">
      <BiasScore score={results.bias_score} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <HighlightedText originalText={originalText} issues={results.issues} />
          <SuggestedRewrite rewrite={results.suggested_rewrite} />
        </div>
        
        <div className="glass-panel p-6 h-fit bg-slate-900/60 flex flex-col max-h-[850px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-slate-100 flex items-center">
              <svg className="w-5 h-5 mr-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Detected Issues
            </h2>
            <span className="bg-rose-500/20 text-rose-300 font-bold px-3 py-1 rounded-full text-sm">
              {results.issues?.length || 0} Found
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-2">
            {results.issues && results.issues.length > 0 ? (
              results.issues.map((issue, idx) => (
                <IssueCard key={idx} issue={issue} />
              ))
            ) : (
              <div className="text-center p-10 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700 mt-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-300 font-medium text-lg">Clean Content</p>
                <p className="text-slate-500 text-sm mt-1">No significant bias issues detected.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
