import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import leo from 'leo-profanity';
import { setChannels } from '../../slices/channelSlice';
import 'react-toastify/dist/ReactToastify.css';
import getSchema from '../../validationSchema';

const RenameChannel = ({ setShowModal, channel }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const channelsNames = () => channels.map((el) => el.name);
  const names = channelsNames();

  const close = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '' || leo.clean(channel.name),
    },
    validationSchema: getSchema(names, t),
    onSubmit: async (values) => {
      try {
        const editedChannel = { name: values.name };
        await axios
          .patch(`/api/v1/channels/${channel.id}`, editedChannel, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setShowModal(false);
            const update = channels.map((el) => (el.id === response.data.id ? response.data : el));
            dispatch(setChannels(update));
            toast.success(t('toasts.successRename'));
          });
      } catch (e) {
        setShowModal(false);
        console.log(e);
        toast.error(t('toasts.errorRename'));
        rollbar.error('Rename channel', e);
      }
    },
  });

  return (
    <Modal show onHide={(e) => close(e)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              onChange={formik.handleChange}
              ref={inputRef}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              className="mb-2"
              name="name"
              disabled={formik.isSubmitting}
              autoFocus
            />
            <Form.Label className="visuallyHidden">{t('chat.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
            <Button
                type="button"
                variant="secondary"
                onClick={close}
                className="me-2"
              >
                {t('chat.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting}
              >
                {t('chat.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
