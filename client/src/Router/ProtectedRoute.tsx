import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { IChildren } from '../interfaces/IChildren';
import { validateLogin, setToken } from '../services/api';

function ProtectedRoute({ children }: IChildren) {
  const [isValid, setIsValid] = useState(true);
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  setToken(token);
  validateLogin().catch(() => {
    setIsValid(false);
  });
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isValid ? (<>{ children }</>) : <Navigate to="/login" />;
}

export default ProtectedRoute;
