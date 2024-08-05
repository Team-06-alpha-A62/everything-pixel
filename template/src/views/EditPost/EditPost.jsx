import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider.jsx';
import {
  createPost,
  getPostByHandle,
  updatePostDetails,
} from '../../services/posts.service.js';
import {
  createTag,
  addPostToTag,
  tagExists,
} from '../../services/tags.service.js';
import { addUserPost } from '../../services/users.service.js';
import styles from './EditPost.module.scss';

const initialPostData = {
  titleInput: '',
  contentInput: '',
  tagsInput: '',
};

const EditPost = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState(initialPostData);
  const [fetchedData, setFetchedData] = useState(initialPostData);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const post = await getPostByHandle(id);
        setFetchedData({
          ...postData,
          titleInput: post.title,
          contentInput: post.content,
        });
        setPostData({
          ...postData,
          titleInput: post.title,
          contentInput: post.content,
        });
        setTags([...post.tags]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleKeyDown = e => {
    if ((e.key === 'Enter' || e.key === ' ') && postData.tagsInput.trim()) {
      e.preventDefault();
      if (!tags.includes(postData.tagsInput.trim())) {
        setTags([...tags, postData.tagsInput.trim()]);
        setPostData({ ...postData, tagsInput: '' });
      }
    }
  };

  const handleDeleteTag = tagIndex => {
    setTags(tags.filter((_, index) => index !== tagIndex));
  };

  const handleInputChange = key => e => {
    setPostData({
      ...postData,
      [key]: e.target.value,
    });
  };

  const handleFileChange = e => {
    setPostData({
      ...postData,
      imageFileInput: e.target.files[0],
    });
  };

  const convertTagsToObject = tagsArray => {
    return tagsArray.reduce((acc, tag) => {
      acc[tag] = true;
      return acc;
    }, {});
  };

  const assignTagUpdatesToDb = async (tagsArray, postId) => {
    for (const tag of tagsArray) {
      if (!(await tagExists(tag))) {
        await createTag(tag);
      }
      await addPostToTag(tag, postId);
    }
  };

  const handleEditPost = async () => {
    if (!postData.titleInput || !postData.contentInput) {
      alert("Can't leave empty title or content");
      return;
    }

    setLoading(true);

    try {
      if (fetchedData.titleInput !== postData.titleInput) {
        await updatePostDetails(id, 'title', postData.titleInput);
      }

      if (fetchedData.contentInput !== postData.contentInput) {
        await updatePostDetails(id, 'content', postData.contentInput);
      }

      await assignTagUpdatesToDb(tags, id);
      await updatePostDetails(id, 'tags', convertTagsToObject(tags, id));
      await updatePostDetails(id, 'edited', Date.now());
      navigate(`/feed/post/${id}`);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Edit post</h1>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        autoFocus
        value={postData.titleInput}
        onChange={handleInputChange('titleInput')}
        required
      />
      <br />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id="content"
        value={postData.contentInput}
        onChange={handleInputChange('contentInput')}
        required
      />

      <br />
      <label htmlFor="tags">Tags</label>
      <div>
        {tags.map((tag, index) => {
          return (
            <div className={styles.tag} key={tag}>
              <span onClick={() => handleDeleteTag(index)}>&times;</span>
              <span>{tag}</span>
            </div>
          );
        })}
      </div>
      <input
        type="text"
        name="tags"
        id="tags"
        value={postData.tagsInput}
        onChange={handleInputChange('tagsInput')}
        onKeyDown={handleKeyDown}
      />
      <br />
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={e => handleFileChange(e)}
      />
      <br />
      <div className="controller">
        <button onClick={() => navigate(-1)}>&times; Cancel</button>
        <button onClick={handleEditPost}>Edit</button>
      </div>
    </>
  );
};

export default EditPost;
