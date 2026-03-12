# 🚀 AI Career Pilot

An ultra-fast AI-powered career assistant designed to help students navigate their professional journey with instant guidance.

* 🎯 **Personalized Career Roadmaps**
* 💼 **Interview Preparation & Mock Questions**
* ⚡ **Instant AI Responses** powered by Groq LPU technology

---

## 🏗️ Architecture



```text
/front (Vite + React)     ← Frontend UI
    │
    │  HTTP POST /api/chat (JSON)
    │
/back (Node.js + Express)  ← Backend server on port 5000
    │
    │  Groq Cloud API
    │
Groq Llama-3 / Mixtral    ← Blazing fast AI processing