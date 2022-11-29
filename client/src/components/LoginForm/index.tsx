import { AxiosError } from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { useState, useCallback, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { requestLogin, setToken } from '../../services/api';
import style from './style.module.css';
import { visibilitySx, inputIconSx } from './styleSx';
import { useUserContext } from '../../context/Provider';

function LoginForm() {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useUserContext();

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
        if (user) user.setUser({ username });
        navigate('/balance');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data.error) setError(err.response?.data.error);
        if (err.response?.data.message) setError(err.response?.data.message[0].message);
      }
    }
  };

  const open = Boolean(error);
  const handleClose = () => setError(null);
  const togglePasswordVisbility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label htmlFor="username" className={style.label}>
        Usuário:
        <input type="text" name="username" id="username" onChange={handleChange} value={username} data-testid="username-input" />
        <PersonIcon sx={inputIconSx} />
      </label>
      <label htmlFor="password" className={style.label}>
        Senha:
        <input type={isPasswordVisible ? 'text' : 'password'} name="password" onChange={handleChange} value={password} data-testid="password-input" />
        <KeyIcon sx={inputIconSx} />
        {isPasswordVisible
          ? <VisibilityIcon sx={visibilitySx} onClick={togglePasswordVisbility} />
          : <VisibilityOffIcon sx={visibilitySx} onClick={togglePasswordVisbility} />}
      </label>
      <button className={style.button} type="submit">{(pathname === '/login') ? 'Login' : 'Registrar'}</button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </form>
  );
}

export default LoginForm;
