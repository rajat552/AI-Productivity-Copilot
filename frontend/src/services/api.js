import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/ai';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const sendMessage = async (message) => {
    try {
        const response = await api.post('/chat', { message, userId: 'demo-user' });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('document', file);
    try {
        const response = await api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await api.get('/tasks');
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};

export const toggleTaskStatus = async (id) => {
    try {
        const response = await api.patch(`/tasks/${id}/toggle`);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default {
    sendMessage,
    uploadDocument,
    getTasks,
    toggleTaskStatus,
};
