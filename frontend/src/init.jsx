import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import leo from 'leo-profanity';
import {
  Provider as RollbarProvider,
  ErrorBoundary as ErrorBoundaryProvider,
} from '@rollbar/react';
import store from './store/store.js';
import App from './App';
import resources from './locales';

const rollbarConfig = {
  accessToken: process.env.ACCESS_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.init({
    debug: true,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

  const enWords = leo.getDictionary('en');
  const ruWords = leo.getDictionary('ru');

  leo.add(enWords);
  leo.add(ruWords);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundaryProvider>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <div className="h-100 d-flex flex-column justify-content-between">
              <App />
            </div>
          </Provider>
        </I18nextProvider>
      </ErrorBoundaryProvider>
    </RollbarProvider>
  );
};

export default init;
