import { useEffect, useState } from 'react';
import ITransactions from '../../interfaces/ITransactions';
import { requestData } from '../../services/api';
import style from './style.module.css';

function TransactionCard({
  value, debitedAccount, creditedAccount, account, createdAt,
}: ITransactions & { account: number }) {
  const {
    user: { username: CreditedUsername },
  } = creditedAccount;
  const {
    id: debitedAccountId,
    user: { username: debitedAccountUserName },
  } = debitedAccount;
  const isCashOut = debitedAccountId === account;
  const createdDate = new Date(createdAt);

  return (
    <section>
      <h3>{isCashOut ? CreditedUsername : debitedAccountUserName }</h3>
      <h2 className={isCashOut ? style.cashOut : style.cashIn}>{Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
      <p>{createdDate.toLocaleString()}</p>
    </section>
  );
}

export default TransactionCard;
