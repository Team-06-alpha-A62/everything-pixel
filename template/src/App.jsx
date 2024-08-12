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
import SinglePostDetails from './views/SinglePostDetails/SinglePostDetails.jsx';
import EditPost from './views/EditPost/EditPost.jsx';
import Profile from './views/Profile/Profile.jsx';
import Authenticated from './hoc/Authenticated/Authenticated.jsx';

function AppContent() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Routes that require authentication */}
        <Route
          path="/feed"
          element={
            <Authenticated>
              <Feed />
            </Authenticated>
          }
        />
        <Route
          path="/publish"
          element={
            <Authenticated>
              <Publish />
            </Authenticated>
          }
        />
        <Route
          path="/profile/*"
          element={
            <Authenticated>
              <Profile />
            </Authenticated>
          }
        />
        <Route
          path="/post/:id"
          element={
            <Authenticated>
              <SinglePostDetails />
            </Authenticated>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Authenticated>
              <EditPost />
            </Authenticated>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
