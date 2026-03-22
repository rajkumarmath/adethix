import { useState } from 'react';

export default function InputPanel({ onAnalyze, isLoading }) {
  const [activeTab, setActiveTab] = useState('text'); // 'text' or 'pdf'
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'text' && text.trim()) onAnalyze({ type: 'text', data: text });
    if (activeTab === 'pdf' && file) onAnalyze({ type: 'pdf', data: file });
  };

  return (
    <div className="glass-panel p-8">
      <div className="flex space-x-6 mb-8 border-b border-white/10 pb-2">
        <button
          className={`pb-3 px-2 text-lg font-semibold transition-colors ${activeTab === 'text' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
          onClick={() => { setActiveTab('text'); setFile(null); }}
          type="button"
        >
          Text Input
        </button>
        <button
          className={`pb-3 px-2 text-lg font-semibold transition-colors ${activeTab === 'pdf' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
          onClick={() => { setActiveTab('pdf'); setText(''); }}
          type="button"
        >
          PDF Upload
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'text' ? (
          <div>
            <textarea
              className="glass-input h-56 mb-6 resize-none"
              placeholder="Paste your marketing content, email draft, or product description here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-600/50 rounded-2xl p-10 text-center hover:border-indigo-400/50 transition-colors bg-slate-800/20 mb-6">
            <input
              type="file"
              accept=".pdf"
              id="file-upload"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <div className="p-4 bg-slate-800/50 rounded-full mb-4 ring-1 ring-white/10">
                <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-slate-200 text-lg font-medium">{file ? file.name : 'Click to select a PDF document'}</span>
              <span className="text-slate-500 text-sm mt-2">Maximum file size 10MB</span>
            </label>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isLoading || (activeTab === 'text' && !text.trim()) || (activeTab === 'pdf' && !file)}
          className="primary-btn w-full flex justify-center items-center text-lg shadow-indigo-500/20"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </form>
    </div>
  );
}
