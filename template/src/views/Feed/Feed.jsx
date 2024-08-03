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
    console.log(value);
  };

  const handleFilterBy = () => {
    setPosts();
    return;
  };

  const handleTrendingTags = () => {
    setPosts();
    return;
  };

  return (
    <div className={styles.feed}>
      <LeftSideBar
        handleSortBy={handleSortBy}
        onFilterByClick={handleFilterBy}
      />

      <Posts posts={posts} />
      <RightSideBar onTrendingTagsClick={handleTrendingTags} />
    </div>
  );
};

export default Feed;
