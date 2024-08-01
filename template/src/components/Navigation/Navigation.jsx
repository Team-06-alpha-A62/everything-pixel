import { useAuth } from '../../providers/AuthProvider';
import AppNavigation from '../AppNavigation/AppNavigation';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const { currentUser } = useAuth();
  const { user } = currentUser;
  return (
    <nav className={styles.nav}>
      {user && <AppNavigation />}
      {<PublicNavigation />}
    </nav>
  );
};

export default Navigation;
