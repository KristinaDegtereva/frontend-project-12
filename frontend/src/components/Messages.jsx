import React from 'react';
import leo from 'leo-profanity';

const Messages = ({ username, message }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    :
    {'\u00A0'}
    {leo.clean(message)}
  </div>
);

export default Messages;
