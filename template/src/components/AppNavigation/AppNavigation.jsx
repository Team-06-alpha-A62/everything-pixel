import { useNavigate } from 'react-router-dom';
import Button from '../../hoc/Button/Button';
import { useAuth } from '../../providers/AuthProvider.jsx';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import UserMenu from '../UserMenu/UserMenu';

function AppNavigation() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div>
      <Logo />
      <Search />
      <Button style={'none'}>
        <button type="button">publish</button>
      </Button>
      <ToggleTheme />
      <UserMenu />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AppNavigation;
