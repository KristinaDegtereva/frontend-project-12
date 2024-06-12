import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') === null ? '' : localStorage.getItem('token'));
  const [userName, setUsername] = useState(localStorage.getItem('username') === null ? '' : localStorage.getItem('username'));

  const saveToken = (newToken) => {
    setToken(newToken);
  };

  const saveUsername = (newName) => {
    setUsername(newName);
  };

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', userName);
  }, [token, userName]);

  const contextValue = useMemo(() => (
    {
      token,
      saveToken,
      userName,
      saveUsername,
    }), [token, saveToken, userName, saveUsername]);

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
