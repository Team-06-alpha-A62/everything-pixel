import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import UserMenu from '../UserMenu/UserMenu';
import styles from './AppNavigation.module.scss';

const AppNavigation = () => {

  return (
    <div className={styles['app-nav']}>
      <div className={styles['left-section']}>
        <Logo />
      </div>
      <div className={styles['center-section']}>
        <Search />
      </div>
      <div className={styles['right-section']}>
        <NavLink to="/feed">Feed</NavLink>
        <NavLink to="/publish">Publish</NavLink>
        <ToggleTheme />
        <UserMenu />
      </div>
    </div>
  );
}

export default AppNavigation;
