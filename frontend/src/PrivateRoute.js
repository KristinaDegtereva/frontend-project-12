import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserName } from './slices/authSlice';
import { appPaths } from './routes';

const PrivateRoute = ({ children }) => {
  const token = useSelector(getUserName);
  if (!token) {
    return <Navigate to={appPaths.login()} />;
  }
  return children;
};

export default PrivateRoute;
