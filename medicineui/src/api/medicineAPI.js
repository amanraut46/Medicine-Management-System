import axios from 'axios';
const api = axios.create({
  baseURL: 'https://localhost:7292/api/Medicine',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;