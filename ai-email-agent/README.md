# AI Email Management Agent

An AI-powered web application that analyzes emails and provides structured insights such as category, priority, summary, required action, and a suggested reply.

## Features

- Email classification
- Priority detection
- Email summarization
- Action/deadline extraction
- AI-generated reply suggestions
- Demo mode for testing without API credits

## Tech Stack

- React.js
- JavaScript
- Node.js
- Express.js
- OpenAI API
- Vite

## Workflow

```text
Email Input
    ↓
React Frontend
    ↓
Node.js / Express
    ↓
AI Model
    ↓
Email Analysis
    ↓
Category | Priority | Summary | Action | Reply
Setup
npm install

Create a .env file:

OPENAI_API_KEY=your_api_key_here

Start the backend:

node server/server.js

Start the frontend:

npm run dev
Demo Mode

The application includes a Demo Mode to demonstrate the complete workflow when live AI API access is unavailable.

Future Improvements
Gmail/Outlook integration
Automatic email processing
Email history and analytics
Human-approved automatic replies
Database integration

Author

Riya Diwakar