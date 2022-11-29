import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import style from './style.module.css';

function Login() {
  const { pathname } = useLocation();
  return (
    <main className={style.main}>
      <h1>Bank</h1>
      <LoginForm />
      {(pathname === '/login')
        ? (
          <span>
            <p>
              Ainda não é cadastrado?
              {' '}
            </p>
            <Link className={style.anchor} to="/register">Cadastre-se</Link>
          </span>
        )
        : (
          <span>
            <p>
              Já é cadastrado?
              {' '}
            </p>
            <Link className={style.anchor} to="/login">Efetue o login</Link>
          </span>
        )}
    </main>
  );
}

export default Login;
