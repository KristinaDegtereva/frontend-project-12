import React from 'react';
import { Form } from 'react-bootstrap';

const FormInput = ({
  name, type, placeholder, autoComplete, formik, err, label,
}) => (
  <Form.Group className="form-floating mb-3">
    <Form.Control
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      type={type}
      id={name}
      className="form-control"
      value={formik.values[name]}
      onChange={formik.handleChange}
      disabled={formik.isSubmitting}
      isInvalid={(formik.errors[name] && formik.touched[name]) || err}
    />
    <Form.Control.Feedback className="invalid-tooltip" style={{ width: 'unset' }}>
      {formik.errors[name]}
    </Form.Control.Feedback>
    <label className="form-label" htmlFor={name}>
      {label}
    </label>
  </Form.Group>
);

export default FormInput;
