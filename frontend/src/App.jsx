import { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ResultsDashboard from './components/ResultsDashboard';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [originalText, setOriginalText] = useState('');
  const [error, setError] = useState(null);

  const handleAnalyze = async ({ type, data }) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    try {
      let response;
      if (type === 'text') {
        setOriginalText(data);
        response = await fetch(`${API_BASE_URL}/analyze-text`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: data })
        });
      } else if (type === 'pdf') {
        setOriginalText(`Analyzed document: ${data.name}\n\nCheck highlights and score below.`);
        const formData = new FormData();
        formData.append('file', data);
        response = await fetch(`${API_BASE_URL}/analyze-pdf`, {
          method: 'POST',
          body: formData
        });
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Analysis failed. Please try again.');
      }
      
      const responseData = await response.json();
      setResults(responseData);
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while connecting to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-200 p-4 rounded-xl mb-6 flex items-center shadow-lg animate-in slide-in-from-top-2">
            <svg className="w-6 h-6 mr-3 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        <InputPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
        
        <ResultsDashboard results={results} originalText={originalText} />
      </div>
    </div>
  );
}
