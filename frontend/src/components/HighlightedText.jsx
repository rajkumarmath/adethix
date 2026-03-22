export default function HighlightedText({ originalText, issues }) {
  if (!originalText || !issues || issues.length === 0) {
    return (
      <div className="glass-panel p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-slate-100">Analyzed Text</h2>
        <p className="text-slate-300 whitespace-pre-wrap">{originalText}</p>
      </div>
    );
  }

  let highlighted = originalText;
  
  const sortedIssues = [...issues].sort((a, b) => b.text.length - a.text.length);
  
  sortedIssues.forEach((issue, index) => {
    const marker = `__MARKER_${index}__`;
    highlighted = highlighted.split(issue.text).join(marker);
  });

  sortedIssues.forEach((issue, index) => {
    const marker = `__MARKER_${index}__`;
    highlighted = highlighted.split(marker).join(`<mark title="${issue.type}: ${issue.explanation}">${issue.text}</mark>`);
  });

  return (
    <div className="glass-panel p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-slate-100 flex items-center">
        <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Source Content
      </h2>
      <div 
        className="text-slate-300 whitespace-pre-wrap leading-relaxed p-5 bg-slate-950/50 rounded-xl border border-white/5 shadow-inner"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}
