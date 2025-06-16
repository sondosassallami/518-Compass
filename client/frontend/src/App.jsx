import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';
import About from './Pages/About';
import Feedback from './Pages/Feedback';
import UserProfile from './Pages/UserProfile';
import NotFound from './Pages/NotFound';
import ChatRooms from './Pages/ChatRooms';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/chatrooms" element={<ChatRooms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
