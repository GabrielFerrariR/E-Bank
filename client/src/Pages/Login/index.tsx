import { Link, useLocation } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import style from './style.module.css';

function Login() {
  const { pathname } = useLocation();
  return (
    <main className={style.main}>
      <LoginForm />
      {(pathname === '/login')
        ? (
          <p>
            Ainda não é cadastrado?
            {' '}
            <Link to="/register">Cadastre-se</Link>
          </p>
        )
        : (
          <p>
            Ja é cadastrado?
            {' '}
            <Link to="/login">Efetue o login</Link>
          </p>
        )}
    </main>
  );
}

export default Login;
