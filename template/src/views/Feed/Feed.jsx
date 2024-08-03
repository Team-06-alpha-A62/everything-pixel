import { useEffect, useState } from 'react';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Posts from '../../components/Posts/Posts';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import { getAllPosts } from '../../services/posts.service';
import styles from './Feed.module.scss';
import { useSearchParams } from 'react-router-dom';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getAllPosts(searchQuery);
      setPosts(postsData);
    };
    fetchPosts();
  }, [searchQuery]);

  const handleSortBy = value => {
    let sorted = [];
    switch (value) {
      case 'newest':
        sorted = [...posts].sort((a, b) => b.createdOn - a.createdOn);
        break;
      case 'oldest':
        sorted = [...posts].sort((a, b) => a.createdOn - b.createdOn);
        break;
      case 'A-Z':
        sorted = [...posts].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Z-A':
        sorted = [...posts].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        sorted = posts;
        break;
    }
    setPosts(sorted);
  };

  const handleFilterBy = (criteria, value) => {
    let filteredPosts = [...posts];
    switch (criteria) {
      case 'date':
        filteredPosts = filteredPosts.filter(post => post.createdOn >= value);
        break;
      case 'tags':
        filteredPosts = filteredPosts.filter(post => {
          const postTags = post.tags ? Object.keys(post.tags) : [];
          return value.every(tag => postTags.includes(tag));
        });
        break;
      default:
        filteredPosts = posts;
        break;
    }
    setPosts(filteredPosts);
  };

  const handleTrendingTags = () => {
    setPosts();
    return;
  };

  return (
    <div className={styles.feed}>
      <LeftSideBar
        handleSortBy={handleSortBy}
        handleFilterBy={handleFilterBy}
      />

      <Posts posts={posts} />
      <RightSideBar onTrendingTagsClick={handleTrendingTags} />
    </div>
  );
};

export default Feed;
