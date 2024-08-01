import Button from '../../hoc/Button/Button';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import UserMenu from '../UserMenu/UserMenu';

function AppNavigation() {
  return (
    <div>
      <Logo />
      <Search />
      <Button style={'none'}>
        <button type="button">publish</button>
      </Button>
      <ToggleTheme />
      <UserMenu />
    </div>
  );
}

export default AppNavigation;
