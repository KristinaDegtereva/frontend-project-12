import React from 'react';
import { Navigate } from 'react-router-dom';
import { appPaths } from './routes';
import { useToken } from './context/authContext';

const PrivateRoute = ({ children }) => {
  const { token } = useToken();
  if (!token) {
    return <Navigate to={appPaths.login()} />;
  }
  return children;
};

export default PrivateRoute;
