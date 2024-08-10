import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import UserMenu from '../UserMenu/UserMenu';
import { useAuth } from '../../providers/AuthProvider';
import styles from './Navigation.module.scss';
import { useEffect, useState, useRef } from 'react';

const Navigation = () => {
  const { currentUser } = useAuth();
  const user = currentUser?.user;

  const [isScrolling, setIsScrolling] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const handleScrolling = () => {
    setIsScrolling(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);

    return () => window.removeEventListener('scroll', handleScrolling);
  }, []);

  return (
    <div
      ref={navRef}
      className={`${styles['nav-wrapper']} ${isScrolling ? 'scrolling' : ''}`}
    >
      <nav className={styles['nav']}>
        <div className={styles['left-section']}>
          <Logo />
        </div>
        {user ? (
          <>
            <div className={styles['center-section']}>
              {location.pathname === '/feed' && <Search />}
            </div>
            <div className={styles['right-section']}>
              <NavLink to="/feed">Feed</NavLink>
              <NavLink to="/publish">Publish</NavLink>
              <ToggleTheme />
              <UserMenu />
            </div>
          </>
        ) : (
          <div className={styles['right-section']}>
            <ToggleTheme />
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
