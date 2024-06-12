import './styles/App.scss';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx';
import Registration from './pages/Registration.jsx';
import PrivateRoute from './PrivateRoute.js';
import { appPaths } from './routes.js';

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <Routes>
        <Route path={appPaths.notFound()} element={<NotFound />} />
        <Route path={appPaths.chat()} element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path={appPaths.login()} element={<Login />} />
        <Route path={appPaths.signup()} element={<Registration />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
