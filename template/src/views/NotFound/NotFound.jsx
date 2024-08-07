import { useNavigate } from 'react-router-dom';
import animationData from '../../assets/404-animation.json';
import Lottie from 'lottie-react';
import styles from './NotFound.module.scss';
import Button from '../../hoc/Button/Button.jsx';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['not-found-container']}>
      <Lottie
        animationData={animationData}
        className={styles['lottie-animation']}
      />
      <p>Oops...Seems you&apos;re lost &#58;&#40;</p>
      <Button handleClick={() => navigate(-1)}>&larr; Back</Button>
    </div>
  );
};

export default NotFound;
