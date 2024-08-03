import { useEffect, useState } from 'react';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Posts from '../../components/Posts/Posts';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import { getAllPosts } from '../../services/posts.service';
import styles from './Feed.module.scss';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getAllPosts();
      setPosts(postsData);
    };
    fetchPosts();
  });

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
        onSortByClick={handleSortBy}
        onFilterByClick={handleFilterBy}
      />
      <Posts posts={posts} />
      <RightSideBar onTrendingTagsClick={handleTrendingTags} />
    </div>
  );
};

export default Feed;
