import styles from './Profile.module.scss';
import { useAuth } from '../../providers/AuthProvider.jsx';
import Avatar from 'react-avatar';
import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faUser,
  faUserGroup,
  faBookmark,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo.jsx';
import MyPosts from '../../components/MyPosts/MyPosts.jsx';
import EditProfile from '../../components/EditProfile/EditProfile.jsx';
import SavedPosts from '../../components/SavedPosts/SavedPosts.jsx';
import Follows from '../../components/Follows/Follows.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import { getUserByHandle } from '../../services/users.service.js';
import animationData from '../../assets/avatar-loading-animation.json';
import Lottie from 'lottie-react';

const Profile = () => {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [user, setUser] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const user = await getUserByHandle(currentUser.userData?.username);
        setUser({
          ...user,
        });
      };
      fetchUser();
    } catch (error) {
      console.log(error.message);
    }
  }, [currentUser.userData]);

  setTimeout(() => {
    setIsLoadingAvatar(false);
  }, 1000);
  return (
    <div className={`${styles['profile-container']}`}>
      <div className={styles['profile-header']}>
        <div className="profile-avatar">
          {isLoadingAvatar ? (
            <Lottie
              animationData={animationData}
              className={styles['lottie-animation']}
            />
          ) : (
            <Avatar
              name={`${user.firstName} ${user.lastName}`}
              round={true}
              size="100"
              src={user.avatarUrl}
            />
          )}
        </div>
        <div>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <p>{user.email}</p>
        </div>
      </div>

      <div className={styles['main-content']}>
        <nav className={styles['profile-side-bar']}>
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
            <Route path="my-posts" element={<MyPosts posts={user.posts} />} />
            <Route
              path="saved-posts"
              element={<SavedPosts savedPosts={user.savedPosts} />}
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
            <Route path="edit" element={<EditProfile user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;
