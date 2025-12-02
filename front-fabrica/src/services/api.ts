// src/services/api.ts
import axios from 'axios';
export default axios.create({ baseURL: 'http://localhost:3001' });