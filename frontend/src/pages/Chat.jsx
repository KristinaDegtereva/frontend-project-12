import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { setChannels } from '../slices/channelSlice';
import Header from '../components/Header';
import FieldMessages from '../components/FieldMessages';
import Channels from '../components/Channels';
import { setMessages } from '../slices/messagesSlice';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const getChannels = async (authToken) => {
    await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        dispatch(setChannels(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMessages = async (authToken) => {
    await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      dispatch(setMessages(response.data));
    })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getChannels(token);
    getMessages(token);
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
