import { useEffect, useState } from 'react';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Posts from '../../components/Posts/Posts';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import { getAllPosts } from '../../services/posts.service';
import styles from './Feed.module.scss';
import { useSearchParams } from 'react-router-dom';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [updatedPosts, setUpdatedPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const sortByDate = searchParams.get('sortBydate') || '';
  const sortByTitle = searchParams.get('sortBytitle') || '';

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getAllPosts(searchQuery);
      setPosts(postsData);
      setUpdatedPosts(postsData);
    };
    fetchPosts();
  }, [searchQuery]);

  useEffect(() => {
    if (posts.length > 0) {
      handleSortBy(sortByDate, sortByTitle);
    }
  }, [sortByDate, sortByTitle, posts]);

  const handleSortBy = (sortDate, sortTitle) => {
    let sortedPosts = [...updatedPosts];

    switch (sortDate) {
      case 'newest':
        sortedPosts.sort((a, b) => b.createdOn - a.createdOn);
        break;
      case 'oldest':
        sortedPosts.sort((a, b) => a.createdOn - b.createdOn);
        break;
      default:
        break;
    }
    switch (sortTitle) {
      case 'A-Z':
        sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Z-A':
        sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setUpdatedPosts(sortedPosts);
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
    setUpdatedPosts(filteredPosts);
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

      <Posts posts={updatedPosts} />
      <RightSideBar onTrendingTagsClick={handleTrendingTags} />
    </div>
  );
};

export default Feed;
