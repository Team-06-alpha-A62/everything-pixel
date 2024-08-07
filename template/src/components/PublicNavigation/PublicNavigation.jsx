import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import styles from './PublicNavigation.module.scss';

function PublicNavigation() {
  return (
    <div className={styles['public-nav']}>
      <div className={styles['left-section']}>
        <Logo />
      </div>
      <div className={styles['right-section']}>
        <ToggleTheme />
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </div>
  );
}
export default PublicNavigation;
