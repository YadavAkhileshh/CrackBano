# 🚀 CrackBano - AI-Powered Interview Preparation Platform

[![Meta Llama](https://img.shields.io/badge/Powered%20by-Meta%20Llama-00A86B?style=for-the-badge&logo=meta&logoColor=white)](https://llama.meta.com/)
[![Groq](https://img.shields.io/badge/API-Groq-FF6B35?style=for-the-badge)](https://groq.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)


## 🌟 Overview

CrackBano is an intelligent interview preparation platform that leverages **Meta's Llama 3.1 70B model** via Groq API to generate personalized interview questions, provide detailed explanations, and help candidates ace their technical interviews.

### 🏆 Hackathon Compliance
- **Sponsor Technology**: Meta Llama 3.1 70B (via Groq API)
- **AI Integration**: Advanced question generation and concept explanations
- **Innovation**: Personalized interview preparation with real-time AI feedback

## ✨ Key Features

### 🤖 AI-Powered Question Generation
- **Meta Llama Integration**: Utilizes Meta's Llama 3.1 70B model for intelligent question generation
- **Personalized Content**: Questions tailored to specific roles, experience levels, and topics
- **Multiple Difficulty Levels**: Beginner, intermediate, and advanced questions
- **Comprehensive Answers**: Detailed explanations for each question

### 🎯 Smart Interview Preparation
- **Role-Specific Questions**: Customized for different job positions
- **Topic Focusing**: Target specific technologies and concepts
- **Progress Tracking**: Monitor your preparation journey
- **Session Management**: Organize your study sessions

### 🔐 Secure User Management
- **JWT Authentication**: Secure login and registration
- **Profile Management**: Personalized user profiles
- **Session Persistence**: Resume your preparation anytime

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on all devices
- **Green Theme**: Professional and calming color scheme
- **Smooth Animations**: Enhanced user experience
- **Accessibility**: WCAG compliant design

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Groq SDK** - Meta Llama API integration

### AI Integration
- **Meta Llama 3.1 70B** - Large language model
- **Groq API** - High-performance inference
- **Custom Prompting** - Optimized for interview questions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB
- Groq API Key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/interviewace-pro.git
cd interviewace-pro
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Setup**

Create `.env` file in the server directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
NODE_ENV=production
```

4. **Start the application**
```bash
# Start server (from server directory)
npm start

# Start client (from client directory)
npm run dev
```

5. **Access the application**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

## 📱 Usage

### 1. **Create Account**
- Sign up with your email and create a profile
- Secure authentication with JWT tokens

### 2. **Create Interview Session**
- Select your target role (e.g., Frontend Developer, Data Scientist)
- Choose experience level (Junior, Mid-level, Senior)
- Pick topics to focus on (React, Python, Machine Learning, etc.)
- Set number of questions and difficulty

### 3. **AI-Generated Questions**
- Get personalized questions powered by Meta Llama
- Each question includes detailed answers and explanations
- Questions are tailored to your specific requirements

### 4. **Practice & Learn**
- Review questions and practice your answers
- Learn from comprehensive explanations
- Track your progress over multiple sessions

## 🤖 Meta Llama Integration

### Why Meta Llama?
- **Advanced Reasoning**: Superior understanding of technical concepts
- **Contextual Awareness**: Generates relevant, role-specific questions
- **Comprehensive Responses**: Detailed explanations and examples
- **Versatility**: Covers multiple programming languages and technologies

### Implementation Details
```javascript
// Example: Generating questions with Meta Llama
const completion = await groq.chat.completions.create({
  messages: [
    {
      role: "system",
      content: "You are an expert technical interviewer powered by Meta's Llama model."
    },
    {
      role: "user", 
      content: prompt
    }
  ],
  model: "llama-3.1-70b-versatile",
  temperature: 0.7,
  max_tokens: 2000,
});
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │────│   Express API   │────│   MongoDB       │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Groq API      │
                       │ (Meta Llama 3.1)│
                       └─────────────────┘
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### AI Services
- `POST /api/ai/generate-questions` - Generate interview questions
- `POST /api/ai/explain-concept` - Explain technical concepts

### Session Management
- `GET /api/sessions` - Get user sessions
- `POST /api/sessions` - Create new session
- `DELETE /api/sessions/:id` - Delete session

## 🎨 Design System

### Color Palette
- **Primary**: Emerald Green (#059669)
- **Secondary**: Green (#10B981) 
- **Accent**: Light Green (#34D399)
- **Background**: Dark Gradient
- **Text**: Light Gray (#F8FAFC)

### Typography
- **Display**: Outfit (Headings)
- **Body**: Inter (Content)
- **Code**: JetBrains Mono (Code blocks)

## 🚀 Deployment

### Production Build
```bash
# Build client
cd client
npm run build

# Start production server
cd ../server
npm start
```

### Environment Variables
```env
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb://...
JWT_SECRET=your-secret
GROQ_API_KEY=your-groq-key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Meta** for providing the powerful Llama 3.1 model
- **Groq** for high-performance AI inference
- **WeMakeDevs** community for support and inspiration

## 📞 Contact

- **Developer**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

<div align="center">


*Powered by Meta Llama 3.1 • Made with React & Node.js*

</div>