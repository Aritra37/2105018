import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Assuming your backend server is running locally

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchNumbers = async (numberId) => {
  try {
    const response = await api.get(`/numbers/${numberId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching numbers:', error);
    throw error;
  }
};

export default {
  fetchNumbers,
};