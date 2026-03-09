# 🤖 AI Productivity Copilot

> **An Agentic AI Assistant powered by Amazon Nova models that understands commands, reasons about tasks, and automates multi-step productivity workflows.**

Built for the **AWS Hackathon 2026** 🏆

---

## 🎯 What It Does

AI Productivity Copilot is not just a chatbot — it's an **AI Agent** that:

1. **Understands** natural language commands via Amazon Nova 2 Lite
2. **Reasons** about user intent (summarize? plan? draft email?)
3. **Plans** a multi-step execution strategy
4. **Executes** each step sequentially (summarize → extract tasks → save to DB)
5. **Returns** structured, actionable results

### Example Workflow

```
User: "Summarize this document and create tasks from it"

Agent Thinking:
  → Intent detected: [summarize_document, generate_tasks]
  → Step 1: Parse document with Nova reasoning
  → Step 2: Generate structured summary
  → Step 3: Extract actionable tasks as JSON
  → Step 4: Save tasks to MongoDB
  → Return combined result
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **AI Engine** | Amazon Nova 2 Lite (via AWS Bedrock Converse API) |
| **Voice** | Web Speech API (Nova Sonic ready) |
| **Embeddings** | Amazon Titan Embed Text v2 |
| **Agent Sim** | Nova Act workflow simulation |
| **Frontend** | React + Vite + Tailwind CSS v4 |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Animations** | Framer Motion |

---

## ✨ Key Features

### 🧠 Agentic Workflow Engine
- Multi-step command execution with intent detection
- Sequential task planning and execution
- Real-time execution logs (Nova Act simulation)

### 💬 AI Chat Interface
- Conversational memory (remembers last 6 messages)
- Multi-turn context awareness
- Voice input via Web Speech API

### 📄 Document Intelligence
- PDF & text file upload with drag-and-drop
- AI-powered document summarization
- Automatic task extraction from documents

### ✅ Smart Task Pipeline
- AI-generated tasks saved to MongoDB
- Toggle task status (pending ↔ completed)
- Real-time pipeline sync with chat

### 🌓 Premium UI/UX
- Dark/Light mode toggle with smooth transitions
- Glassmorphism design with backdrop blur
- Micro-animations and hover effects
- Fully responsive layout

---

## 📂 Project Structure

```
AI-Productivity-Copilot/
├── frontend/                    # React + Vite
│   └── src/
│       ├── components/          # Navbar, ChatWindow, TaskPanel, etc.
│       ├── pages/               # Home, Dashboard, Documents, Tasks
│       ├── hooks/               # useChat, useVoiceInput
│       ├── services/            # API layer (axios)
│       └── context/             # ThemeContext
│
├── backend/                     # Node.js + Express
│   ├── server.js                # Entry point
│   └── src/
│       ├── controllers/         # aiController.js
│       ├── services/            # novaService.js, workflowService.js
│       ├── models/              # Task.js, Conversation.js
│       ├── routes/              # aiRoutes.js
│       └── middleware/          # errorHandler.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- AWS account with Bedrock access

### 1. Clone the repo
```bash
git clone https://github.com/rajat552/AI-Productivity-Copilot.git
cd AI-Productivity-Copilot
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ai-productivity-copilot
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
NOVA_MODEL_LITE=amazon.nova-lite-v1:0
```

Start the server:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173** 🚀

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ai/chat` | Send a command to the AI agent |
| `POST` | `/api/ai/upload` | Upload a document for analysis |
| `GET` | `/api/ai/tasks` | Retrieve all tasks |
| `POST` | `/api/ai/tasks` | Create a new task |
| `PATCH` | `/api/ai/tasks/:id/toggle` | Toggle task status |

---

## 🧪 Example Commands

| Command | What the Agent Does |
|---------|-------------------|
| "Summarize this document" | Generates a concise summary |
| "Create tasks from this" | Extracts action items and saves to DB |
| "Draft an email about the project" | Generates a professional email |
| "Plan my schedule for tomorrow" | Creates an optimized daily schedule |
| "Summarize and create tasks" | Multi-step: summarize + extract tasks |

---

## 🏗️ Amazon Nova Integration

### Nova 2 Lite (Reasoning)
Used for intent detection, summarization, task extraction, and general conversation via the **Bedrock Converse API**.

### Nova Sonic (Voice)
Web Speech API captures voice → transcribed text sent to Nova Lite for processing.

### Nova Act (Workflow Simulation)
The Activity Feed panel simulates Nova Act's multi-step UI automation by logging each reasoning and execution step in real-time.

### Titan Embeddings
Pre-configured for future RAG (Retrieval-Augmented Generation) document search capabilities.

---

## 👨‍💻 Author

**Rajat Aggarwal**
- GitHub: [@rajat552](https://github.com/rajat552)

---

## 📄 License

This project is built for the AWS Hackathon 2026.
