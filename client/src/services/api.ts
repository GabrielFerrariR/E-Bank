import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3001/"
});

const request = async () => await api.get('/');

export default request;