import React from 'react';
import { useTranslation } from 'react-i18next';

const ButtonsComponent = ({ onClick, formik }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-end">
      <button type="button" onClick={onClick} className="me-2 btn btn-secondary">
        {t('chat.cancel')}
      </button>
      <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
        {t('chat.send')}
      </button>
    </div>
  );
};

export default ButtonsComponent;
