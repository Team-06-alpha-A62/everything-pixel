import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import UserMenu from '../UserMenu/UserMenu';
import { useAuth } from '../../providers/useAuth.js';
import styles from './Navigation.module.scss';
import { useEffect, useState, useRef } from 'react';

const Navigation = () => {
  const { currentUser } = useAuth();
  const user = currentUser?.user;
  const location = useLocation();

  const [isScrolling, setIsScrolling] = useState(false);
  const navRef = useRef(null);

  const handleScrolling = () => {
    if (location.pathname === '/') {
      setIsScrolling(window.scrollY > 50);
    } else {
      setIsScrolling(true);
    }
  };

  useEffect(() => {
    // if (location.pathname === '/profile/general') {
    //   console.log('hi');
    // }
    window.addEventListener('scroll', handleScrolling);
    setIsScrolling(false);
    return () => window.removeEventListener('scroll', handleScrolling);
  }, [location.pathname]);

  if (location.pathname === '/' && !isScrolling) {
    return null;
  }

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
            <NavLink to="/register">Get Started</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
