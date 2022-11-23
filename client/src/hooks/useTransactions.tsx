import { useEffect, useState } from 'react';
import ITransactions from '../interfaces/ITransactions';
import { requestData, setToken } from '../services/api';

function useTransactions() {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setToken(token);
    const fetch = async () => {
      try {
        const data = await requestData('/transaction');
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  return transactions;
}

export default useTransactions;
