import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx';
import { useSelector } from 'react-redux';


const App = () => {
  const token = useSelector(state => state.user.token);
  const isAuthorized = token ? true : false;

  return (
    <div className="App vh-100 bg-light">
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={ isAuthorized ? <Chat /> : <Login />}/>
        <Route path='/login' element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
