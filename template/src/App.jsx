import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import Register from './views/Register/Register.jsx';
import Login from './views/Login/Login.jsx';
import { AuthProvider } from './providers/AuthProvider.jsx';
import NotFound from './views/NotFound/NotFound.jsx';
import Feed from './views/Feed/Feed.jsx';
import Publish from './views/Publish/Publish.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
