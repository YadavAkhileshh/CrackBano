import React, { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';
import DashboardLayout from './layouts/DashboardLayout';

function ExplanationGenerator() {
  const [concept, setConcept] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('');

  const popularConcepts = [
    'React Hooks',
    'JavaScript Closures',
    'Python Decorators',
    'Machine Learning',
    'REST API',
    'Database Indexing',
    'Docker Containers',
    'Git Workflow'
  ];

  const handleExplain = async (conceptToExplain = concept) => {
    if (!conceptToExplain.trim()) {
      toast.error('Please enter a concept to explain');
      return;
    }

    setLoading(true);
    setExplanation('');
    setModel('');

    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        concept: conceptToExplain.trim()
      });

      if (response.success || response.explanation) {
        setExplanation(response.explanation || response.data?.explanation);
        setModel(response.model || response.data?.model);
        toast.success('Explanation generated successfully!');
      } else {
        throw new Error(response.message || response.data?.message || 'Failed to generate explanation');
      }
    } catch (error) {
      console.error('Explanation error:', error);
      toast.error(error.message || 'Failed to generate explanation');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickConcept = (selectedConcept) => {
    setConcept(selectedConcept);
    handleExplain(selectedConcept);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
          <span className="text-2xl">🧠</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Concept Explainer
        </h2>
        <p className="text-slate-300">Get detailed explanations powered by Cerebras AI</p>
      </div>

      {/* Input Section */}
      <div className="card-professional p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Enter a concept to explain:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g., React Hooks, Machine Learning, Docker..."
                className="flex-1 bg-slate-800/60 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
                onKeyPress={(e) => e.key === 'Enter' && handleExplain()}
              />
              <button
                onClick={() => handleExplain()}
                disabled={loading}
                className="btn-small disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Explaining...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    Explain
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Concepts */}
          <div>
            <p className="text-sm text-slate-400 mb-3">Or try these popular concepts:</p>
            <div className="flex flex-wrap gap-2">
              {popularConcepts.map((popularConcept) => (
                <button
                  key={popularConcept}
                  onClick={() => handleQuickConcept(popularConcept)}
                  disabled={loading}
                  className="px-3 py-1.5 text-xs bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50 hover:bg-slate-600/50 hover:border-slate-500/50 hover:text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {popularConcept}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {(explanation || loading) && (
        <div className="card-professional p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Explanation</h3>
            {model && (
              <span className="text-xs bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/30">
                {model}
              </span>
            )}
          </div>

          {loading ? (
            <div className="space-y-3">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-700/50 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-700/50 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-700/50 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
              </div>
              <div className="text-center text-slate-400 text-sm mt-4">
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating explanation with AI...
                </span>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert prose-emerald max-w-none">
              <ReactMarkdown
                className="text-slate-200 leading-relaxed"
                components={{
                  h1: ({children}) => <h1 className="text-2xl font-bold text-emerald-400 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-semibold text-emerald-400 mb-3 mt-6">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-medium text-emerald-400 mb-2 mt-4">{children}</h3>,
                  p: ({children}) => <p className="mb-4 text-slate-200">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1 text-slate-200">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-200">{children}</ol>,
                  li: ({children}) => <li className="text-slate-200">{children}</li>,
                  code: ({children}) => <code className="bg-slate-800 text-emerald-400 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  pre: ({children}) => <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                  strong: ({children}) => <strong className="font-semibold text-emerald-400">{children}</strong>,
                  em: ({children}) => <em className="italic text-slate-300">{children}</em>
                }}
              >
                {explanation}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="card-professional p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <h4 className="font-semibold text-blue-400">Powered by Cerebras AI</h4>
            <p className="text-sm text-slate-400">Get instant, detailed explanations for any technical concept</p>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}

export default ExplanationGenerator;ator;ator;xplanationGenerator;