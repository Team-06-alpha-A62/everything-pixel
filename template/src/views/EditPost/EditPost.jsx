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
import { uploadImage } from '../../services/images.service.js';

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
        const dbImageUrl = await uploadImage(imageFile);
        await updatePostDetails(id, 'image', dbImageUrl);
      }

      const currentTags = fetchedData.tags ? Object.keys(fetchedData.tags) : [];
      const tagsToRemove = currentTags.filter(ct => !tags.includes(ct));

      for (const tag of tagsToRemove) {
        await deletePostTag(tag, id);
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
      {postData.imageUrl && (
        <div className="image-preview-container">
          <img src={postData.imageUrl} alt="Image Preview" />
        </div>
      )}
      <div className="controller">
        <button onClick={() => navigate(-1)}>&times; Cancel</button>
        <button onClick={handleEditPost}>Edit</button>
      </div>
    </>
  );
};

export default EditPost;
