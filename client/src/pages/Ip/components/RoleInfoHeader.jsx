import React from 'react';

function RoleInfoHeader({ role, experience, topicsToFocus = [], questions = [], description, lastUpdated }) {
    // Safely handle topicsToFocus whether it's a string, array, or object
    const renderTopics = () => {
        if (!topicsToFocus) return null;
        
        if (typeof topicsToFocus === 'string') {
            return <p className="text-indigo-100">{topicsToFocus}</p>;
        }
        
        if (Array.isArray(topicsToFocus)) {
            // If it's an array of strings
            if (topicsToFocus.every(item => typeof item === 'string')) {
                return (
                    <p className="text-indigo-100">
                        {topicsToFocus.join(', ')}
                    </p>
                );
            }
            // If it's an array of objects with a 'topic' property
            if (topicsToFocus.every(item => item && typeof item === 'object' && 'topic' in item)) {
                return (
                    <p className="text-indigo-100">
                        {topicsToFocus.map(t => t.topic).filter(Boolean).join(', ')}
                    </p>
                );
            }
        }
        
        // If it's an object with topics as values
        if (topicsToFocus && typeof topicsToFocus === 'object') {
            const topicsArray = Object.values(topicsToFocus).filter(topic => 
                typeof topic === 'string' || (topic && typeof topic === 'object' && 'topic' in topic)
            );
            
            const topicsText = topicsArray.map(topic => 
                typeof topic === 'string' ? topic : topic.topic
            ).filter(Boolean).join(', ');
            
            return (
                <p className="text-indigo-100">
                    {topicsText || 'No topics specified'}
                </p>
            );
        }
        
        return null;
    };

    // Safely get the number of questions
    const questionCount = Array.isArray(questions) ? questions.length : 0;

    return (
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="py-12 flex flex-col justify-center relative z-10">
                    <div className="flex items-start">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-3">{role || 'Interview Preparation'}</h1>
                                    <div className="text-indigo-100">
                                        {renderTopics()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-wrap items-center gap-3 mt-6">
                        <div className="text-sm font-medium text-indigo-100 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                            {experience || 0} {experience === 1 ? 'Year' : 'Years'} Experience
                        </div>

                        <div className="text-sm font-medium text-indigo-100 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                            {questionCount} Questions
                        </div>

                        {lastUpdated && (
                            <div className="text-sm font-medium text-indigo-100 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                                Updated {lastUpdated}
                            </div>
                        )}
                    </div>
                </div>


                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-full opacity-20">
                    <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl animate-blob1"></div>
                    <div className="absolute top-16 right-16 w-24 h-24 bg-cyan-300 rounded-full blur-2xl animate-blob2"></div>
                    <div className="absolute bottom-8 right-8 w-20 h-20 bg-blue-300 rounded-full blur-xl animate-blob3"></div>
                </div>
            </div>
        </div>
    );
}

export default RoleInfoHeader;
