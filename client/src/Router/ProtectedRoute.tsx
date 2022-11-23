import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IChildren } from '../interfaces/IChildren';
import { validateLogin, setToken } from '../services/api';

function ProtectedRoute({ children }: IChildren) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  try {
    setToken(token);
    validateLogin();
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return (<>{ children }</>);
  } catch (error) {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
