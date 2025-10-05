// models/questionModel.js

import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    default: "General",
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
  type: {
    type: String,
    enum: ["technical", "behavioral", "system design"],
    default: "technical",
  },
  note: {
    type: String,
    default: "",
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;