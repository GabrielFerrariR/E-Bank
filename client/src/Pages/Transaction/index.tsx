import AppFooter from '../../components/AppFooter';
import TransactionStepper from '../../components/TransactionStepper';
import style from './style.module.css';
import AppHeader from '../../components/AppHeader';

function Transaction() {
  return (
    <main className={style.main}>
      <AppHeader />
      <TransactionStepper />
      <AppFooter />
    </main>
  );
}

export default Transaction;
