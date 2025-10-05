import Groq from 'groq-sdk';
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const cerebras = new Cerebras({
    apiKey: process.env.CEREBRAS_API_KEY
});

/**
 * Generate interview questions using Meta Llama via Groq API
 * POST /api/ai/generate-questions
 */
export const generateInterviewQuestions = async (req, res) => {
    try {
        console.log('🚀 Generating interview questions...');
        
        const { role, experience, topicsToFocus, numQuestions = 5, difficulty = 'medium' } = req.body;
        
        // Convert topics to array if it's a string
        let topicsArray = topicsToFocus;
        if (typeof topicsToFocus === 'string') {
            topicsArray = topicsToFocus.split(',').map(topic => topic.trim()).filter(Boolean);
        }
        
        if (!topicsArray || !Array.isArray(topicsArray) || topicsArray.length === 0) {
            topicsArray = ['general'];
        }

        console.log('🎯 Generating questions for:', { role, topicsArray, numQuestions, difficulty });
        
        // INSTANT GENERATION - Use fallback directly for speed
        const questions = generateFallbackQuestions(topicsArray, difficulty, parseInt(numQuestions));
        
        return res.status(200).json({
            success: true,
            questions: questions,
            model: 'CrackBano AI Engine',
            sponsor: 'Instant Generation'
        });
        
        /* AI generation disabled for speed
        try {
            // Try Cerebras first
            const prompt = `Generate ${numQuestions} technical interview questions for a ${role} with ${experience} years experience.

Topics: ${topicsArray.join(', ')}
Difficulty: ${difficulty}

Return ONLY a JSON array with this exact structure:
[
  {
    "question": "question text",
    "answer": "detailed answer",
    "topic": "${topicsArray[0]}",
    "difficulty": "${difficulty}",
    "type": "technical"
  }
]

No extra text, just the JSON array.`;

            const completion = await cerebras.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are an expert technical interviewer. Generate practical interview questions with detailed answers. Return only valid JSON."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "llama3.1-70b",
                temperature: 0.7,
                max_tokens: 2500,
            });

            const response = completion.choices[0]?.message?.content;
            
            if (!response) {
                throw new Error('No response from Cerebras');
            }

            // Parse JSON response
            let questions;
            try {
                const jsonMatch = response.match(/\[.*\]/s);
                const jsonStr = jsonMatch ? jsonMatch[0] : response;
                questions = JSON.parse(jsonStr);
            } catch (parseError) {
                console.log('Cerebras JSON parse failed, trying Groq fallback');
                throw parseError;
            }

            console.log(`✅ Successfully generated ${questions.length} questions using Cerebras`);
            
            return res.status(200).json({
                success: true,
                questions: questions,
                model: 'Llama 3.1 70B (via Cerebras)',
                sponsor: 'Cerebras'
            });
            
        } catch (aiError) {
            console.log('🔄 Cerebras failed, trying Groq fallback:', aiError.message);
            
            try {
                // Fallback to Groq
                const prompt = `Generate ${numQuestions} technical interview questions for a ${role} with ${experience} years experience.

Topics: ${topicsArray.join(', ')}
Difficulty: ${difficulty}

Return ONLY a JSON array with this exact structure:
[
  {
    "question": "question text",
    "answer": "detailed answer",
    "topic": "${topicsArray[0]}",
    "difficulty": "${difficulty}",
    "type": "technical"
  }
]

No extra text, just the JSON array.`;

                const completion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: "You are an expert technical interviewer. Generate practical interview questions with detailed answers. Return only valid JSON."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    model: "llama-3.3-70b-versatile",
                    temperature: 0.7,
                    max_tokens: 2500,
                });

                const response = completion.choices[0]?.message?.content;
                
                if (!response) {
                    throw new Error('No response from Groq');
                }

                let questions;
                try {
                    const jsonMatch = response.match(/\[.*\]/s);
                    const jsonStr = jsonMatch ? jsonMatch[0] : response;
                    questions = JSON.parse(jsonStr);
                } catch (parseError) {
                    console.log('Groq JSON parse failed, using enhanced fallback');
                    throw parseError;
                }

                console.log(`✅ Successfully generated ${questions.length} questions using Groq`);
                
                return res.status(200).json({
                    success: true,
                    questions: questions,
                    model: 'Meta Llama 3.3 70B (via Groq)',
                    sponsor: 'Meta'
                });
                
            } catch (groqError) {
                console.log('🔄 Both APIs failed, using enhanced fallback questions:', groqError.message);
            
                // Enhanced fallback questions
                const enhancedQuestions = generateFallbackQuestions(topicsArray, difficulty, parseInt(numQuestions));
                
                return res.status(200).json({
                    success: true,
                    questions: enhancedQuestions,
                    model: 'Enhanced Fallback System',
                    note: 'Generated using enhanced templates due to API limitations'
                });
            }
        }
        */
        
    } catch (error) {
        console.error('❌ Error in generateInterviewQuestions:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to generate interview questions',
            error: error.message
        });
    }
};

// Enhanced fallback question generator
function generateFallbackQuestions(topics, difficulty, numQuestions) {
    const questionBank = {
        'javascript': [
            {
                question: "Explain the difference between let, const, and var in JavaScript.",
                answer: "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned, const is block-scoped and cannot be reassigned. let and const have temporal dead zone.",
                topic: "JavaScript",
                type: "technical"
            },
            {
                question: "What are closures in JavaScript and provide a practical example?",
                answer: "Closures allow inner functions to access outer function variables even after the outer function returns. Example: function counter() { let count = 0; return () => ++count; }",
                topic: "JavaScript",
                type: "technical"
            }
        ],
        'react': [
            {
                question: "What are React hooks and why were they introduced?",
                answer: "Hooks allow functional components to use state and lifecycle methods. They were introduced to avoid class component complexity and enable better code reuse.",
                topic: "React",
                type: "technical"
            },
            {
                question: "Explain the Virtual DOM and its benefits.",
                answer: "Virtual DOM is a JavaScript representation of the real DOM. React uses it to optimize updates by diffing changes and updating only what's necessary, improving performance.",
                topic: "React",
                type: "technical"
            }
        ],
        'python': [
            {
                question: "What are Python decorators and how do you create one?",
                answer: "Decorators modify function behavior without changing code. Created using @decorator syntax or wrapper functions. Example: @property, @staticmethod.",
                topic: "Python",
                type: "technical"
            },
            {
                question: "Explain list comprehensions vs generator expressions.",
                answer: "List comprehensions create lists in memory [x for x in range(10)], generators create iterators (x for x in range(10)) that yield values on demand, saving memory.",
                topic: "Python",
                type: "technical"
            }
        ],
        'machine learning': [
            {
                question: "What's the difference between supervised and unsupervised learning?",
                answer: "Supervised learning uses labeled data for prediction (classification/regression), unsupervised learning finds patterns in unlabeled data (clustering/dimensionality reduction).",
                topic: "Machine Learning",
                type: "technical"
            },
            {
                question: "How do you handle overfitting in machine learning models?",
                answer: "Use cross-validation, regularization (L1/L2), dropout, early stopping, more training data, feature selection, and ensemble methods.",
                topic: "Machine Learning",
                type: "technical"
            }
        ]
    };

    let selectedQuestions = [];
    
    // Get questions for each topic
    topics.forEach(topic => {
        const topicLower = topic.toLowerCase();
        const topicQuestions = questionBank[topicLower] || [];
        selectedQuestions.push(...topicQuestions);
    });

    // If no specific questions found, use general programming questions
    if (selectedQuestions.length === 0) {
        selectedQuestions = [
            {
                question: "Describe your approach to debugging a complex issue in production.",
                answer: "Start with logs and monitoring, reproduce the issue, use debugging tools, implement fixes with proper testing, and add monitoring to prevent recurrence.",
                topic: "Problem Solving",
                type: "behavioral"
            },
            {
                question: "How do you ensure code quality in a team environment?",
                answer: "Use code reviews, automated testing, linting, CI/CD pipelines, documentation, and follow coding standards and best practices.",
                topic: "Software Engineering",
                type: "behavioral"
            }
        ];
    }

    // Shuffle and limit
    const shuffled = selectedQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions).map(q => ({ ...q, difficulty }));
}

/**
 * Explain a technical concept using Cerebras AI
 * POST /api/ai/explain-concept
 */
export const explainConcept = async (req, res) => {
    try {
        const { concept } = req.body;

        if (!concept) {
            return res.status(400).json({
                success: false,
                message: 'Concept is required'
            });
        }

        console.log(`🧠 Explaining concept: ${concept}`);

        try {
            // Try Groq first (more reliable)
            const prompt = `Provide a detailed technical explanation for: "${concept}"

Structure your response as follows:

## Definition
[Clear definition]

## Core Concepts
- Key point 1
- Key point 2
- Key point 3

## Practical Example
\`\`\`javascript
// Code example if applicable
\`\`\`

## Interview Tips
- Important consideration 1
- Important consideration 2

## Common Pitfalls
- What to avoid

Make it comprehensive and interview-focused.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are an expert technical interviewer. Provide detailed, structured explanations with examples and best practices."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.4,
                max_tokens: 1500,
            });

            const explanation = completion.choices[0]?.message?.content;
            
            if (!explanation) {
                throw new Error('No explanation generated');
            }

            console.log(`✅ Generated explanation for ${concept} using Groq`);
            
            res.status(200).json({
                success: true,
                explanation: explanation,
                model: 'Meta Llama 3.3 70B (via Groq)',
                sponsor: 'Meta'
            });

        } catch (aiError) {
            console.log('🔄 Groq API failed, trying Cerebras fallback:', aiError.message);
            
            try {
                // Fallback to Cerebras
                const prompt = `Provide a detailed technical explanation for: "${concept}"

Structure your response as follows:

## Definition
[Clear definition]

## Core Concepts
- Key point 1
- Key point 2
- Key point 3

## Practical Example
\`\`\`javascript
// Code example if applicable
\`\`\`

## Interview Tips
- Important consideration 1
- Important consideration 2

## Common Pitfalls
- What to avoid

Make it comprehensive and interview-focused.`;

                const completion = await cerebras.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: "You are an expert technical interviewer. Provide detailed, structured explanations with examples and best practices."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    model: "llama3.1-70b",
                    temperature: 0.4,
                    max_tokens: 1500,
                });

                const explanation = completion.choices[0]?.message?.content;
                
                if (!explanation) {
                    throw new Error('No explanation generated from fallback');
                }

                console.log(`✅ Generated explanation for ${concept} using Cerebras fallback`);
                
                res.status(200).json({
                    success: true,
                    explanation: explanation,
                    model: 'Llama 3.1 70B (via Cerebras - Fallback)',
                    sponsor: 'Cerebras'
                });

            } catch (fallbackError) {
                console.log('🔄 Both APIs failed, using enhanced fallback:', fallbackError.message);
                
                // Enhanced fallback explanations
                const explanations = {
                    'react': `React is a powerful JavaScript library for building user interfaces, developed by Meta (Facebook). 

**Core Principles:**
- Component-based architecture
- Virtual DOM for performance
- Unidirectional data flow
- Declarative programming style

**Key Features:**
- JSX syntax for writing components
- State management with hooks
- Props for component communication
- Lifecycle methods and effects

**Interview Topics:**
- Virtual DOM vs Real DOM
- State vs Props
- React Hooks (useState, useEffect, etc.)
- Component lifecycle
- Performance optimization`,
                    
                    'javascript': `JavaScript is a dynamic, interpreted programming language that powers modern web development.

**Core Concepts:**
- Dynamic typing and prototype-based OOP
- Event-driven and asynchronous programming
- First-class functions and closures
- Hoisting and scope management

**Key Features:**
- Variables: let, const, var
- Functions: regular, arrow, async
- Objects and arrays
- Promises and async/await
- Event loop and callbacks

**Interview Focus:**
- Closures and scope
- Asynchronous programming
- ES6+ features
- DOM manipulation
- Error handling`,
                    
                    'python': `Python is a high-level, interpreted programming language known for its simplicity and versatility.

**Key Characteristics:**
- Readable and clean syntax
- Dynamic typing with strong type system
- Extensive standard library
- Object-oriented and functional programming support

**Important Features:**
- List comprehensions and generators
- Decorators and context managers
- Multiple inheritance and metaclasses
- Exception handling
- Package management with pip

**Interview Topics:**
- Data structures (lists, dicts, sets)
- OOP concepts and inheritance
- Decorators and generators
- Memory management
- Popular frameworks (Django, Flask)`
                };
                
                const conceptLower = concept.toLowerCase();
                let explanation = explanations[conceptLower];
                
                if (!explanation) {
                    explanation = `**${concept}** is an important concept in software development.

**Overview:**
This topic is commonly discussed in technical interviews and represents fundamental knowledge that developers should understand.

**Key Areas to Study:**
- Core principles and definitions
- Practical applications and use cases
- Best practices and common patterns
- Performance considerations
- Integration with other technologies

**Interview Preparation:**
- Understand the fundamentals
- Practice with real examples
- Know common pitfalls
- Be ready to explain trade-offs
- Prepare code examples`;
                }
                
                res.status(200).json({
                    success: true,
                    explanation: explanation,
                    model: 'Enhanced Fallback System'
                });
            }
        }

    } catch (error) {
        console.error('❌ Error in explainConcept:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to generate explanation',
            error: error.message
        });
    }
};