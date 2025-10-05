import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';

export default function InterviewSession() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axiosInstance.get(`/api/sessions/${sessionId}`);
        // Ensure topicsToFocus is an array
        const sessionData = {
          ...response.data,
          topicsToFocus: Array.isArray(response.data.topicsToFocus) 
            ? response.data.topicsToFocus 
            : typeof response.data.topicsToFocus === 'string'
              ? response.data.topicsToFocus.split(',').map(t => t.trim()).filter(t => t)
              : []
        };
        setSession(sessionData);
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to load session');
        toast.error('Failed to load session. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600 p-4 rounded-lg bg-red-50 max-w-md mx-4">
          <p className="font-medium">Error loading session</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-medium">Session not found</p>
          <p className="text-gray-600 mt-2">The requested session could not be found.</p>
        </div>
      </div>
    );
  }

  // Ensure topicsToFocus is an array before mapping
  const topics = Array.isArray(session.topicsToFocus) 
    ? session.topicsToFocus 
    : typeof session.topicsToFocus === 'string'
      ? session.topicsToFocus.split(',').map(t => t.trim()).filter(t => t)
      : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{session.role || 'Interview Session'}</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Interview details and questions
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Session Information</h3>
                <dl className="mt-2 divide-y divide-gray-200">
                  <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {session.role || 'Not specified'}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Experience Level</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {session.experience ? `${session.experience} years` : 'Not specified'}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Topics</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {topics.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {topics.map((topic, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">No topics specified</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              {session.description && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Description</h3>
                  <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
                    {session.description}
                  </div>
                </div>
              )}
            </div>

            {/* Add questions section if available */}
            {session.questions && session.questions.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Interview Questions</h3>
                <div className="mt-4 space-y-4">
                  {session.questions.map((question, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                      <p className="mt-1 text-gray-700">{question.question || question}</p>
                      {question.answer && (
                        <div className="mt-2 p-3 bg-white rounded border border-gray-200">
                          <p className="text-sm text-gray-600">{question.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}