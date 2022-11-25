import React, { useContext, useMemo, useState } from 'react';
import { IChildren } from '../interfaces/IChildren';
import UserContext from './Context';

function Provider({ children } : IChildren) {
  const [user, setUser] = useState({
    username: '',
  });

  const values = useMemo(
    () => ({ user, setUser }),
    [user],
  );

  return (
    <UserContext.Provider value={values}>
      { children }
    </UserContext.Provider>
  );
}
const useUserContext = () => (useContext(UserContext));

export { Provider, useUserContext };
