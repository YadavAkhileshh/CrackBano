// models/sessionModel.js

import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  topicsToFocus: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  }],
}, {
  timestamps: true,
});

// Prevent overwriting if model already exists
const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;