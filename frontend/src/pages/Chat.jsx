import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { setChannels } from '../slices/channelSlice';
import Header from '../components/Header';
import FieldMessages from '../components/Field';
import Channels from '../components/Channel/Channels';
import { setMessages } from '../slices/messagesSlice';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from '../api';

const Chat = () => {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const getChannels = async (authToken) => {
    try {
      const data = await fetchData('/api/v1/channels', authToken);
      dispatch(setChannels(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async (authToken) => {
    try {
      const data = await fetchData('/api/v1/channels', authToken);
      dispatch(setMessages(data));
    } catch (error) {
      console.log(error);
    }
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
              <FieldMessages />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Chat;
