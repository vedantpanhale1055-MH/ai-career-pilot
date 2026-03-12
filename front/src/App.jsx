import { useState } from "react";

const colors = [
  { border: "#00f5c4", glow: "rgba(0,245,196,0.15)", badge: "#00f5c4", text: "#001a12" },
  { border: "#7c6af7", glow: "rgba(124,106,247,0.15)", badge: "#7c6af7", text: "#fff" },
  { border: "#f7a06a", glow: "rgba(247,160,106,0.15)", badge: "#f7a06a", text: "#1a0a00" },
  { border: "#f76a9a", glow: "rgba(247,106,154,0.15)", badge: "#f76a9a", text: "#1a0010" },
];

const WeekCard = ({ week, theme, tasks, resource, milestone, index }) => {
  const c = colors[index % colors.length];
  return (
    <div className="card-hover" style={{
      background: `linear-gradient(135deg, #0d1117 60%, ${c.glow})`,
      border: `1px solid ${c.border}33`,
      boxShadow: `0 0 32px ${c.glow}, inset 0 1px 0 ${c.border}22`,
      borderRadius: 16, padding: 24,
      display: "flex", flexDirection: "column", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{
          background: c.badge, color: c.text,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
          padding: "4px 12px", borderRadius: 99, whiteSpace: "nowrap",
        }}>
          WEEK {week}
        </span>
        <h3 style={{ color: c.border, fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>
          {theme}
        </h3>
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "none" }}>
        {tasks.map((task, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#cbd5e1" }}>
            <span style={{
              marginTop: 6, width: 6, height: 6, borderRadius: "50%",
              background: c.border, flexShrink: 0, display: "inline-block"
            }} />
            {task}
          </li>
        ))}
      </ul>

      <div style={{
        background: `${c.border}0f`, border: `1px solid ${c.border}22`,
        borderRadius: 12, padding: "12px 16px",
      }}>
        <p style={{ color: c.border, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4 }}>
          📚 RESOURCE
        </p>
        <p style={{ color: "#cbd5e1", fontSize: 14 }}>{resource}</p>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12, padding: "12px 16px",
      }}>
        <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4 }}>
          🏁 MILESTONE
        </p>
        <p style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 500 }}>{milestone}</p>
      </div>
    </div>
  );
};

const Spinner = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "64px 0" }}>
    <div style={{ position: "relative", width: 64, height: 64 }}>
      <div className="spinner-outer" />
      <div className="spinner-inner" />
    </div>
    <p className="pulse-text" style={{ color: "#94a3b8", fontSize: 13, letterSpacing: "0.15em" }}>
      GENERATING YOUR ROADMAP…
    </p>
  </div>
);

export default function App() {
  const [currentSkill, setCurrentSkill] = useState("");
  const [targetGoal, setTargetGoal] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!currentSkill.trim() || !targetGoal.trim()) {
      setError("Please fill in both fields before generating.");
      return;
    }
    setError("");
    setRoadmap(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5500/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentSkill, targetGoal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      setRoadmap(data.roadmap);
    } catch (err) {
      setError(err.message || "Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060a10", fontFamily: "'DM Sans', sans-serif", color: "white" }}>

      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10%", left: "-5%", width: 384, height: 384, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,245,196,0.06) 0%, transparent 70%)", filter: "blur(40px)"
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", right: "-5%", width: 384, height: 384, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,106,247,0.07) 0%, transparent 70%)", filter: "blur(40px)"
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 99, fontSize: 11,
            fontWeight: 700, letterSpacing: "0.12em", marginBottom: 24,
            background: "rgba(0,245,196,0.08)", border: "1px solid rgba(0,245,196,0.2)", color: "#00f5c4"
          }}>
            ✦ AI-POWERED CAREER NAVIGATION
          </div>
          <h1 style={{
            fontSize: 52, fontWeight: 900, letterSpacing: "-0.02em",
            lineHeight: 1, marginBottom: 16,
            background: "linear-gradient(135deg, #fff 30%, #7c6af7 70%, #00f5c4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            AI Career Pilot
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 480, margin: "0 auto" }}>
            Enter your current role and target goal. Get a personalized 4-week roadmap to bridge the gap.
          </p>
        </div>

        {/* Input card */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)", borderRadius: 24, padding: 32, marginBottom: 40,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#94a3b8" }}>
                CURRENT SKILL / ROLE
              </label>
              <input
                type="text"
                placeholder="e.g. Junior Frontend Developer"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = "rgba(0,245,196,0.5)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 14,
                  outline: "none", caretColor: "#00f5c4", transition: "border-color 0.2s",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#94a3b8" }}>
                TARGET GOAL
              </label>
              <input
                type="text"
                placeholder="e.g. Full-Stack Engineer at a startup"
                value={targetGoal}
                onChange={(e) => setTargetGoal(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = "rgba(124,106,247,0.5)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 14,
                  outline: "none", caretColor: "#7c6af7", transition: "border-color 0.2s",
                }}
              />
            </div>
          </div>

          {error && (
            <div style={{
              marginBottom: 20, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#fca5a5",
              background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)"
            }}>
              ⚠ {error}
            </div>
          )}

          <button
            className="btn-main"
            onClick={handleGenerate}
            disabled={loading}
            style={{
              background: loading ? "rgba(0,245,196,0.1)" : "linear-gradient(135deg, #00f5c4, #7c6af7)",
              color: loading ? "#00f5c4" : "#060a10",
              boxShadow: loading ? "none" : "0 0 40px rgba(0,245,196,0.3)",
            }}
          >
            {loading ? "GENERATING…" : "✦ GENERATE MY ROADMAP"}
          </button>
        </div>

        {loading && <Spinner />}

        {roadmap && !loading && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, rgba(0,245,196,0.3))" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#64748b" }}>
                YOUR 4-WEEK ROADMAP
              </span>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(124,106,247,0.3), transparent)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {roadmap.map((item, index) => (
                <WeekCard key={item.week} {...item} index={index} />
              ))}
            </div>

            <p style={{ textAlign: "center", color: "#475569", fontSize: 11, marginTop: 40, letterSpacing: "0.15em" }}>
              GENERATED BY GEMINI · AI CAREER PILOT
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
