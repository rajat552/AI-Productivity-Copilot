const { BedrockRuntimeClient, ConverseCommand } = require("@aws-sdk/client-bedrock-runtime");

/**
 * Nova Service handles all direct interactions with Amazon Bedrock.
 * Uses the Converse API for Amazon Nova Lite model.
 */
class NovaService {
    constructor() {
        this.client = new BedrockRuntimeClient({
            region: process.env.AWS_REGION || "us-east-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.modelId = process.env.NOVA_MODEL_LITE || "amazon.nova-lite-v1:0";
    }

    /**
     * Core function to invoke Nova model via the Converse API
     * Supports multi-turn conversation history
     */
    async invokeNova(prompt, systemPrompt = "You are an AI Productivity Copilot.", history = []) {
        // If keys are missing, return mock data for development
        if (!process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID.includes('your_')) {
            return this.getMockResponse(prompt);
        }

        // Build multi-turn message history
        const messages = [];

        for (const msg of history) {
            messages.push({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                content: [{ text: msg.content }]
            });
        }

        // Add latest user prompt
        messages.push({ role: "user", content: [{ text: prompt }] });

        try {
            const command = new ConverseCommand({
                modelId: this.modelId,
                messages,
                system: [{ text: systemPrompt }],
                inferenceConfig: {
                    maxTokens: 2000,
                    temperature: 0.7,
                    topP: 0.9,
                },
            });

            const response = await this.client.send(command);
            return response.output.message.content[0].text;
        } catch (error) {
            console.error("Bedrock Converse API Error:", error.message);
            // Fallback to mock if Bedrock fails
            console.warn("Falling back to mock response.");
            return this.getMockResponse(prompt);
        }
    }

    async generateResponse(prompt, history = []) {
        return this.invokeNova(prompt, "You are an AI Productivity Copilot. Be helpful, concise, and actionable.", history);
    }

    async summarizeDocument(text) {
        const prompt = `Summarize the following document content concisely, highlighting key insights:\n\n${text}`;
        return this.invokeNova(prompt, "You are an expert document analyst. Provide clear, structured summaries.");
    }

    async generateTasks(text) {
        const prompt = `Based on the following content, extract actionable tasks.
Return ONLY a valid JSON array of objects with 'title' and 'description' fields. No extra text.
Content: ${text}`;
        const response = await this.invokeNova(prompt, "You are a task management specialist. Always respond with valid JSON only.");

        try {
            const jsonStr = response.match(/\[[\s\S]*\]/)?.[0] || response;
            return JSON.parse(jsonStr);
        } catch (e) {
            return [{ title: "Review content", description: "Analyze the provided information for action items" }];
        }
    }

    async planWorkflow(command) {
        const prompt = `Analyze this user command: "${command}".
Identify if it requires: 'summarization', 'task_generation', 'plan_schedule', 'draft_email', or 'general_chat'.
Return a JSON object: { "intents": ["intent1", "intent2"] }`;
        return this.invokeNova(prompt, "You are a workflow architect. Respond with valid JSON only.");
    }

    getMockResponse(prompt) {
        const lower = prompt.toLowerCase();
        if (lower.includes('summarize') || lower.includes('summary')) {
            return "This document discusses the implementation of AI agents using Amazon Nova models. Key points include: (1) Low-latency reasoning with Nova Lite, (2) Multi-step workflow automation, (3) Multimodal document understanding with Nova embeddings.";
        }
        if (lower.includes('task') || lower.includes('todo')) {
            return '[{"title":"Review project architecture","description":"Analyze the current system design and identify improvements"},{"title":"Set up CI/CD pipeline","description":"Configure automated deployment workflow"}]';
        }
        if (lower.includes('email') || lower.includes('draft')) {
            return "Subject: Project Update\n\nHi Team,\n\nI wanted to share a quick update on our progress. We've completed the initial architecture review and identified key areas for improvement.\n\nBest regards,\nAI Copilot";
        }
        if (lower.includes('schedule') || lower.includes('plan')) {
            return "📅 Optimized Schedule:\n\n9:00 AM - Review documentation\n10:00 AM - Team standup\n10:30 AM - Deep work: Core feature development\n12:00 PM - Lunch break\n1:00 PM - Code review & testing\n3:00 PM - Planning session\n4:30 PM - Wrap-up & notes";
        }
        return "I've analyzed your request. I can help you summarize documents, generate tasks, draft emails, plan schedules, and automate multi-step workflows. What would you like me to do?";
    }
}

module.exports = new NovaService();
