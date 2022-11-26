import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import style from './style.module.css';

export default function AppHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className={style.header}>
      <div className={style.icons_container}>
        <img src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt="ngcash" />
        <nav className={style.nav_container}>
          <Link to="/balance">Carteira</Link>
          <Link to="/transaction">Fazer Transferência</Link>
          <Link to="/history">Histórico</Link>
        </nav>
        <LogoutIcon sx={{ color: 'white' }} fontSize="large" onClick={handleLogout} />
      </div>
    </header>
  );
}
