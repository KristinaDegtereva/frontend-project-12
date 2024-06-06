import './styles/App.scss';
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx';
import Registration from './components/Registration.jsx';

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

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
