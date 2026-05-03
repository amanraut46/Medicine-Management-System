import axios from 'axios';
const api = axios.create({
  baseURL: 'https://localhost:44305/api/Medicine',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;