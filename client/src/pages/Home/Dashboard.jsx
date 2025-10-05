import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import { axiosInstance } from '../../utils/axiosInstance';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { FiPlus, FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';


// Color palette for session cards
const CARD_COLORS = [
  'from-blue-500 to-blue-400',
  'from-purple-500 to-purple-400',
  'from-green-500 to-green-400',
  'from-amber-500 to-amber-400',
  'from-rose-500 to-rose-400',
  'from-indigo-500 to-indigo-400',
];

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pinnedQuestions, setPinnedQuestions] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalQuestions: 0,
    pinnedQuestions: 0,
  });

  const fetchAllSessions = async () => {
    try {
      setLoading(true);
      const data = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      const sessionsData = Array.isArray(data) ? data : [];
      setSessions(sessionsData);

      // Calculate stats
      const totalQuestions = sessionsData.reduce((acc, session) =>
        acc + (session.questions?.length || 0), 0);

      // Get pinned questions count from the server
      try {
        const pinnedResponse = await axiosInstance.get(API_PATHS.QUESTION.PINNED);
        const pinnedCount = pinnedResponse.data?.pinnedQuestions?.length || 0;
        setPinnedQuestions(pinnedResponse.data?.pinnedQuestions || []);
        
        setStats({
          totalSessions: sessionsData.length,
          totalQuestions,
          pinnedQuestions: pinnedCount,
        });
      } catch (error) {
        console.error('Error fetching pinned questions:', error);
        // If there's an error, use the local count as fallback
        setStats({
          totalSessions: sessionsData.length,
          totalQuestions,
          pinnedQuestions: pinnedQuestions.length,
        });
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to load sessions');
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  const togglePinQuestion = async (question) => {
    try {
      const isPinned = pinnedQuestions.some(pq => pq._id === question._id);
      let updatedPinnedQuestions;

      if (isPinned) {
        // Unpin the question
        await axiosInstance.delete(`${API_PATHS.QUESTION.PINNED}/${question._id}`);
        updatedPinnedQuestions = pinnedQuestions.filter(pq => pq._id !== question._id);
        toast.success('Question unpinned');
      } else {
        // Pin the question
        const response = await axiosInstance.post(API_PATHS.QUESTION.PINNED, {
          questionId: question._id,
          sessionId: question.sessionId
        });
        updatedPinnedQuestions = [...pinnedQuestions, response.data.pinnedQuestion];
        toast.success('Question pinned');
      }

      setPinnedQuestions(updatedPinnedQuestions);
      // Update the pinned questions count in stats
      setStats(prev => ({
        ...prev,
        pinnedQuestions: updatedPinnedQuestions.length
      }));
    } catch (error) {
      console.error('Error toggling pin:', error);
      toast.error('Failed to update pinned status');
    }
  };

  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <SpinnerLoader size={48} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-lg text-slate-300">
              Master your interview skills with AI-powered preparation
            </p>
          </div>
          <Link
            to="/create-session"
            className="mt-6 md:mt-0 inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 active:scale-[0.98] hover:scale-105 hover:-translate-y-1"
          >
            <FiPlus className="mr-2 w-5 h-5" />
            Start New Session
          </Link>
        </div>



        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* Total Sessions */}
          <div className="card-professional overflow-hidden hover:scale-[1.05] transition-all duration-300 group">
            <div className="px-6 py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl p-3 shadow-lg group-hover:shadow-emerald-500/50 group-hover:scale-110 transition-all duration-300">
                  <FiClock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-400 truncate">
                      Total Sessions
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-white">
                        {stats.totalSessions}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total Questions */}
          <div className="card-professional overflow-hidden hover:scale-[1.05] transition-all duration-300 group">
            <div className="px-6 py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-3 shadow-lg group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-300">
                  <FiAlertCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-400 truncate">
                      Total Questions
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-white">
                        {stats.totalQuestions}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Pinned Questions */}
          <div className="card-professional overflow-hidden hover:scale-[1.05] transition-all duration-300 group">
            <div className="px-6 py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-3 shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300">
                  <FiCheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-400 truncate">
                      Pinned Questions
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-white">
                        {stats.pinnedQuestions}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 overflow-hidden shadow-xl rounded-xl border border-emerald-500/30 hover:scale-[1.05] transition-all duration-300 animate-gradient group">
            <div className="px-6 py-6 h-full flex items-center">
              <div className="w-full text-center">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                  Quick Start
                </h3>
                <Link
                  to="/create-session"
                  className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-emerald-700 bg-white hover:bg-slate-100 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                >
                  <FiPlus className="mr-2 w-4 h-4" />
                  New Session
                </Link>
              </div>
            </div>
          </div>
        </div>


        <div className="card-professional shadow-xl overflow-hidden">
          <div className="px-6 py-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Recent Sessions
                </h3>
                <p className="mt-1 text-slate-300">
                  Your latest interview preparation sessions
                </p>
              </div>
              <div className="hidden sm:block">
                <Link
                  to="/create-session"
                  className="btn-small"
                >
                  <FiPlus className="w-4 h-4" />
                  New Session
                </Link>
              </div>
            </div>
          </div>

          {sessions.length > 0 ? (
            <ul className="divide-y divide-slate-700">
              {sessions.map((session, index) => (
                <motion.li
                  key={session._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/interview-prep/${session._id}`}
                    className="block hover:bg-slate-700/30 transition-all duration-200 rounded-lg mx-2 my-1"
                  >
                    <div className="px-6 py-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full shadow-sm ${session.questions?.length > 0 ? 'bg-emerald-400' : 'bg-slate-400'
                            }`}></div>
                          <p className="ml-4 text-base font-semibold text-indigo-400 truncate">
                            {session.role} Interview
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                            {session.questions?.length || 0} questions
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 sm:flex sm:justify-between sm:items-center">
                        <div className="sm:flex">
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(session?.topicsToFocus) && session.topicsToFocus.length > 0
                              ? session.topicsToFocus
                                .slice(0, 3)
                                .map((topic, idx) => {
                                  const topicName = typeof topic === 'string' ? topic : (topic?.question || 'Untitled');
                                  return (
                                    <span key={idx} className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-md border border-slate-600/50">
                                      {topicName}
                                    </span>
                                  );
                                })
                              : <span className="text-sm text-slate-400">No topics specified</span>
                            }
                            {session.topicsToFocus?.length > 3 && (
                              <span className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-md border border-slate-600/50">
                                +{session.topicsToFocus.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-slate-400 sm:mt-0">
                          <FiClock className="flex-shrink-0 mr-2 h-4 w-4 text-slate-500" />
                          <time dateTime={session.updatedAt} className="font-medium">
                            {formatDate(session.updatedAt)}
                          </time>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-white">No sessions</h3>
              <p className="mt-1 text-sm text-slate-300">
                Get started by creating a new interview session.
              </p>
              <div className="mt-8">
                <Link
                  to="/create-session"
                  className="btn-primary max-w-xs mx-auto"
                >
                  <FiPlus className="w-5 h-5" />
                  Create Your First Session
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;