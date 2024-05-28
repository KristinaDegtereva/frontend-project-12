import React from 'react';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

const ButtonComponent = ({ onClick, className }) => (
    <div className="d-flex justify-content-end">
        <button type="button" onClick={onClick} className={className}>
            {t('chat.cancel')}
        </button>
    </div>
);

export default ButtonComponent;
