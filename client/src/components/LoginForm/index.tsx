import { AxiosError } from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { useState, useCallback, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { requestLogin, setToken } from '../../services/api';
import style from './style.module.css';

function LoginForm() {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { username, password } = data;
  const handleChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [name]: value });
    },
    [data],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (pathname === '/register') {
        await requestLogin('/users', { username, password });
        navigate('/login');
      } else {
        const { token } = await requestLogin('/login', { username, password });
        setToken(token);
        localStorage.setItem('token', token);
        navigate('/balance');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err);
        if (err.response?.data.error) setError(err.response?.data.error);
        if (err.response?.data.message) setError(err.response?.data.message[0].message);
      }
    }
  };

  const open = Boolean(error);
  const handleClose = () => setError(null);

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label htmlFor="username">
        Usuário:
        <input type="text" name="username" id="username" onChange={handleChange} value={username} />
      </label>
      <label htmlFor="password">
        Senha:
        <input type="password" name="password" onChange={handleChange} value={password} />
      </label>
      <button className={style.button} type="submit">{(pathname === '/login') ? 'Login' : 'Registrar'}</button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </form>
  );
}

export default LoginForm;
