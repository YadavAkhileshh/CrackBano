import React, { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import DashboardLayout from './layouts/DashboardLayout';

function TestAI() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [explanationResult, setExplanationResult] = useState(null);
  const [explanationError, setExplanationError] = useState(null);

  const testQuestionGeneration = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: 'Frontend Developer',
        experience: '2',
        topicsToFocus: 'React,JavaScript',
        numQuestions: 3
      });

      setResult(response);
      console.log('AI Test Result:', response);
    } catch (err) {
      setError(err.message);
      console.error('AI Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testExplanationGeneration = async () => {
    setExplanationLoading(true);
    setExplanationError(null);
    setExplanationResult(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        concept: 'React Hooks'
      });

      setExplanationResult(response);
      console.log('Explanation Test Result:', response);
    } catch (err) {
      setExplanationError(err.message);
      console.error('Explanation Test Error:', err);
    } finally {
      setExplanationLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 card-professional max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">AI Functionality Test</h2>
        <p className="text-slate-300">Test both question generation and explanation features</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Question Generation Test */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Question Generation</h3>
          <button
            onClick={testQuestionGeneration}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Testing...
              </>
            ) : (
              <>
                <span>❓</span>
                Test Question Generation
              </>
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-900/20 text-red-400 rounded-lg border border-red-500/30">
              <h4 className="font-semibold">Error:</h4>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="p-4 bg-green-900/20 text-green-400 rounded-lg border border-green-500/30">
              <h4 className="font-semibold">Success!</h4>
              <p className="text-sm mb-2">Generated {result.questions?.length || 0} questions using {result.model}</p>
              <details className="text-xs">
                <summary className="cursor-pointer hover:text-green-300">View Details</summary>
                <pre className="mt-2 overflow-auto bg-green-950/30 p-2 rounded">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        {/* Explanation Generation Test */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Explanation Generation</h3>
          <button
            onClick={testExplanationGeneration}
            disabled={explanationLoading}
            className="btn-primary disabled:opacity-50 disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            {explanationLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Testing...
              </>
            ) : (
              <>
                <span>🧠</span>
                Test Explanation (Cerebras)
              </>
            )}
          </button>

          {explanationError && (
            <div className="p-4 bg-red-900/20 text-red-400 rounded-lg border border-red-500/30">
              <h4 className="font-semibold">Error:</h4>
              <p className="text-sm">{explanationError}</p>
            </div>
          )}

          {explanationResult && (
            <div className="p-4 bg-blue-900/20 text-blue-400 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold">Success!</h4>
              <p className="text-sm mb-2">Generated explanation using {explanationResult.model}</p>
              <details className="text-xs">
                <summary className="cursor-pointer hover:text-blue-300">View Explanation</summary>
                <div className="mt-2 p-2 bg-blue-950/30 rounded text-slate-200 text-sm max-h-40 overflow-auto">
                  {explanationResult.explanation}
                </div>
              </details>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-lg border border-emerald-500/30">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <h4 className="font-semibold text-emerald-400">AI Models</h4>
            <p className="text-sm text-slate-400">Questions: Meta Llama 3.1 70B (Groq) | Explanations: Cerebras AI</p>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}

export default TestAI;