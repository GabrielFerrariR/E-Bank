import { createContext } from 'react';
import IUserContext from '../interfaces/IUserContext';

const UserContext = createContext<IUserContext | null>(null);

export default UserContext;
