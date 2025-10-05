// Fallback AI service with predefined questions
const questionTemplates = {
  'react': [
    {
      question: "What is React and what are its key features?",
      answer: "React is a JavaScript library for building user interfaces. Key features include virtual DOM, component-based architecture, JSX syntax, and unidirectional data flow.",
      topic: "React",
      type: "technical"
    },
    {
      question: "Explain the difference between state and props in React.",
      answer: "State is internal component data that can change, while props are external data passed from parent components that are read-only.",
      topic: "React",
      type: "technical"
    },
    {
      question: "What are React hooks and why are they useful?",
      answer: "React hooks are functions that let you use state and lifecycle features in functional components. They make code more reusable and easier to test.",
      topic: "React",
      type: "technical"
    }
  ],
  'javascript': [
    {
      question: "What is the difference between let, const, and var?",
      answer: "var has function scope and is hoisted, let has block scope, and const has block scope and cannot be reassigned.",
      topic: "JavaScript",
      type: "technical"
    },
    {
      question: "Explain closures in JavaScript.",
      answer: "A closure is when an inner function has access to variables from its outer function's scope even after the outer function has returned.",
      topic: "JavaScript",
      type: "technical"
    },
    {
      question: "What is the event loop in JavaScript?",
      answer: "The event loop is what allows JavaScript to perform non-blocking operations by handling asynchronous callbacks and promises.",
      topic: "JavaScript",
      type: "technical"
    }
  ],
  'python': [
    {
      question: "What are Python decorators?",
      answer: "Decorators are functions that modify or extend the behavior of other functions without changing their code directly.",
      topic: "Python",
      type: "technical"
    },
    {
      question: "Explain list comprehensions in Python.",
      answer: "List comprehensions provide a concise way to create lists using a single line of code with optional filtering conditions.",
      topic: "Python",
      type: "technical"
    },
    {
      question: "What is the difference between lists and tuples?",
      answer: "Lists are mutable and use square brackets, while tuples are immutable and use parentheses.",
      topic: "Python",
      type: "technical"
    }
  ],
  'machine learning': [
    {
      question: "What is the difference between supervised and unsupervised learning?",
      answer: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data.",
      topic: "Machine Learning",
      type: "technical"
    },
    {
      question: "Explain overfitting and how to prevent it.",
      answer: "Overfitting occurs when a model learns training data too well. Prevent it using cross-validation, regularization, and more data.",
      topic: "Machine Learning",
      type: "technical"
    },
    {
      question: "What is cross-validation?",
      answer: "Cross-validation is a technique to assess model performance by splitting data into training and validation sets multiple times.",
      topic: "Machine Learning",
      type: "technical"
    }
  ],
  'streamlit': [
    {
      question: "What is Streamlit and what are its main advantages?",
      answer: "Streamlit is a Python framework for building web apps quickly. Advantages include simplicity, rapid prototyping, and built-in widgets.",
      topic: "Streamlit",
      type: "technical"
    },
    {
      question: "How do you handle state in Streamlit applications?",
      answer: "Streamlit provides session state to maintain data across reruns, and caching decorators to optimize performance.",
      topic: "Streamlit",
      type: "technical"
    }
  ]
};

export const generateFallbackQuestions = (topics, numQuestions = 5, difficulty = 'medium') => {
  const allQuestions = [];
  
  topics.forEach(topic => {
    const topicLower = topic.toLowerCase();
    const matchingQuestions = questionTemplates[topicLower] || [];
    allQuestions.push(...matchingQuestions);
  });
  
  // If no matching questions, create generic ones
  if (allQuestions.length === 0) {
    for (let i = 0; i < numQuestions; i++) {
      allQuestions.push({
        question: `What are the key concepts in ${topics[0] || 'this technology'}?`,
        answer: `Key concepts include fundamental principles, best practices, and common patterns used in ${topics[0] || 'this field'}.`,
        topic: topics[0] || 'General',
        type: 'technical'
      });
    }
  }
  
  // Shuffle and limit to requested number
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions).map(q => ({
    ...q,
    difficulty
  }));
};