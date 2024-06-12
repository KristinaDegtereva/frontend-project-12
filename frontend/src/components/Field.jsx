import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import leo from 'leo-profanity';
import InputField from './Input';
import Messages from './Messages';
import { setMessages, getMessages } from '../slices/messagesSlice';
import { getCurrentChannel } from '../slices/currentChannelSlice';

const FieldMessages = () => {
  const { t } = useTranslation();

  const currentChannel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessages);
  const [messagesLocal, setMessagesLocal] = useState(null);

  const dispatch = useDispatch();

  const messageOfChannel = messages
    .flat()
    .filter((el) => el.channelId === currentChannel.id);

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
              {t('signs.sharp')}
              &nbsp;
              {currentChannel && leo.clean(currentChannel.name)}
            </b>
          </p>
          <span className="text-muted">
            {t(
              'chat.key',
              { count: messageOfChannel.length },
            )}
          </span>
        </div>
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
        >
          {messageOfChannel
            .flat()
            .length > 0 && (
            messages
              .flat()
              .filter((el) => el.channelId === currentChannel.id).map((el) => (
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
