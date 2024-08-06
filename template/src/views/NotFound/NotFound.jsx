import { useNavigate } from 'react-router-dom';
import animationData from '../../assets/404-animation.json';
import Lottie from 'lottie-react';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();


  return (
    <div className={styles['not-found-container']}>
      <Lottie
        animationData={animationData}
        className={styles['lottie-animation']}
      />
      <p>Oops...Seems you&apos;re lost</p>
      <button onClick={() => navigate(-1)}>&larr; Back</button>
    </div>
  );
};

export default NotFound;
