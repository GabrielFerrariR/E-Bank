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
          <p>
            Ainda não é cadastrado?
            {' '}
            <Link className={style.anchor} to="/register">Cadastre-se</Link>
          </p>
        )
        : (
          <p>
            Ja é cadastrado?
            {' '}
            <Link className={style.anchor} to="/login">Efetue o login</Link>
          </p>
        )}
    </main>
  );
}

export default Login;
