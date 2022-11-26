import { useEffect, useState } from 'react';
import { useUserContext } from '../context/Provider';
import IAccount from '../interfaces/IAccount';
import { requestData } from '../services/api';

function useUsers() {
  const userContext = useUserContext();
  const [users, setUsers] = useState<Omit<IAccount, 'account'>[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Omit<IAccount, 'account'>[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await requestData('/users');
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (userContext) {
      const filter = users.filter((user) => userContext.user.username !== user.username);
      setFilteredUsers(filter);
    }
  }, [users, userContext]);

  return { users, filteredUsers };
}

export default useUsers;
