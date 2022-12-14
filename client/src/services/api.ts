import axios from 'axios';
import UserRequest from '../interfaces/UserRequest';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const setToken = async (token: string) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (param: string, body: UserRequest) => {
  const { data } = await api.post(`${param}`, body);
  return data;
};

export const validateLogin = async () => {
  const { data } = await api.post('/login/validate');
  return data;
};

export const requestData = async (param: string) => {
  const { data } = await api.get(`${param}`);
  return data;
};

export const requestTransfer = async (body: { addressee: string, amount: number }) => {
  const { data } = await api.post('/transaction', body);
  return data;
};
