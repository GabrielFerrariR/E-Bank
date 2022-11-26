import WalletIcon from '@mui/icons-material/Wallet';

import ManageSearch from '@mui/icons-material/ManageSearch';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import moneyTransferIcon from '../../assets/images/moneyTransfer.svg';

function AppFooter() {
  const navigate = useNavigate();
  return (
    <footer className={style.footer}>
      <WalletIcon sx={{ color: 'white' }} fontSize="large" onClick={() => navigate('/balance')} />
      <button
        type="button"
        onClick={() => navigate('/transaction')}
        className={style.button}
      >
        <img src={moneyTransferIcon} alt="money transfer" />
      </button>
      <ManageSearch sx={{ color: 'white' }} fontSize="large" onClick={() => navigate('/history')} />
    </footer>
  );
}

export default AppFooter;
