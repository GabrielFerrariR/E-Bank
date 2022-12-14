import { ChangeEvent, useEffect, useState } from 'react';
import AppFooter from '../../components/AppFooter';
import AppHeader from '../../components/AppHeader';
import useTransactions from '../../hooks/useTransactions';
import ITransactions from '../../interfaces/ITransactions';
import style from './style.module.css';
import TransactionCard from '../../components/TransactionCard.';
import useAccount from '../../hooks/useAccount';

export default function History() {
  const [date, setDate] = useState('');
  const [currentList, setCurrentList] = useState<ITransactions[]>([]);
  const { transactions, cashInOnly, cashOutOnly } = useTransactions();
  const [toggle, setToggle] = useState(true);
  const { accountId } = useAccount();

  useEffect(() => {
    setCurrentList(transactions);
  }, [transactions]);

  const toggleFiltering = () => {
    if (toggle) setCurrentList(cashInOnly);
    if (!toggle) setCurrentList(cashOutOnly);
    setToggle((prev) => !prev);
  };

  const handleDateFiltering = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setDate(value);
    const filterByDate = transactions.filter((curr) => curr.createdAt.includes(value));
    setCurrentList(filterByDate);
  };

  return (
    <main className={style.main}>
      <AppHeader />
      <section>
        <div className={style.filter_options}>
          <label className={style.label} htmlFor="date">
            Buscar:
            <input type="date" name="date" id="date" value={date} onChange={handleDateFiltering} />
          </label>
          <div className={style.filter_btn_container}>
            <button className={style.button} type="button" onClick={() => setCurrentList(transactions)}>Todas</button>
            <button className={style.button} type="button" onClick={toggleFiltering}>{toggle ? 'Entradas ↓' : 'Saídas ↑'}</button>
          </div>
        </div>
        <section className={style.transactions_container}>
          {currentList.map(({
            id, createdAt, value, debitedAccount, creditedAccount,
            updatedAt,
          }) => (
            <TransactionCard
              key={id}
              id={id}
              account={accountId}
              value={value}
              debitedAccount={debitedAccount}
              creditedAccount={creditedAccount}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
          ))}
        </section>
      </section>
      <AppFooter />
    </main>
  );
}
