import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Button from '../../hoc/Button/Button';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import UserMenu from '../UserMenu/UserMenu';

const Navigation = () => {
  return (
    <nav>
      <Logo />
      <Search />
      <Button style={'none'}>
        <button type="button">publish</button>
      </Button>
      <ToggleTheme />
      <UserMenu />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Get started</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
};

export default Navigation;
