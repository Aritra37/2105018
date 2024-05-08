const axios = require('axios');

const API_URL = 'http://localhost:9876';
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

module.exports = {
  fetchNumbers,
};