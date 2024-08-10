import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deletePostTag,
  getPostByHandle,
  updatePostDetails,
} from '../../services/posts.service.js';
import {
  createTag,
  addPostToTag,
  tagExists,
} from '../../services/tags.service.js';
import styles from './EditPost.module.scss';
import { deleteImage, uploadImage } from '../../services/images.service.js';
import Button from '../../hoc/Button/Button.jsx';
import DragZone from '../../components/DragZone/DragZone.jsx';
import Lottie from 'lottie-react';
import animationData from '../../assets/pacman-loading-animation.json';

const initialPostData = {
  titleInput: '',
  contentInput: '',
  imageUrl: '',
  tagsInput: '',
};

const EditPost = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState(initialPostData);
  const [fetchedData, setFetchedData] = useState(initialPostData);
  const [imageFile, setImageFile] = useState(null);
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
          imageUrl: post.image,
        });
        setPostData({
          ...postData,
          titleInput: post.title,
          contentInput: post.content,
          imageUrl: post.image,
        });
        setTags([...post.tags]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getImagePreviewUrl = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        resolve(event.target.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

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

  const handleFileChange = async e => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imageUrl = await getImagePreviewUrl(file);
        setPostData({
          ...postData,
          imageUrl: imageUrl,
        });
        setImageFile(file);
        console.log(imageFile);
      } catch (error) {
        console.log(error.message);
      }
    }
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

      if (fetchedData.imageUrl !== postData.imageUrl) {
        if (fetchedData.imageUrl) {
          await deleteImage(fetchedData.imageUrl);
        }
        const storageImageUrl = await uploadImage(imageFile);
        await updatePostDetails(id, 'image', storageImageUrl);
      }

      const currentTags = fetchedData.tags ? Object.keys(fetchedData.tags) : [];
      const tagsToRemove = currentTags.filter(ct => !tags.includes(ct));

      for (const tag of tagsToRemove) {
        await deletePostTag(tag, id);
      }

      await assignTagUpdatesToDb(tags, id);
      await updatePostDetails(id, 'tags', convertTagsToObject(tags, id));
      await updatePostDetails(id, 'edited', Date.now());
      navigate(`/post/${id}`);
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
    <div className={styles['edit-wrapper']}>
      <div className={styles['edit-container']}>
        {loading ? (
          <Lottie
            animationData={animationData}
            className={styles['lottie-animation']}
          />
        ) : (
          <>
            <h1>Edit Post</h1>
            <div className={styles['input-section']}>
              <label htmlFor="title">Title</label>
              <input
                className={styles['post-title']}
                type="text"
                name="title"
                id="title"
                autoFocus
                value={postData.titleInput}
                onChange={handleInputChange('titleInput')}
                required
              />
            </div>
            <div className={styles['input-section']}>
              <label htmlFor="tags">Tags</label>
              <div className={styles['edit-tags']}>
                {tags.map((tag, index) => {
                  return (
                    <div className={styles['tag']} key={tag}>
                      <span>{tag}</span>
                      <span
                        onClick={() => handleDeleteTag(index)}
                        className={styles['delete-tag']}
                      >
                        &times;
                      </span>
                    </div>
                  );
                })}
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  value={postData.tagsInput}
                  onChange={handleInputChange('tagsInput')}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <div className={styles['content']}>
              <div className={styles['input-section']}>
                <label>Image</label>
                <DragZone
                  handleFileChange={handleFileChange}
                  imageUrl={postData.imageUrl}
                />
              </div>
              <div className={styles['input-section']}>
                <label htmlFor="content">Content</label>
                <textarea
                  className={styles['edit-textarea']}
                  name="content"
                  id="content"
                  value={postData.contentInput}
                  onChange={handleInputChange('contentInput')}
                  required
                />
              </div>
            </div>

            <div className={styles['controllers']}>
              <Button style="secondary" handleClick={() => navigate(-1)}>
                &times; Cancel
              </Button>
              <Button style="primary" handleClick={handleEditPost}>
                Edit &#x2713;
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPost;
