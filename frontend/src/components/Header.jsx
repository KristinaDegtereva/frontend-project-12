import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetToken, resetUserName } from '../slices/authSlice';

const Header = () => {
  const token = useSelector((state) => state.user.token);
  const isAuthorized = !!token;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetToken());
    dispatch(resetUserName());
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        {isAuthorized && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
