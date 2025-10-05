import Question from "../models/questionModel.js";
import Session from "../models/Session.js";

//add additional ques to an existing session
//POST /api/questions/add
//private access
export const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    if(!sessionId || !questions || !Array.isArray(questions)) {
        return res
            .status(400)
            .json({ message: "Invalid request data" });
        }


    const userId = req.user._id;

    // Find the session
    const session = await Session.findById(sessionId);
    if (!session) {
      return res
        .status(404)
        .json({ message: "Session not found", success: false });
    }

    // Check if the session belongs to the user
    if (session.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({
          message:
            "You do not have permission to add questions to this session",
          success: false,
        });
    }

    // Create questions and link them to the session
    const questionDocs = await Question.insertMany(
      questions.map( (q) => ({
          session: sessionId,
          user: userId,
          question: q.question,
          answer: q.answer,
          topic: q.topic || 'General',
          difficulty: q.difficulty || 'medium',
          type: q.type || 'technical'
      })));

          



        
        
      

    // Update the session with the new questions
    session.questions.push(...questionDocs.map(q => q._id));
    // Save the session
    await session.save();

    res
      .status(201)
      .json({
        message: "Questions added successfully",
        success: true,
        questions: questionDocs,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Toggle pin status of a question
//POST /api/questions/:id/pin

export const togglePinQuestion = async (req, res) => {
  const questionId = req.params.id;


 try{
    // Find the question
    const question = await Question.findById(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found", success: false });
    }

    question.isPinned = !question.isPinned; // Toggle pin status
    await question.save(); // Save the updated question
    res
      .status(200)
      .json({
        message: `Question ${question.isPinned ? "pinned" : "unpinned"} successfully`,
        success: true,
        question,
      });

 } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Update question note
//POST /api/questions/:id/note
export const updateQuestionNote = async (req, res) => {
 

  try{
     
  const { note } = req.body;
  const question = await Question.findById(req.params.id);
  if (!question) {
    return res
      .status(404)
      .json({ message: "Question not found", success: false });
    }
    question.note = note || ""; // Update the note
    await question.save(); // Save the updated question
    res
      .status(200)
      .json({
        message: "Question note updated successfully",
        success: true,
        question,
      });


  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
