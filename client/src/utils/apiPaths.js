// Base URL for all API requests
export const Base_url = "http://localhost:8000";

// API endpoint paths
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image"
  },
  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions",
    GENERATE_ANSWERS: "/api/ai/generate-answers",
    GENERATE_EXPLANATION: "/api/ai/explain-concept"
  },
  SESSION: {
    CREATE: "/api/sessions/create",
    GET_ALL: "/api/sessions/my-sessions",
    GET_ONE: (id) => `/api/sessions/${id}`,
    DELETE: (id) => `/api/sessions/${id}`
  },
  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add",
    PIN: (id) => `/api/questions/${id}/pin`,
    UPDATE_NOTES: (id) => `/api/questions/${id}/notes`,
    PINNED: '/api/questions/pinned',
    BASE: '/api/questions',
  }
};

// Export the API_PATHS object as default as well
export default API_PATHS;