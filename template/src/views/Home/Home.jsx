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

    // This sets padding top to 0 on the body to remove the initial offset
    document.body.style.paddingTop = '0';

    return () => {
      // Restore the padding top when the component unmounts
      document.body.style.paddingTop = '100px';
    };
  }, []);

  return (
    <div className={styles['home-wrapper']}>
      <div className={styles['home-container']}>
        <div className={styles['content']}>
          <div className={styles['description']}>
            <p>Share everything related to Pixel Art</p>
          </div>
          <Link to="/register" className={styles['get-started']}>
            Get Started
          </Link>
          <p className={styles['login-link']}>
            Already have an account? <Link to="/login">Login instead</Link>
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
            Stay connected with what's buzzing in the world of pixel art. Our
            trending tags reveal the most talked-about topics, creative ideas,
            and popular themes within the community. Dive into these tags to
            explore a rich collection of posts, discover new inspirations, and
            join the conversation with fellow pixel art enthusiasts. Whether
            you're here to share your latest creation or to find inspiration
            from others, these tags are your gateway to the heart of our
            community's creativity. Explore, engage, and contribute to the
            trends that are shaping the pixel art universe today.
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
