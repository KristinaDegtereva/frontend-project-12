import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../slices/currentChannelSlice';
import * as yup from "yup";
import { useFormik } from "formik";
import { Modal, Form } from "react-bootstrap";

const CreateChannel = ({ setShowModal, setActiveChannel }) => {
  const channels = useSelector((state) => state.channels.channels);

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const channelsNames = () => {
    return channels.map((el) => el.name);
  };
  const names = channelsNames();

  const close = () => {
    setShowModal(false);
  };

  const getSchema = () =>
    yup.object().shape({
      name: yup
        .string()
        .trim()
        .required("Обязательное поле")
        .min(3, "От 3-20 символов")
        .max(20, "От 3-20 символов")
        .notOneOf(names, "Должно быть уникальным"),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
      },
      validationSchema: getSchema(),
      onSubmit: async (values) => {
        console.log(values);
        try {
          const newChannel = { name: values.name };
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
        }
      },
    });

  return (
    <>
    <Modal show onHide={(e) => close(e)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              autoFocus
              className="mb-2"
              name="name"
              disabled={formik.isSubmitting}
            />
            <Form.Label visuallyHidden />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={close}
                className="me-2 btn btn-secondary"
              >
                Отменить
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                Отправить
              </button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  </>
);
};

export default CreateChannel;
