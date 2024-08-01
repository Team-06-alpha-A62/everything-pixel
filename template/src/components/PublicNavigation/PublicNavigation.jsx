import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import styles from './PublicNavigation.module.scss';

function PublicNavigation() {
  return (
    <div className={styles.publicNav}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.navLinks}>
        <ToggleTheme />
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </div>
  );
}
export default PublicNavigation;
