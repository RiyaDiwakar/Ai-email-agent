import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("AI Email Agent Backend is running!");
});

app.post("/api/analyze-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5-mini",

      input: `
You are an AI Email Management Agent.

Analyze the following email and determine:

- category
- priority
- summary
- actionRequired
- suggestedReply

Email:
${email}
      `,

      text: {
        format: {
          type: "json_schema",
          name: "email_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              category: {
                type: "string",
              },
              priority: {
                type: "string",
                enum: ["Low", "Medium", "High"],
              },
              summary: {
                type: "string",
              },
              actionRequired: {
                type: "string",
              },
              suggestedReply: {
                type: "string",
              },
            },
            required: [
              "category",
              "priority",
              "summary",
              "actionRequired",
              "suggestedReply",
            ],
          },
        },
      },
    });

    console.log("OpenAI Response:", response.output_text);

    const analysis = JSON.parse(response.output_text);

    res.json({
      success: true,
      analysis: analysis,
    });

  } catch (error) {
    console.error("OpenAI Error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to analyze email",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});