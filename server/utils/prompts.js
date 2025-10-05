 export  const questionAnswerPrompt = (role,experience,topicsToFocus,numberOfQuestions) => (`
    You are an AI trained to generate interview questions and answers.
    
    Task:
    -Role:${role}
    -Candidate Experience:${experience} years
    -Focus Topics:${topicsToFocus}
    -Write ${numberOfQuestions} interview.
    -For each question, generate a detailed but beginner-friendly answer.
    -If the answer needs a code example, add a small code block inside.
    -Keep formatting very clean.
    -Return a pure JSON array like:
    [
    {
        "question": "What is the difference between var, let, and const in JavaScript?",
        "answer": "In JavaScript, 'var' declares a variable that is function-scoped or globally-scoped, 'let' declares a block-scoped variable that can be reassigned, and 'const' declares a block-scoped variable that cannot be reassigned after its initial assignment."
    },
    '''
    ]
    Important:Do NOT add any extra text. Only return valid JSON`)

   export   const conceptExplainPrompt=(question)=>`
        You are an AI trained to generate explainations for a given interview questions.

        Task:

        -Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
        -Question: "${question}"
        -After the explaination , provide a short and clear title that summarizes the concept for the article or page heading.
        -If the explaination includes a code example ,provide a small code block.
        -Keep formatting very clean and clear.
        -Return the result as a valid JSON object in the following format:
        {
        "title": "Short and clear title here",
        "explanation": "Detailed explaination of the concept here"
        }

        Important:Do NOT add any extra text outside the JSON format. Only return valid JSON.

    `;

  