import Question from '../models/questionModel.js';
import Session from '../models/Session.js';

// Create a new session and linked questions
// POST /api/sessions/create
// private access
export const createSession = async (req, res) => {
    const { title, description, role, experience, topicsToFocus, questions } = req.body;
    const userId = req.user._id;

    try {
        console.log('Creating session for user:', userId);
        
        // Create a new session
        const session = await Session.create({
            title,
            description,
            user: userId,
            role,
            experience,
            topicsToFocus
        });

        console.log('Session created, creating questions...');
        
        // Create questions and link them to the session
        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                    user: userId
                });
                return question._id;
            })
        );

        // Update the session with the created questions
        session.questions = questionDocs;
        await session.save();
        
        // Populate the questions in the response
        const populatedSession = await Session.findById(session._id).populate('questions');

        console.log('Session created successfully');
        res.status(201).json({ 
            message: "Session created successfully", 
            session: populatedSession, 
            success: true 
        });
    } catch (error) {
        console.error('Error in createSession:', error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Get all sessions for the authenticated user
// GET /api/sessions/my-sessions
// private access
export const getMySession = async (req, res) => {
    try {
        console.log('Fetching sessions for user:', req.user._id);
        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('questions');
            
        console.log('Found sessions:', sessions.length);
        res.status(200).json(sessions);
    } catch (error) {
        console.error('Error in getMySession:', error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Get a session by ID
// GET /api/sessions/:id
// private access
export const getSessionById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching session ${id} for user:`, req.user._id);
        
        const session = await Session.findOne({ 
            _id: id,
            user: req.user._id 
        }).populate({
            path: "questions",
            options: { sort: { isPinned: -1, createdAt: -1 } },
        }).exec();

        if (!session) {
            console.log('Session not found or access denied');
            return res.status(404).json({ 
                message: "Session not found or access denied", 
                success: false 
            });
        }

        console.log('Session found');
        res.status(200).json(session);
    } catch (error) {
        console.error('Error in getSessionById:', error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Delete a session by ID
// DELETE /api/sessions/:id
// private access
export const deleteSession = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting session ${id} for user:`, req.user._id);

        // Find and delete the session
        const session = await Session.findOneAndDelete({
            _id: id,
            user: req.user._id
        });

        if (!session) {
            console.log('Session not found or access denied');
            return res.status(404).json({ 
                message: "Session not found or access denied", 
                success: false 
            });
        }

        // Delete all questions associated with this session
        await Question.deleteMany({ session: id });

        console.log('Session and associated questions deleted');
        res.status(200).json({ 
            message: "Session deleted successfully", 
            success: true 
        });
    } catch (error) {
        console.error('Error in deleteSession:', error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};