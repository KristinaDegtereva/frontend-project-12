import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import imageNotfound from '../images/404.png';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="text-center">
        <h1 className="h4 text-muted mt-3">{t('notFound.notFoundPage')}</h1>
        <p className="text-muted">
          {t('notFound.youCanGo')}
          {' '}
          <a href="/">{t('notFound.linkToPage')}</a>
        </p>
        <img alt="Страница не найдена" className="img-fluid" src={imageNotfound} />
      </div>
    </div>
  );
};

export default NotFound;
