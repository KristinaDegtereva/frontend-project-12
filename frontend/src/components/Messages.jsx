import React from 'react';

const Messages = ({ username, message }) => (
  <div className="text-break mb-2">
    <b>{ username }</b>
    :
    {' '}
    {'\u00A0'}
    { message }
  </div>
);

export default Messages;
