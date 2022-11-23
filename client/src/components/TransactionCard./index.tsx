import { useEffect, useState } from 'react';
import ITransactions from '../../interfaces/ITransactions';
import { requestData } from '../../services/api';
import style from './style.module.css';

function TranscationCard({
  value, debitedAccountId, creditedAccountId, account, createdAt,
}: ITransactions & { account: number }) {
  const [addressee, setAdressee] = useState('');
  const isCashOut = debitedAccountId === account;
  const createdDate = new Date(createdAt);
  useEffect(() => {
    const fetch = (async () => {
      const { username } = isCashOut
        ? await requestData(`/users/${creditedAccountId}`)
        : await requestData(`/users/${creditedAccountId}`);
      setAdressee(username);
    });
    fetch();
  });

  return (
    <section>
      <h3>{addressee}</h3>
      <h2 className={isCashOut ? style.cashOut : style.CashIn}>{value}</h2>
      <p>{createdDate.toLocaleString()}</p>
    </section>
  );
}

export default TranscationCard;
