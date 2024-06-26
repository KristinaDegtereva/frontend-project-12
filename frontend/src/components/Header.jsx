import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resetToken, resetUserName } from '../slices/authSlice';
import { appPaths } from '../routes';
import { useToken } from '../context/authContext';

const Header = () => {
  const { t } = useTranslation();
  const { token, saveToken, saveUsername } = useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetToken());
    dispatch(resetUserName());
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    saveToken('');
    saveUsername('');
    navigate(appPaths.chat());
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('header.hexlet')}
        </a>
        {token && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            {t('header.exit')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
