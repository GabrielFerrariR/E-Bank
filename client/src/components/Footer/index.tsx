import WalletIcon from '@mui/icons-material/Wallet';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageSearch from '@mui/icons-material/ManageSearch';
import style from './style.module.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <WalletIcon sx={{ color: 'white' }} fontSize="large" />
      <ImportExportIcon sx={{ color: 'white' }} fontSize="large" />
      <ManageSearch sx={{ color: 'white' }} fontSize="large" />
      <LogoutIcon sx={{ color: 'white' }} fontSize="large" />
    </footer>
  );
}

export default Footer;
