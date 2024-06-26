import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { apiRoutes } from '../routes';
import { useToken } from '../context/authContext';

const Input = ({ channelId }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { userName, token } = useToken();

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [channelId]);

  const handleMessage = (e) => {
    if (e.target.value.length > 0) {
      setMessage(e.target.value);
      setDisabled(false);
    } else {
      setDisabled(true);
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { body: message, channelId, username: userName };
    await axios.post(apiRoutes.messages(), newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setMessage('');
      })
      .catch((err) => {
        console.log(err);
        rollbar.error(t('rollbar.sendMessage'), e);
      });
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate="" className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label={t('chat.newMessage')}
            placeholder={t('chat.textInput')}
            className="border-0 p-0 ps-2 form-control"
            value={message}
            onChange={(e) => handleMessage(e)}
            ref={inputRef}
          />
          <button
            type="submit"
            disabled={disabled}
            className="btn btn-group-vertical"
            onClick={(e) => handleSubmit(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
              />
            </svg>
            <span className="visually-hidden">{t('chat.send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
