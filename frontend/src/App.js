import './styles/App.scss';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx';
import Registration from './components/Registration.jsx';
import PrivateRoute from './routes.js';

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
