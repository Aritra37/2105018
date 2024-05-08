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
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch numbers: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching numbers:', error);
    throw error;
  }
};

module.exports = {
  fetchNumbers,
};