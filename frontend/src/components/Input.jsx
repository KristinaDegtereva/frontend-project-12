import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../slices/messagesSlice";

const Input = ({ channelId }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true)
  const userName = useSelector((state) => state.user.userName);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const handleMessage = (e) => {
    if (e.target.value.length > 0) {
      setMessage(e.target.value);
      setDisabled(false);
    } else {
      setDisabled(true);
      setMessage('')
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newMessage = { body: message, channelId: channelId, username: userName };
    await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setMessage('')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate="" className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            value=""
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
              ></path>
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
