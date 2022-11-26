import useAccount from '../../hooks/useAccount';
import style from './style.module.css';
import AppFooter from '../../components/AppFooter';
import useTransactions from '../../hooks/useTransactions';
import TransactionCard from '../../components/TransactionCard.';

function Balance() {
  const { account: { balance }, accountId } = useAccount();
  const transactions = useTransactions();

  return (
    <main className={style.main}>
      <header className={style.header}>
        <img src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt="ngcash" />
      </header>
      <h1>Carteira:</h1>
      <section className={style.balance}>
        <p>Saldo em conta: </p>
        <h2>{ Number(balance).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</h2>
      </section>
      <section className={style.history}>
        <h2>Histórico de transações</h2>
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
        ))}
      </section>
      <AppFooter />
    </main>
  );
}

export default Balance;
