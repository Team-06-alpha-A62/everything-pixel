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
  const sortByDate = searchParams.get('sortByDate') || '';
  const sortByTitle = searchParams.get('sortByTitle') || '';
  const sortByPopularity = searchParams.get('sortByPopularity') || '';
  const filterByDate = searchParams.get('filterByDate') || '';
  const filterByTags = searchParams.get('filterByTags') || '';

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = (await getAllPosts(searchQuery)).sort((a, b) => b.createdOn - a.createdOn);
      setPosts(postsData);
      setUpdatedPosts(postsData);
    };
    fetchPosts();
  }, [searchQuery]);

  useEffect(() => {
    if (posts.length > 0) {
      handleSortBy(sortByDate, sortByPopularity, sortByTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortByDate, sortByTitle, sortByPopularity, posts]);

  useEffect(() => {
    if (posts.length > 0) handleFilterBy(filterByDate, filterByTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByDate, filterByTags]);

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

  const handleFilterBy = (filterByDate, filterByTags) => {
    let filteredPosts = [...posts];
    if (filterByDate) {
      const timeStamp = new Date(filterByDate).getTime();
      filteredPosts = filteredPosts.filter(post => post.createdOn >= timeStamp);
    }

    if (filterByTags) {
      const tagsArray = filterByTags.split('_');
      filteredPosts = filteredPosts.filter(post => {
        const postTags = post.tags ? Object.keys(post.tags) : [];
        return tagsArray.every(tag => postTags.includes(tag));
      });
    }
    setUpdatedPosts(filteredPosts);
  };

  return (
    <div className={styles['feed']}>
      <LeftSideBar />

      <Posts posts={updatedPosts} />

      <RightSideBar posts={posts} />
    </div>
  );
};

export default Feed;
