import { useEffect, useState } from 'react';
import ITransactions from '../interfaces/ITransactions';
import { requestData, setToken } from '../services/api';

function useTransactions() {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [cashOutOnly, setCashOutOnly] = useState<ITransactions[]>([]);
  const [cashInOnly, setCashInOnly] = useState<ITransactions[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setToken(token);
    const fetch = async () => {
      try {
        const allTransactions = await requestData('/transaction');
        const onlyCashOut = await requestData('/transaction/cashout');
        const onlyCashIn = await requestData('/transaction/cashin');
        setTransactions(allTransactions);
        setCashOutOnly(onlyCashOut);
        setCashInOnly(onlyCashIn);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  return { transactions, cashInOnly, cashOutOnly };
}

export default useTransactions;
