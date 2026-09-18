import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(true);

  const handleAnalyze = async () => {
    if (!email.trim()) {
      setResult({
        error: "Please paste an email first.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    // Demo mode - works without an API
    if (demoMode) {
      setTimeout(() => {
        setResult({
          category: "Interview",
          priority: "High",
          summary:
            "You have been shortlisted for a Web Developer technical interview scheduled for tomorrow at 11:00 AM.",
          actionRequired:
            "Confirm your availability by today at 6:00 PM.",
          suggestedReply:
            "Dear HR Team,\n\nThank you for the opportunity. I am available for the technical interview tomorrow at 11:00 AM. I look forward to the discussion.\n\nBest regards,\nRiya",
        });

        setLoading(false);
      }, 1000);

      return;
    }

    // Live AI mode
    try {
      const response = await fetch(
        "http://localhost:5000/api/analyze-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setResult({
          error: data.error || "Something went wrong.",
        });
        return;
      }

      setResult(data.analysis);
    } catch (error) {
      setResult({
        error:
          "Unable to connect to the backend. Make sure the backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>AI Email Management Agent</h1>

        <p className="subtitle">
          Analyze and automate your emails with AI
        </p>

        <div className="mode">
          <span>
            Mode:{" "}
            <strong>
              {demoMode ? "Demo Mode" : "Live AI"}
            </strong>
          </span>

          <button
            className="mode-button"
            onClick={() => setDemoMode(!demoMode)}
          >
            Switch to {demoMode ? "Live AI" : "Demo Mode"}
          </button>
        </div>

        {demoMode && (
          <div className="demo-notice">
            Demo Mode is enabled. AI results are simulated for testing.
          </div>
        )}

        <div className="card">
          <label htmlFor="email">Paste your email</label>

          <textarea
            id="email"
            placeholder="Paste the email you want to analyze..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Email"}
          </button>

          {result && result.error && (
            <div className="error">
              {result.error}
            </div>
          )}

          {result && !result.error && (
            <div className="result">
              <h2>AI Analysis</h2>

              <div className="result-grid">
                <div className="result-item">
                  <span>Category</span>
                  <strong>{result.category}</strong>
                </div>

                <div className="result-item">
                  <span>Priority</span>
                  <strong>{result.priority}</strong>
                </div>
              </div>

              <div className="section">
                <h3>Summary</h3>
                <p>{result.summary}</p>
              </div>

              <div className="section">
                <h3>Action Required</h3>
                <p>{result.actionRequired}</p>
              </div>

            <div className="section">
  <div className="section-header">
    <h3>Suggested Reply</h3>

    <button
      className="copy-button"
      onClick={() =>
        navigator.clipboard.writeText(result.suggestedReply)
      }
    >
      Copy Reply
    </button>
  </div>

  <p className="reply">
    {result.suggestedReply}
  </p>
</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;