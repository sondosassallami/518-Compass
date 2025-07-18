// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import SignUp from './Pages/SignUp';
import MainPage from './Pages/MainPage';
import About from './Pages/About';
import Feedback from './Pages/Feedback';
import UserProfile from './Pages/UserProfile';
import NotFound from './Pages/NotFound';
import ChatRooms from './Pages/ChatRooms';
import Map from './Pages/Map';              // ✅ Add this if you use <Map />
import CreatePost from './Pages/CreatePost'; // ✅ Missing import
import Search from './Pages/Search';         // ✅ Missing import

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/chatrooms" element={<ChatRooms />} />
        <Route path="/map" element={<Map />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
