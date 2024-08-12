import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { getAllPosts } from '../../services/posts.service';
import TrendingPostsMenu from '../../components/TrendingPostsMenu/TrendingPostsMenu';
import styles from './Home.module.scss';
import TrendingTagsMenu from '../../components/TrendingTagsMenu/TrendingTagsMenu';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const scrollToSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();

    document.body.style.paddingTop = '0';

    return () => {
      document.body.style.paddingTop = '100px';
    };
  }, []);

  return (
    <div className={styles['home-wrapper']}>
      <div className={styles['home-container']}>
        <div className={styles['content']}>
          <div className={styles['description']}>
            <h3 className={styles['title']}>Share everything related to Pixel Art</h3>
          </div>
          <Link to="/register" className={styles['get-started']}>
            Get Started
          </Link>
          <p className={styles['login-link']}>
            Already have an account? <Link to="/login">Login</Link> instead
          </p>
        </div>
        <div className={styles['scroll-indicator']} onClick={scrollToSection}>
          <FontAwesomeIcon icon={faAnglesDown} />
        </div>
      </div>

      <div className={styles['trending-posts-section']}>
        <div className={styles['trending-posts-container']}>
          <TrendingPostsMenu size={10} posts={posts} />
        </div>
        <div className={styles['text-content']}>
          <p>
            Discover the latest trends in pixel art, explore in-depth analyses,
            and join the conversation with fellow enthusiasts. These posts
            highlight the vibrant and ever-evolving community dedicated to the
            art of pixels.
          </p>
        </div>
      </div>
      <div className={styles['trending-tags-section']}>
        <div className={styles['text-content']}>
          <p>
          Stay connected with what&apos;s buzzing in the world of pixel art. Our trending tags reveal the most talked-about topics, creative ideas, and popular themes within the community.
          </p>
        </div>
        <div className={styles['trending-tags-container']}>
          <TrendingTagsMenu size={10} />
        </div>
      </div>
    </div>
  );
};

export default Home;
