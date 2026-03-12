# 🚀 AI Career Pilot

An AI-powered full-stack web app that generates a personalized **4-week skill roadmap** based on your current role and target career goal.

![AI Career Pilot](https://img.shields.io/badge/AI-Career%20Pilot-00f5c4?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Groq](https://img.shields.io/badge/Groq-LLaMA3-F55036?style=for-the-badge)

---

## ✨ Features

- 🎯 Enter your **current skill/role** and **target goal**
- 🤖 AI generates a **4-week personalized roadmap**
- 📚 Each week includes **tasks, resources and milestones**
- ⚡ Powered by **Groq API** (super fast AI responses)
- 🌙 Beautiful **dark themed** dashboard UI
- 📱 Fully **responsive** design

---

## 🛠️ Tech Stack

| Layer     | Technology               |
|-----------|--------------------------|
| Frontend  | React 18 + Vite          |
| Styling   | Pure CSS + Inline Styles |
| Backend   | Node.js + Express        |
| AI Model  | Groq API (LLaMA 3.3)     |

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+ → [nodejs.org](https://nodejs.org)
- Groq API Key → [console.groq.com](https://console.groq.com)

### 1. Clone the repository
```bash
git clone https://github.com/YOURUSERNAME/ai-career-pilot.git
cd ai-career-pilot
```

### 2. Setup Backend
```bash
cd back
npm install
```

Create a `.env` file inside the `back` folder:
```
GROQ_API_KEY=your_groq_api_key_here
PORT=5500
```

Start the backend:
```bash
npm run dev
```
✅ Server runs at `http://localhost:5500`

### 3. Setup Frontend
Open a new terminal:
```bash
cd front
npm install
npm run dev
```
✅ App runs at `http://localhost:5173`

### 4. Open the App
```
http://localhost:5173
```

---

## 📁 Project Structure

```
ai-career-pilot/
├── back/
│   ├── .env              ← Your Groq API key (never committed)
│   ├── server.js         ← Express server + Groq API
│   └── package.json
├── front/
│   ├── src/
│   │   ├── App.jsx       ← Main UI component
│   │   ├── main.jsx      ← React entry point
│   │   └── index.css     ← Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🔌 API Reference

**POST** `/api/generate`

Request:
```json
{
  "currentSkill": "Python Beginner",
  "targetGoal": "Data Scientist"
}
```

Response:
```json
{
  "roadmap": [
    {
      "week": 1,
      "theme": "Foundation & Orientation",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "resource": "Resource name and link",
      "milestone": "What you can do by end of week"
    }
  ]
}
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key from console.groq.com |
| `PORT` | Backend port (default: 5500) |

> ⚠️ Never commit your `.env` file — it is protected by `.gitignore`

---

## 🚀 Running Again After Closing

**Terminal 1 — Backend:**
```bash
cd back
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd front
npm run dev
```

Then open `http://localhost:5173` 🎉

---

## 👨‍💻 Built With

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Express](https://expressjs.com)
- [Groq SDK](https://console.groq.com)
- [LLaMA 3.3 70B](https://groq.com)

---

## 📄 License

MIT License — feel free to use and modify!

<!-- THIS LINE MUST STAY LAST -->

A full-stack app that generates a 4-week personalized skill roadmap using the Google Gemini API.

---

## 📁 Project Structure

```
ai-career-pilot/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env          ← Add your Gemini API key here
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## ⚡ Quick Start

### 1. Get a Gemini API Key
Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) and create a free key.

### 2. Setup the Backend

```bash
cd backend
npm install
```

Edit `.env` and replace `your_gemini_api_key_here` with your actual key:
```
GEMINI_API_KEY=AIza...your_key_here
PORT=3001
```

Start the server:
```bash
npm run dev
# or: npm start
```

Server runs at → `http://localhost:3001`

### 3. Setup the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## 🎯 How It Works

1. User enters their **Current Skill/Role** and **Target Goal**
2. Frontend POSTs to `/api/generate` on the Express backend
3. Backend sends a structured prompt to Gemini 1.5 Flash
4. Gemini returns a JSON array of 4 weekly plans
5. Frontend maps over the array and renders beautiful week cards

## 🔌 API Endpoint

**POST** `http://localhost:3001/api/generate`

Request body:
```json
{
  "currentSkill": "Junior Frontend Developer",
  "targetGoal": "Full-Stack Engineer at a startup"
}
```

Response:
```json
{
  "roadmap": [
    {
      "week": 1,
      "theme": "Foundation & Orientation",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "resource": "...",
      "milestone": "..."
    },
    ...
  ]
}
```