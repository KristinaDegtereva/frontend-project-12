import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import InputField from './Input';
import Messages from './Messages';
import { setMessages } from '../slices/messagesSlice';
import setupSocket from '../setUpSocket';

const FieldMessages = () => {
  const { t } = useTranslation();

  const currentChannel = useSelector((state) => state.currentChannel.currentChannel);
  const messages = useSelector((state) => state.messages.messages);
  const [messagesLocal, setMessagesLocal] = useState(null);

  const dispatch = useDispatch();

  const messageOfChannel = messages
    .flat()
    .filter((el) => el.channelId === currentChannel.id);

  useEffect(() => {
    setupSocket('newMessage', setMessagesLocal);
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
              {currentChannel && currentChannel.name}
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
