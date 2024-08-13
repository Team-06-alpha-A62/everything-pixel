import styles from './Profile.module.scss';
import { useAuth } from '../../providers/useAuth.js';
import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faUser,
  faUserGroup,
  faBookmark,
  faGear,
  faUsers,
  faTableCellsRowLock,
} from '@fortawesome/free-solid-svg-icons';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo.jsx';
import MyPosts from '../../components/MyPosts/MyPosts.jsx';
import EditProfile from '../../components/EditProfile/EditProfile.jsx';
import SavedPosts from '../../components/SavedPosts/SavedPosts.jsx';
import Follows from '../../components/Follows/Follows.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import { getUserByHandle } from '../../services/users.service.js';
import Users from '../../components/Users/Users.jsx';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader.jsx';
import UserDetails from '../../components/UserDetails/UserDetails.jsx';
import Suspended from '../../components/Suspended/Suspended.jsx';
import Notifications from '../../components/Notifications/Notifications.jsx';
import Lottie from 'lottie-react';
import animationData from '../../assets/pacman-loading-animation.json';

const Profile = () => {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [user, setUser] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByHandle(currentUser.userData?.username);
        setUser(userData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();

    setTimeout(() => {
      setIsLoadingAvatar(false);
    }, 1000);
  }, [currentUser.userData]);

  const handleUserUpdate = updatedUserData => {
    setUser(updatedUserData);
  };

  if (!user) {
    return (
      <div className={styles['animation-container']}>
        <Lottie
          animationData={animationData}
          className={styles['lottie-animation']}
        />
      </div>
    );
  }

  return (
    <div className={styles['profile-container']}>
      <ProfileHeader user={user} isLoadingAvatar={isLoadingAvatar} />

      <div className={styles['main-content']}>
        <nav
          className={`${styles['profile-side-bar']} ${
            currentUser.userData?.role === 'admin' ? styles['admin'] : ''
          }`}
        >
          <ul>
            <li>
              <NavLink
                to="/profile/general"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faUser} />
                General
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/notifications"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faUser} />
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/my-posts"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faFolder} />
                My Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/saved-posts"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faBookmark} />
                Saved Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/follows"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faUserGroup} />
                Follows
              </NavLink>
            </li>
            {currentUser.userData?.role === 'admin' && (
              <>
                <li>
                  <NavLink
                    to="/profile/users"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    <FontAwesomeIcon icon={faUsers} />
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile/suspended"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    <FontAwesomeIcon icon={faTableCellsRowLock} />
                    Suspended
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/profile/edit"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faGear} />
                Edit Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles['content']}>
          <Routes>
            <Route element={<ProfileInfo />} />
            <Route path="general" element={<ProfileInfo user={user} />} />
            <Route
              path="notifications"
              element={<Notifications user={user} />}
            />
            <Route path="my-posts" element={<MyPosts posts={user.posts} />} />
            <Route
              path="saved-posts"
              element={<SavedPosts posts={user.savedPosts} />}
            />
            <Route
              path="follows"
              element={
                <Follows
                  following={user.following}
                  followers={user.followers}
                />
              }
            />
            <Route path="users" element={<Users />} />
            <Route path="suspended" element={<Suspended />} />
            <Route
              path="edit"
              element={
                <EditProfile user={user} onUserUpdate={handleUserUpdate} />
              }
            />
            <Route path="users/user/:username" element={<UserDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;
