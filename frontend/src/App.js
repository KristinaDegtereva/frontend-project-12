import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx';
import Registration from './components/Registration.jsx';

const App = () => {
  const token = localStorage.getItem('token');
  const isAuthorized = !!token;

  return (
    <div className="App vh-100 bg-light">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={isAuthorized ? <Chat /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
