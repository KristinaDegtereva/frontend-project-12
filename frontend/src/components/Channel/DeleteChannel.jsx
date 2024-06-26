import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { setChannels, getChannels } from '../../slices/channelSlice';
import { getCurrentChannel } from '../../slices/currentChannelSlice';
import { removeMessages } from '../../slices/messagesSlice';
import 'react-toastify/dist/ReactToastify.css';
import { apiRoutes } from '../../routes';
import { useToken } from '../../context/authContext';

const DeleteChannel = ({ channel, setShowDeleteWindow, handleChannel }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const dispatch = useDispatch();

  const { token } = useToken();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);

  const defaultChannel = { id: '1', name: 'general', removable: false };

  const closeWindow = () => {
    setShowDeleteWindow(false);
  };

  const handleDelete = async () => {
    try {
      await axios
        .delete(`${apiRoutes.channels()}${channel.id}`, {
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
          toast.success(t('toasts.successRemove'));
        });
    } catch (e) {
      console.log(e);
      toast.error(t('toasts.errorRemove'));
      rollbar.error(t('rollbar.deleteChannel'), e);
    }
  };

  return (
    <Modal show centered onHide={closeWindow}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('chat.sure')}</p>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={closeWindow}
          >
            {t('chat.cancel')}
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            {t('chat.remove')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannel;
