const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    userId: { type: String, default: 'demo-user' },
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
    intents: [String], // Intelligently track what we were talking about
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
