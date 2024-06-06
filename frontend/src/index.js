import ReactDOM from 'react-dom/client';
import init from './init';
import './styles/App.scss';
import './styles/index.css';

const renderApp = async () => {
  const app = await init();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(app);
};

renderApp();
