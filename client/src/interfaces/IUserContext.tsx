import React from 'react';

export default interface IUserContext {
  user: {
    username: string;
  }
  setUser :React.Dispatch<React.SetStateAction<{
    username: string;
  }>>;
}
