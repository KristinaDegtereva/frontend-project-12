import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import InputField from './Input';
import Messages from './Messages';
import { setMessages } from '../slices/messagesSlice';

const FieldMessages = () => {
  const currentChannel = useSelector((state) => state.currentChannel.currentChannel);
  const messages = useSelector((state) => state.messages.messages);
  const [messagesLocal, setMessagesLocal] = useState(null);

  const dispatch = useDispatch();

  const messageOfChannel = messages.flat().filter((el) => el.channelId === currentChannel.id);

  useEffect(() => {
    const socket = io();
    socket.on('newMessage', (payload) => {
      setMessagesLocal(payload);
    });

    return (next) => (action) => next(action);
  }, []);

  useEffect(() => {
    if (messagesLocal) {
      dispatch(setMessages(messagesLocal));
    }
  }, [messagesLocal]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel && currentChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {messageOfChannel.length}
            {' '}
            сообщений
          </span>
        </div>
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
        >
          {messageOfChannel.flat().length > 0 && (
            messages.flat().filter((el) => el.channelId === currentChannel.id).map((el) => (
              <Messages username={el.username} message={el.body} key={el.id} />
            ))
          )}
        </div>
        <InputField channelId={currentChannel && currentChannel.id} />
      </div>
    </div>
  );
};

export default FieldMessages;
