import useAccount from '../../hooks/useAccount';
import style from './style.module.css';
import Footer from '../../components/Footer';
import useTransactions from '../../hooks/useTransactions';
import TranscationCard from '../../components/TransactionCard.';

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
        <h2>{ balance }</h2>
      </section>
      <section className={style.history}>
        <h2>Histórico de transações</h2>
        {transactions.map((t) => (
          <TranscationCard
            key={t.id}
            account={accountId}
            id={t.id}
            value={t.value}
            creditedAccountId={t.creditedAccountId}
            debitedAccountId={t.debitedAccountId}
            createdAt={t.createdAt}
            updatedAt={t.updatedAt}
          />
        ))}
      </section>
      <Footer />
    </main>
  );
}

export default Balance;
