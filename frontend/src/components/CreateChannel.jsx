import React, { useState } from "react";
import axios from "axios";
import { setCurrentChannel } from "../slices/currentChannelSlice";
import { useDispatch, useSelector } from "react-redux";

const CreateChannel = ({ setShowModal, setActiveChannel }) => {
  const [error, setError] = useState(false);
  const [errName, setErrorName] = useState("");
  const [channelName, setChannelName] = useState("");
  const channels = useSelector((state) => state.channels.channels);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const closeModal = (e) => {
    e.stopPropagation();
    const target = e.target.closest(".modal-content");
    if (!target) {
      setShowModal(false);
    }
  };

  const close = () => {
    setShowModal(false)
  }

  const handleInput = (e) => {
    const isExistChannel = channels.flat().find((el) => el.name == e.target.value)

    setChannelName(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setError(true);
      setErrorName("От 3 до 20 символов");
    } else if (isExistChannel) {
      setError(true);
      setErrorName("Такой канал существует");
    } else {
      setError(false)
      setErrorName('')
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      try {
      const newChannel = { name: channelName };
      axios
        .post("/api/v1/channels", newChannel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setShowModal(false);
          setActiveChannel(response.data);
          dispatch(setCurrentChannel(response.data));
        });
    } catch (e) {
      console.log(e);
      setError(true);
      setErrorName(error);
    }
  };

  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show d-block"
        tabIndex="-1"
        onClick={(e) => closeModal(e)}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Добавить канал</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={close}
              ></button>
            </div>
            <div className="modal-body">
              <form className="" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <input
                    name="name"
                    id="name"
                    className={`mb-2 form-control ${error && "is-invalid"}`}
                    onChange={(e) => handleInput(e)}
                    value={channelName}
                    autoComplete="channel"
                    autoFocus
                  />
                  <label className="visually-hidden" htmlFor="name">
                    Имя канала
                  </label>
                  <div className="invalid-feedback">
                    {errName}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      onClick={close}
                      className="me-2 btn btn-secondary"
                    >
                      Отменить
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={error || !channelName}>
                      Отправить
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChannel;
