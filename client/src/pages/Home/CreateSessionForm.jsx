import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiX, FiPlus, FiLoader } from 'react-icons/fi';
import { API_PATHS } from '../../utils/apiPaths';
import { axiosInstance } from '../../utils/axiosInstance';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const CreateSessionForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: [],
        description: "",
    });
    const [currentTopic, setCurrentTopic] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Add a new topic
    const addTopic = (e) => {
        e.preventDefault();
        const topic = currentTopic.trim();
        
        if (!topic) return;

        // Split by comma and trim each topic
        const topicsToAdd = topic.split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0);

        if (topicsToAdd.length === 0) {
            setFormErrors(prev => ({
                ...prev,
                topics: 'Please enter a valid topic'
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            topicsToFocus: [...new Set([...prev.topicsToFocus, ...topicsToAdd])]
        }));

        setCurrentTopic('');
        setFormErrors(prev => ({ ...prev, topics: '' }));
    };

    // Remove a topic
    const removeTopic = (topicToRemove) => {
        setFormData(prev => ({
            ...prev,
            topicsToFocus: prev.topicsToFocus.filter(topic => topic !== topicToRemove)
        }));
    };

    // Validate form
    const validateForm = () => {
        const errors = {};
        let isValid = true;
    
        if (!formData.role.trim()) {
            errors.role = 'Role is required';
            isValid = false;
        }
    
        if (!formData.experience) {
            errors.experience = 'Experience is required';
            isValid = false;
        } else if (isNaN(formData.experience) || parseFloat(formData.experience) < 0) {
            errors.experience = 'Please enter a valid number';
            isValid = false;
        }
    
        // Ensure topicsToFocus is an array and not empty
        const topics = Array.isArray(formData.topicsToFocus) ? formData.topicsToFocus : [];
        if (topics.length === 0) {
            errors.topics = 'At least one topic is required';
            isValid = false;
        }
    
        setFormErrors(errors);
        return isValid;
    };

    // Handle form submission
    const handleCreateSession = async (e) => {
        e.preventDefault();
    
        // First, add any pending topic
        if (currentTopic.trim()) {
            addTopic(e);
        }
    
        // Then validate
        if (!validateForm()) {
            return;
        }
    
        setLoading(true);
    
        try {
            // Ensure topics is a string for the API
            const topicsString = Array.isArray(formData.topicsToFocus) 
                ? formData.topicsToFocus.join(',') 
                : String(formData.topicsToFocus || '');
    
            console.log('Sending request with data:', {
                role: formData.role,
                experience: formData.experience,
                topicsToFocus: topicsString
            });
    
            // Generate questions using AI
            const questionsResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role: formData.role,
                    experience: formData.experience,
                    topicsToFocus: topicsString,
                    numQuestions: 15
                }
            );

            // Defensive check for questions
            if (!questionsResponse || !questionsResponse.questions || !Array.isArray(questionsResponse.questions) || questionsResponse.questions.length === 0) {
                toast.error('Failed to generate questions. Please try again.');
                setLoading(false);
                return;
            }
    
            // Create the session with generated questions
            const sessionResponse = await axiosInstance.post(
                API_PATHS.SESSION.CREATE,
                {
                    role: formData.role,
                    experience: formData.experience,
                    topicsToFocus: topicsString,
                    description: formData.description,
                    questions: questionsResponse.questions
                }
            );
    
            if (sessionResponse && sessionResponse.session && sessionResponse.session._id) {
                toast.success('Session created successfully!');
                navigate(`/interview-prep/${sessionResponse.session._id}`);
            } else {
                toast.error('Failed to create session. Please try again.');
            }
    
        } catch (error) {
            console.error('Error creating session:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    data: error.config?.data
                }
            });
            
            const errorMessage = error.response?.data?.message || 'Failed to create session. Please try again.';
            toast.error(errorMessage);
    
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-4">Create Interview Session</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Set up your personalized interview preparation session with AI-generated questions
                    </p>
                </div>
                
                <div className="card-professional max-w-3xl mx-auto p-8">
            
                    <form onSubmit={handleCreateSession} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Role Input */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-semibold text-slate-200 mb-2">
                                    Target Role <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    className={`input-box ${formErrors.role ? 'border-red-500 focus-within:border-red-500' : ''}`}
                                    placeholder="e.g., Senior Frontend Developer"
                                    value={formData.role}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {formErrors.role && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                        {formErrors.role}
                                    </p>
                                )}
                            </div>

                            {/* Experience Input */}
                            <div>
                                <label htmlFor="experience" className="block text-sm font-semibold text-slate-200 mb-2">
                                    Experience Level <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="experience"
                                    name="experience"
                                    min="0"
                                    step="0.5"
                                    className={`input-box ${formErrors.experience ? 'border-red-500 focus-within:border-red-500' : ''}`}
                                    placeholder="Years of experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {formErrors.experience && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                        {formErrors.experience}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Topics Input */}
                        <div>
                            <label htmlFor="topics" className="block text-sm font-semibold text-slate-200 mb-2">
                                Key Topics & Skills <span className="text-red-400">*</span>
                            </label>
                            <div className="flex gap-3 mb-4">
                                <input
                                    type="text"
                                    id="topics"
                                    className={`flex-1 input-box ${formErrors.topics ? 'border-red-500 focus-within:border-red-500' : ''}`}
                                    placeholder="e.g., JavaScript, React, System Design"
                                    value={currentTopic}
                                    onChange={(e) => setCurrentTopic(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addTopic(e);
                                        }
                                    }}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={addTopic}
                                    className="btn-small"
                                    disabled={!currentTopic.trim() || loading}
                                >
                                    <FiPlus className="h-4 w-4" />
                                    Add
                                </button>
                            </div>
                            
                            {/* Selected Topics */}
                            <div className="flex flex-wrap gap-3 min-h-[3rem] p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                                {formData.topicsToFocus.length > 0 ? (
                                    formData.topicsToFocus.map((topic, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-800/50 transition-colors duration-200"
                                        >
                                            {topic}
                                            <button
                                                type="button"
                                                onClick={() => removeTopic(topic)}
                                                className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-700/50 hover:bg-red-600 focus:outline-none transition-colors duration-200"
                                                disabled={loading}
                                            >
                                                <FiX className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-slate-400 text-sm italic">No topics added yet. Add some topics to focus on during your interview.</p>
                                )}
                            </div>
                            
                            {formErrors.topics && (
                                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                    {formErrors.topics}
                                </p>
                            )}
                        </div>

                        {/* Description Input */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-slate-200 mb-2">
                                Additional Notes <span className="text-slate-400 font-normal">(Optional)</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                className="w-full px-4 py-3 border border-slate-600/50 bg-slate-700/50 text-white placeholder-slate-400 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400 backdrop-blur-sm transition-all duration-200"
                                placeholder="Any specific areas, company details, or interview format you'd like to focus on..."
                                value={formData.description}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-slate-700/50">
                            <button
                                type="submit"
                                className="btn-primary text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <FiLoader className="animate-spin w-5 h-5" />
                                        Generating Questions...
                                    </>
                                ) : (
                                    <>
                                        <FiPlus className="w-5 h-5" />
                                        Create Interview Session
                                    </>
                                )}
                            </button>
                            <p className="mt-3 text-center text-sm text-slate-400">
                                We'll generate 15 personalized questions based on your inputs
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreateSessionForm;