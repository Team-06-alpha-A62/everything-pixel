import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import Register from './views/Register/Register.jsx';
import Login from './views/Login/Login.jsx';
import { AuthProvider } from './providers/AuthProvider.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
