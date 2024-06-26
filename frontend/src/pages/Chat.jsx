import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { setChannels } from '../slices/channelSlice';
import Header from '../components/Header';
import Field from '../components/Field';
import Channels from '../components/Channel/Channels';
import { setMessages } from '../slices/messagesSlice';
import 'react-toastify/dist/ReactToastify.css';
import { apiRoutes } from '../routes';
import { useToken } from '../context/authContext';
import fetchData from '../api';

const Chat = () => {
  const { token } = useToken();
  const dispatch = useDispatch();

  const getChannels = () => {
    fetchData(apiRoutes.channels(), setChannels, token, dispatch);
  };

  const getMessages = () => {
    fetchData(apiRoutes.messages(), setMessages, token, dispatch);
  };

  useEffect(() => {
    getChannels();
    getMessages();
  }, [token]);

  return (
    <>
      <Header />
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <Channels />
              <Field />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Chat;
