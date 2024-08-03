import { Link, NavLink } from 'react-router-dom';
import Button from '../../hoc/Button/Button';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import UserMenu from '../UserMenu/UserMenu';
import styles from './AppNavigation.module.scss';

function AppNavigation() {
  return (
    <div className={styles.appNav}>
      <Logo />
      <Search />
      <NavLink to="/feed">Feed</NavLink>
      <Button style={'none'}>
        <Link to="/publish">Publish</Link>
      </Button>
      <ToggleTheme />
      <UserMenu />
    </div>
  );
}

export default AppNavigation;
