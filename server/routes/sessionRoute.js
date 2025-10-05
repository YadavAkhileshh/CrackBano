

import express from "express";
import {
    createSession,
    getMySession,
    getSessionById,
    deleteSession
} from "../contollers/sessionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Session routes
router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySession);
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSession);

export default router;