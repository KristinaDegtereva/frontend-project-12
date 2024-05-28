import React from 'react';
import { useTranslation } from 'react-i18next';

const ButtonComponent = ({ onClick, className }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-end">
      <button type="button" onClick={onClick} className={className}>
        {t('chat.cancel')}
      </button>
    </div>
  );
};

export default ButtonComponent;
