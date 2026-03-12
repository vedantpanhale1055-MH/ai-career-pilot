import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/generate", async (req, res) => {
  const { currentSkill, targetGoal } = req.body;

  if (!currentSkill || !targetGoal) {
    return res.status(400).json({ error: "currentSkill and targetGoal are required." });
  }

  const prompt = `
You are an expert career coach and learning strategist. A user wants to transition their career skills.

Current Skill/Role: "${currentSkill}"
Target Goal: "${targetGoal}"

Create a detailed, actionable 4-week skill roadmap to help them achieve this goal. For each week, provide:
- A clear weekly theme/focus
- 3-4 specific, actionable tasks or learning objectives
- A recommended resource (course, book, tool, or practice project)
- A milestone they should hit by end of week

Respond ONLY with a valid JSON array (no markdown, no explanation, just raw JSON) in this exact format:
[
  {
    "week": 1,
    "theme": "Foundation & Orientation",
    "tasks": ["Task 1", "Task 2", "Task 3"],
    "resource": "Specific resource name and where to find it",
    "milestone": "What the user should be able to do by end of this week"
  },
  {
    "week": 2,
    "theme": "...",
    "tasks": ["...", "...", "..."],
    "resource": "...",
    "milestone": "..."
  },
  {
    "week": 3,
    "theme": "...",
    "tasks": ["...", "...", "..."],
    "resource": "...",
    "milestone": "..."
  },
  {
    "week": 4,
    "theme": "...",
    "tasks": ["...", "...", "..."],
    "resource": "...",
    "milestone": "..."
  }
]
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const text = completion.choices[0]?.message?.content || "";
    console.log("Groq raw response:", text);
    const clean = text.replace(/```json|```/g, "").trim();
    const roadmap = JSON.parse(clean);
    res.json({ roadmap });
  } catch (err) {
    console.error("Groq API error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));