import React from 'react';
import { useTranslation } from 'react-i18next';

const ChannelButtonComponent = ({
  activeChannelId, channel, handleChannel, isButton = false, children,
}) => {
  const { t } = useTranslation();
  const Component = isButton ? 'button' : 'div';
  return (
    <Component
      type="button"
      className={`w-100 rounded-0 text-start btn ${Number(activeChannelId) === Number(channel.id) && 'btn-secondary'}`}
      onClick={() => handleChannel(channel)}
    >
      <span className="me-1">
        {t('signs.sharp')}
      </span>
      {children || channel.name}
    </Component>
  );
};

export default ChannelButtonComponent;
