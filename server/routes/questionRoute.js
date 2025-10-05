import express from "express";
import { togglePinQuestion, updateQuestionNote, addQuestionsToSession } from "../contollers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";
import Question from "../models/questionModel.js";

const router = express.Router();

// Question routes
router.patch("/:id/pin", protect, togglePinQuestion);
router.patch("/:id/notes", protect, updateQuestionNote);
router.post("/add", protect, addQuestionsToSession);
router.get('/pinned', protect, async (req, res) => {
    try {
      const pinnedQuestions = await Question.find({
        user: req.user._id,  // Make sure this matches your user ID field name
        isPinned: true
      }).populate('session', 'title'); // Optionally populate session details
  
      res.json({ 
        success: true, 
        pinnedQuestions 
      });
    } catch (error) {
      console.error('Error fetching pinned questions:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch pinned questions' 
      });
    }
  });
  

export default router;