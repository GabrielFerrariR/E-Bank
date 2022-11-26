import useAccount from '../../hooks/useAccount';
import style from './style.module.css';
import AppFooter from '../../components/AppFooter';
import useTransactions from '../../hooks/useTransactions';
import TransactionCard from '../../components/TransactionCard.';
import AppHeader from '../../components/AppHeader';

function Balance() {
  const { account: { balance }, accountId } = useAccount();
  const { transactions } = useTransactions();

  return (
    <main className={style.main}>
      <AppHeader />
      <h1>Carteira:</h1>
      <section className={style.balance}>
        <p>Saldo em conta: </p>
        <h2>{ Number(balance).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</h2>
      </section>
      <h3>Transações Recentes</h3>
      <section className={style.history}>
        {transactions.map((t) => (
          <TransactionCard
            key={t.id}
            account={accountId}
            id={t.id}
            value={t.value}
            creditedAccount={t.creditedAccount}
            debitedAccount={t.debitedAccount}
            createdAt={t.createdAt}
            updatedAt={t.updatedAt}
          />
        )).slice(0, 5)}
      </section>
      <AppFooter />
    </main>
  );
}

export default Balance;
