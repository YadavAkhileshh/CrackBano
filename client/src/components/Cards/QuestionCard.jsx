import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuPin, LuPinOff, LuChevronDown, LuChevronUp, LuSparkles } from 'react-icons/lu';
import AiResponsePreview from '../../pages/Ip/components/AiResponsePreview';

export default function QuestionCard({ 
  question, 
  answer = '', 
  isPinned = false, 
  index = 0,
  onLearnMore,
  onTogglePin,
  id // Add id prop to identify the question
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinning, setIsPinning] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);

  const toggleExpand = useCallback((e) => {
    if (e.target.closest('.no-expand')) return;
    setIsExpanded(prev => !prev);
  }, []);

  const handlePinClick = useCallback(async (e) => {
    e.stopPropagation();
    if (isPinning || !onTogglePin || !id) return;
    
    try {
      setIsPinning(true);
      await onTogglePin(id); // Pass the question ID to the parent
    } catch (error) {
      console.error('Error toggling pin:', error);
    } finally {
      setIsPinning(false);
    }
  }, [isPinning, onTogglePin, id]);

  const handleLearnMore = useCallback(async (e) => {
    e.stopPropagation();
    if (isExplaining || !onLearnMore) return;
    
    try {
      setIsExplaining(true);
      await onLearnMore(question);
    } catch (error) {
      console.error('Error generating explanation:', error);
    } finally {
      setIsExplaining(false);
    }
  }, [isExplaining, onLearnMore, question]);

  // Ensure we have valid strings for question and answer
  const safeQuestion = typeof question === 'string' ? question : 'No question text';
  const safeAnswer = typeof answer === 'string' ? answer : '';
  const showAnswer = safeAnswer.trim().length > 0;

  return (
    <div 
      className={`relative group border rounded-xl overflow-hidden transition-all duration-300 ${
        isPinned ? 'border-l-4 border-l-indigo-500 bg-indigo-900/5' : 'border-slate-700/50 hover:shadow-lg hover:border-slate-600'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`p-6 cursor-pointer transition-colors duration-200 ${
          isExpanded ? 'bg-slate-800/50' : 'hover:bg-slate-700/30'
        }`}
        onClick={toggleExpand}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-400 w-5 flex-shrink-0">
                {typeof index === 'number' ? index + 1 : '•'}
              </span>
              <h3 className="text-lg font-semibold text-white leading-relaxed">
                {safeQuestion}
              </h3>
            </div>
            
            <AnimatePresence>
              {isExpanded && showAnswer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 ml-7 text-slate-300"
                >
                  <div className="prose max-w-none text-sm">
                    {safeAnswer.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-2 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePinClick}
              disabled={isPinning}
              className={`p-2 rounded-lg transition-colors duration-200 no-expand ${
                isPinned 
                  ? 'text-amber-400 hover:bg-amber-900/20' 
                  : 'text-slate-400 hover:bg-slate-600/50 hover:text-slate-300'
              }`}
              aria-label={isPinned ? 'Unpin question' : 'Pin question'}
              title={isPinned ? 'Unpin question' : 'Pin question'}
            >
              {isPinning ? (
                <div className="w-4 h-4 border-2 border-slate-600 border-t-purple-500 rounded-full animate-spin"></div>
              ) : isPinned ? (
                <LuPin className="w-4 h-4" />
              ) : (
                <LuPinOff className="w-4 h-4" />
              )}
            </button>
            
            {showAnswer && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(prev => !prev);
                }}
                className="p-2 text-slate-400 hover:text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors duration-200 no-expand"
                aria-label={isExpanded ? 'Collapse answer' : 'Expand answer'}
                title={isExpanded ? 'Collapse answer' : 'Expand answer'}
              >
                {isExpanded ? (
                  <LuChevronUp className="w-4 h-4" />
                ) : (
                  <LuChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
            
            {onLearnMore && (
              <button
                onClick={handleLearnMore}
                disabled={isExplaining}
                className={`p-2 rounded-lg transition-colors duration-200 no-expand ${
                  isExplaining 
                    ? 'text-indigo-400' 
                    : 'text-indigo-400 hover:bg-indigo-900/20 hover:text-indigo-300'
                }`}
                aria-label="Generate AI explanation"
                title="Get AI explanation"
              >
                {isExplaining ? (
                  <div className="w-4 h-4 border-2 border-slate-600 border-t-purple-500 rounded-full animate-spin"></div>
                ) : (
                  <LuSparkles className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
