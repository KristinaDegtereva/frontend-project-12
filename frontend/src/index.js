import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import './i18n.js';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import App from './App';
import store from './store/store.js';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
);
