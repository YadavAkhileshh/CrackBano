// In InterviewPrep.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { API_PATHS } from '../../utils/apiPaths';
import { axiosInstance } from '../../utils/axiosInstance';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import QuestionCard from '../../components/Cards/QuestionCard';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';
import AiResponsePreview from './components/AiResponsePreview';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { LuCircleAlert, LuListCollapse, LuPlus } from 'react-icons/lu';
import { IoArrowBack } from 'react-icons/io5';


function InterviewPrep() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [pinnedQuestions, setPinnedQuestions] = useState([]);

  const fetchSessionDetails = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      
      console.log('Fetching session with ID:', sessionId);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      
      // Log the full response for debugging
      console.log('Session API Response:', response);
      
      // Handle different response structures
      let sessionData = null;
      const responseData = response.data || response;
      
      // Handle different response structures
      if (responseData.session) {
        sessionData = responseData.session;
      } else if (responseData._id) {
        sessionData = responseData;
      } else if (Array.isArray(responseData)) {
        sessionData = responseData.find(s => s._id === sessionId);
      }
      
      if (sessionData) {
        // Ensure questions is an array and properly formatted
        const questions = Array.isArray(sessionData.questions) 
          ? sessionData.questions.map(q => ({
              ...q,
              _id: q._id || Math.random().toString(36).substr(2, 9),
              question: typeof q.question === 'string' ? q.question : 'No question text',
              answer: typeof q.answer === 'string' ? q.answer : '',
              isPinned: !!q.isPinned,
              note: q.note || ''
            }))
          : [];
        
        // Create a new session object with the processed questions
        const processedSession = {
          ...sessionData,
          questions
        };
        
        console.log('Processed session data:', processedSession);
        setSessionData(processedSession);
      } else {
        console.error('Invalid session data format:', responseData);
        setErrorMsg("Invalid session data format");
        setSessionData(null);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to load session. Please try again.";
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
      
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: `/interview-prep/${sessionId}` } });
      } else if (error.response?.status === 404) {
        navigate('/dashboard');
        toast.error("Session not found");
      }
      
      setSessionData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      setErrorMsg("");
      const loadingToast = toast.loading('Generating questions...');
    
      if (!sessionId) {
        throw new Error("No session ID found");
      }
    
      if (!sessionData) {
        throw new Error("Session data not loaded");
      }
    
      // Ensure we have valid session data
      if (!sessionData.role || !sessionData.experience) {
        throw new Error("Session data is incomplete. Please refresh the page and try again.");
      }
    
      // Get topics from session data or use default
      const topicsArray = Array.isArray(sessionData.topics) && sessionData.topics.length > 0 
        ? sessionData.topics 
        : (Array.isArray(sessionData.topicsToFocus) ? sessionData.topicsToFocus : ['general']);
    
      const requestData = {
        difficulty: sessionData.difficulty || 'medium',
        topicsToFocus: Array.isArray(topicsArray) ? topicsArray.join(', ') : topicsArray,
        numQuestions: 5,
        role: sessionData.role,
        experience: sessionData.experience
      };
    
      console.log('Sending request to:', API_PATHS.AI.GENERATE_QUESTIONS);
      console.log('Request data:', requestData);
    
      // Make the request to generate questions
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 60000, // 60 second timeout
          validateStatus: (status) => status < 500 // Don't throw for 4xx errors
        }
      ).catch(error => {
        console.error('Error in question generation request:', error);
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. Please try again.');
        }
        throw error;
      });
  
      console.log('Question Generation API Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
    
      // Handle different response formats
      let questions = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          questions = response.data;
        } else if (response.data.questions && Array.isArray(response.data.questions)) {
          questions = response.data.questions;
        } else if (response.data.data?.questions) {
          questions = response.data.data.questions;
        } else if (response.data.success === false) {
          throw new Error(response.data.message || 'Failed to generate questions');
        } else if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
          // If we have data but couldn't parse questions, use the raw data
          questions = [response.data];
        }
      }
    
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('No questions were generated. Please try again with different parameters.');
      }
    
      console.log(`Successfully parsed ${questions.length} questions`);
      toast.dismiss(loadingToast);
      toast.loading('Saving questions to your session...');
    
      // Prepare questions for adding to session
      const questionsToAdd = questions.map((q, index) => ({
        question: q.question || `Question ${index + 1}`,
        answer: q.answer || '',
        topic: q.topic || (Array.isArray(topicsArray) ? topicsArray[0] : 'general'),
        difficulty: q.difficulty || 'medium',
        type: q.type || 'technical'
      }));
    
      console.log('Adding questions to session:', questionsToAdd);
    
      // Add questions to session
      const addResponse = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: questionsToAdd
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000 // 30 second timeout for adding questions
        }
      ).catch(error => {
        console.error('Error adding questions to session:', error);
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request to save questions timed out. Please try again.');
        }
        throw error;
      });
  
      console.log('Add Questions Response:', addResponse.data);
    
      if (addResponse.data?.success) {
        await fetchSessionDetails();
        toast.dismiss(loadingToast);
        toast.success(`Successfully added ${questions.length} new questions`);
      } else {
        throw new Error(addResponse.data?.message || 'Failed to save questions to your session');
      }
  
    } catch (error) {
      console.error('Error in handleAddMoreQuestions:', {
        name: error.name,
        message: error.message,
        ...(error.response ? {
          response: {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data
          }
        } : {})
      });
  
      let errorMessage = 'Failed to add more questions. ';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage += 'The request timed out. Please try again.';
      } else if (!error.response) {
        errorMessage += 'Unable to connect to the server. Please check your connection.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Your session has expired. Please log in again.';
      } else if (error.response?.status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage += error.message || 'Please try again later.';
      }
  
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUpdateLoader(false);
      toast.dismiss();
    }
  };

  const togglePinQuestion = async (questionId) => {
    if (!questionId) {
      console.error('No question ID provided for pin toggle');
      return;
    }

    try {
      // Find the question to get current pin status
      const question = sessionData?.questions?.find(q => q._id === questionId);
      if (!question) {
        throw new Error('Question not found');
      }

      const newPinStatus = !question.isPinned;
      
      // Optimistically update the UI
      setSessionData(prevData => {
        if (!prevData?.questions) return prevData;
        
        const updatedQuestions = prevData.questions.map(q => 
          q._id === questionId ? { ...q, isPinned: newPinStatus } : q
        );
        
        // Sort questions: pinned first, then by creation date
        const sortedQuestions = [...updatedQuestions].sort((a, b) => {
          if (a.isPinned === b.isPinned) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return a.isPinned ? -1 : 1;
        });
        
        return { ...prevData, questions: sortedQuestions };
      });

      // Make the API call to update the pin status
      await axiosInstance.patch(
        `${API_PATHS.QUESTION.BASE}/${questionId}/pin`,
        { isPinned: newPinStatus }
      );
      
      // Refresh to ensure sync with the server
      await fetchSessionDetails();
      
      toast.success(`Question ${newPinStatus ? 'pinned' : 'unpinned'} successfully`);
      
    } catch (error) {
      console.error('Error toggling pin status:', error);
      toast.error(`Failed to ${question?.isPinned ? 'unpin' : 'pin'} question`);
      
      // Revert on error
      if (sessionData) {
        fetchSessionDetails();
      }
    }
  };

  
  const generateExplanation = async (questionText) => {
    try {
      setExplanation(null);
      setOpenLearnMoreDrawer(true);
      
      // Show loading state
      const loadingToast = toast.loading('Generating explanation...');
      
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          concept: questionText,
          role: sessionData?.role || 'Software Developer',
          experience: sessionData?.experience || 2,
          // Add instructions for simple explanation
          instructions: 'Please explain this concept in simple, easy-to-understand terms as if explaining to a beginner. Use examples and analogies where helpful.'
        },
        {
          timeout: 60000, // 60 second timeout
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).catch(error => {
        console.error('Error generating explanation:', error);
        throw error;
      });
  
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Handle different response formats
      let explanationText = '';
      const responseData = response.data || response || {};
      
      console.log('Explanation API Response:', responseData);
      
      if (typeof responseData === 'string') {
        explanationText = responseData;
      } else if (responseData.success && responseData.explanation) {
        explanationText = responseData.explanation;
      } else if (responseData.explanation) {
        explanationText = responseData.explanation;
      } else if (responseData.data?.explanation) {
        explanationText = responseData.data.explanation;
      } else if (responseData.choices?.[0]?.message?.content) {
        // Handle OpenAI/Groq API response format
        explanationText = responseData.choices[0].message.content;
      } else if (responseData.text) {
        // Handle other AI API formats
        explanationText = responseData.text;
      } else if (responseData.content) {
        explanationText = responseData.content;
      } else {
        console.error('Unexpected response format:', responseData);
        explanationText = 'Unable to generate explanation at this time. Please try again later.';
      }
      
      // Update state with both question and explanation for the drawer
      setExplanation({
        question: questionText,
        content: explanationText
      });
      
    } catch (error) {
      console.error('Error in generateExplanation:', error);
      setExplanation({
        question: questionText,
        content: 'Sorry, we encountered an error while generating the explanation. Here are some tips instead:\n\n' +
          '1. Break down the question into key components\n' +
          '2. Think about real-world examples that illustrate the concept\n' +
          '3. Consider how this relates to the role you\'re interviewing for\n' +
          '4. Practice explaining it in your own words\n' +
          '5. Try to connect it to concepts you already know'
      });
      toast.error('Failed to generate explanation. Please try again later.');
    }
  };
  useEffect(() => {
    const loadPinnedQuestions = async () => {
      try {
        console.log('Fetching pinned questions from:', API_PATHS.QUESTION.PINNED);
        const response = await axiosInstance.get(API_PATHS.QUESTION.PINNED);
        console.log('Pinned questions response:', response);
        if (response.data?.success) {
          setPinnedQuestions(response.data.pinnedQuestions || []);
        }
      } catch (error) {
        console.error('Error loading pinned questions:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: {
            url: error.config?.url,
            method: error.config?.method
          }
        });
        if (error.response?.status === 404) {
          toast.error('Pinned questions feature is not available');
        } else {
          toast.error('Failed to load pinned questions');
        }
      }
    };
  
    if (sessionId) {
      loadPinnedQuestions();
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetails();
    }
  }, [sessionId]);

  if (isLoading && !sessionData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <SpinnerLoader size={48} />
        </div>
      </DashboardLayout>
    );
  }

  if (!sessionData) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <div className="text-red-500 mb-4">
            <LuCircleAlert className="mx-auto text-4xl" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-white">Session not found</h3>
          <p className="text-slate-300 mb-4">
            {errorMsg || "The requested session could not be loaded."}
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded hover:from-purple-700 hover:to-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData.role || 'Interview'}
        experience={sessionData.experience || 0}
        topicsToFocus={sessionData.topicsToFocus || []}
        questions={Array.isArray(sessionData.questions) ? sessionData.questions : []}
        description={sessionData.description}
        lastUpdated={sessionData.updatedAt ? new Date(sessionData.updatedAt).toLocaleDateString() : 'N/A'}
      />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors duration-200 group"
        >
          <IoArrowBack className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Dashboard</span>
        </button>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content area */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Interview Questions</h2>
                <p className="text-slate-300">
                  {sessionData?.questions?.length || 0} questions ready for practice
                </p>
              </div>
              <button
                onClick={handleAddMoreQuestions}
                disabled={isUpdateLoader}
                className="btn-small disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdateLoader ? (
                  <SpinnerLoader size={16} />
                ) : (
                  <LuPlus className="w-4 h-4" />
                )}
                Generate More
              </button>
            </div>

            {errorMsg && (
              <div className="mb-8 p-4 bg-red-900/20 text-red-400 rounded-xl flex items-start gap-3 border border-red-500/30 backdrop-blur-sm">
                <LuCircleAlert className="mt-0.5 flex-shrink-0 w-5 h-5" />
                <div>
                  <h4 className="font-medium mb-1">Error</h4>
                  <p className="text-sm">{errorMsg}</p>
                </div>
              </div>
            )}

            <AnimatePresence>
              {sessionData?.questions?.length > 0 ? (
                <div className="space-y-6">
                  {sessionData.questions.map((question, index) => (
                    <motion.div
                      key={question._id || `question-${index}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`card-professional overflow-hidden hover:shadow-xl transition-all duration-300 ${
                        question.isPinned 
                          ? 'border-l-4 border-l-indigo-500 bg-indigo-900/10' 
                          : ''
                      }`}
                    >
                      <QuestionCard
                        id={question._id}
                        question={question.question}
                        answer={question.answer}
                        isPinned={question.isPinned}
                        index={index}
                        onLearnMore={() => generateExplanation(question.question)}
                        onTogglePin={() => togglePinQuestion(question._id)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 card-professional border-dashed">
                  <div className="max-w-md mx-auto">
                    <LuListCollapse className="mx-auto w-12 h-12 text-slate-500 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Questions Yet</h3>
                    <p className="text-slate-400 mb-6">Generate your first set of interview questions to start practicing</p>
                    <button
                      onClick={handleAddMoreQuestions}
                      disabled={isUpdateLoader}
                      className="btn-primary max-w-xs disabled:opacity-50"
                    >
                      {isUpdateLoader ? (
                        <>
                          <SpinnerLoader size={16} />
                          Generating...
                        </>
                      ) : (
                        <>
                          <LuPlus className="w-5 h-5" />
                          Generate Questions
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Sidebar for larger screens */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="card-professional p-6 sticky top-6">
              <h3 className="font-semibold text-xl mb-6 text-white">Session Overview</h3>
              <div className="space-y-6">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Target Role</h4>
                  <p className="text-white font-medium">{sessionData?.role || 'Not specified'}</p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Experience Level</h4>
                  <p className="text-white font-medium">{sessionData?.experience || '0'} years</p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      // Safely handle topicsToFocus in any format
                      let topics = [];
                      if (sessionData?.topicsToFocus) {
                        if (Array.isArray(sessionData.topicsToFocus)) {
                          topics = [...sessionData.topicsToFocus];
                        } else if (typeof sessionData.topicsToFocus === 'string') {
                          topics = sessionData.topicsToFocus
                            .split(',')
                            .map(t => t.trim())
                            .filter(Boolean);
                        } else if (typeof sessionData.topicsToFocus === 'object' && sessionData.topicsToFocus !== null) {
                          // Handle case where it might be an object with topics as values
                          topics = Object.values(sessionData.topicsToFocus).filter(t => typeof t === 'string');
                        }
                      }
                      
                      if (topics.length === 0) {
                        return <p className="text-sm text-slate-400 italic">No focus areas specified</p>;
                      }
                      
                      return (
                        <>
                          {topics.map((topic, i) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-500/30"
                            >
                              {topic}
                            </span>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        isOpen={openLearnMoreDrawer}
        onClose={() => setOpenLearnMoreDrawer(false)}
        title={explanation?.question || "Explanation"}
      >
        {isLoading ? (
          <SkeletonLoader />
        ) : explanation?.content ? (
          <AiResponsePreview content={explanation.content} />
        ) : (
          <p className="text-slate-400">No explanation available</p>
        )}
      </Drawer>
    </DashboardLayout>
  );
}

export default InterviewPrep;