import React from "react";

const Messages = ({ username, message}) => {

  return (
    <div className="text-break mb-2">
      <b>{ username }</b>
      : 
      { message }
    </div>
  )
}

export default Messages;
