import { useEffect, useState } from 'react';
import IAccount from '../interfaces/IAccount';
import { requestData, setToken } from '../services/api';

function useAccount() {
  const [account, setAccount] = useState<IAccount>({
    id: 0,
    username: '',
    accountId: 0,
    account: {
      id: 0,
      balance: 0,
    },
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setToken(token);
    const fetch = async () => {
      try {
        const data = await requestData('/account/balance');
        setAccount(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  return account;
}

export default useAccount;
