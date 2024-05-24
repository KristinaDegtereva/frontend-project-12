import React from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { setChannels } from "../slices/channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeMessages } from "../slices/messagesSlice";

const DeleteChannel = ({ channel, setShowDeleteWindow, handleChannel }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const channels = useSelector((state) => state.channels.channels);
  const currentChannel = useSelector((state) => state.currentChannel.currentChannel
  );

  const defaultChannel = { id: "1", name: "general", removable: false };
  const closeWindow = () => {
    setShowDeleteWindow(false);
  };

  const handleDelete = async () => {
    try {
      await axios
        .delete(`/api/v1/channels/${channel.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setShowDeleteWindow(false);
          const update = channels.filter((el) => el.id !== response.data.id);
          dispatch(removeMessages(currentChannel.id));
          dispatch(setChannels(update));
          handleChannel(defaultChannel);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal show centered onHide={closeWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">Уверены?</p>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-2 btn btn-secondary"
              onClick={closeWindow}
            >
              Отменить
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Удалить
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteChannel;
