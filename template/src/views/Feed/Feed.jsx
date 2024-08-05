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
  const sortByPopularity = searchParams.get('sortBypopularity') || '';

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
      handleSortBy(sortByDate, sortByPopularity, sortByTitle);
    }
  }, [sortByDate, sortByTitle, sortByPopularity, posts]);

  const handleSortBy = (sortDate, sortPopularity, sortTitle) => {
    let sortedPosts = [...posts];
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
    switch (sortPopularity) {
      case 'most':
        sortedPosts.sort(
          (a, b) =>
            Object.values(b.comments ?? {}).length +
            Object.values(b.votes ?? {}).length -
            (Object.values(a.comments ?? {}).length +
              Object.values(a.votes ?? {}).length)
        );
        break;
      case 'least':
        sortedPosts.sort(
          (a, b) =>
            Object.values(a.comments ?? {}).length +
            Object.values(a.votes ?? {}).length -
            (Object.values(b.comments ?? {}).length +
              Object.values(b.votes ?? {}).length)
        );
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

  // const handleTrendingTags = () => {
  //   setPosts();
  //   return;
  // };

  return (
    <div className={styles.feed}>
      <LeftSideBar handleFilterBy={handleFilterBy} />
      <Posts posts={updatedPosts} />
      <RightSideBar
        posts={posts}
        //onTrendingTagsClick={handleTrendingTags}
      />
    </div>
  );
};

export default Feed;
