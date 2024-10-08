import PropTypes from 'prop-types';
import styles from './EditProfile.module.scss';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';
import {
  changeUserDetails,
  listenToUserBlockedStatus,
} from '../../services/users.service.js';
import Button from '../../hoc/Button/Button.jsx';
import { deleteAvatar, uploadAvatar } from '../../services/images.service.js';
import { updateUserEmail } from '../../services/auth.service.js';
import DragZone from '../DragZone/DragZone.jsx';
import { useAuth } from '../../providers/useAuth.js';

const EditProfile = ({ user, onUserUpdate }) => {
  const { currentUser } = useAuth();
  const [updatedUser, setUpdatedUser] = useState(() => ({ ...user }));
  const [imageFile, setImageFile] = useState(null);
  const [isCurrentUserBlocked, setIsCurrentUserBlocked] = useState(
    currentUser?.userData?.isBlocked
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser?.userData?.username) {
      const unsubscribe = listenToUserBlockedStatus(
        currentUser.userData.username,
        setIsCurrentUserBlocked
      );
      return () => unsubscribe();
    }
  }, [currentUser?.userData?.username]);
  useEffect(() => {
    setUpdatedUser({ ...user });
  }, [user]);

  const handleEditProfile = async () => {
    if (user.isBlocked) {
      return;
    }

    if (!updatedUser.firstName) {
      alert('First name is required');
      return;
    } else if (
      updatedUser.firstName.length < 4 ||
      updatedUser.firstName.length > 32
    ) {
      alert('First name should be more than 4 symbols and less than 32');
      return;
    }
    if (!updatedUser.lastName) {
      alert('Last name is required');
      return;
    } else if (
      updatedUser.lastName.length < 4 ||
      updatedUser.lastName.length > 32
    ) {
      alert('Last name should be more than 4 symbols and less than 32');
      return;
    }
    if (!updatedUser.email) {
      alert('Email is required');
      return;
    }

    try {
      if (updatedUser.avatarUrl !== user.avatarUrl) {
        await deleteAvatar(user?.avatarUrl);
        const storageImageUrl = await uploadAvatar(imageFile);
        await changeUserDetails(user.username, 'avatarUrl', storageImageUrl);
      }

      if (updatedUser.firstName !== user.firstName) {
        await changeUserDetails(
          user.username,
          'firstName',
          updatedUser.firstName
        );
      }

      if (updatedUser.lastName !== user.lastName) {
        await changeUserDetails(
          user.username,
          'lastName',
          updatedUser.lastName
        );
      }

      if (updatedUser.bio !== user.bio) {
        await changeUserDetails(user.username, 'bio', updatedUser.bio);
      }

      if (updatedUser.email !== user.email) {
        await changeUserDetails(user.username, 'email', updatedUser.email);
        await updateUserEmail(updatedUser.email);
      }

      if (updatedUser.phoneNumber !== user.phoneNumber) {
        await changeUserDetails(
          user.username,
          'phoneNumber',
          updatedUser.phoneNumber
        );
      }

      onUserUpdate(updatedUser);

      navigate('/profile/general');
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const handleFileChange = async e => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      try {
        const imageUrl = await getImagePreviewUrl(file);
        setUpdatedUser({
          ...updatedUser,
          avatarUrl: imageUrl,
        });
        setImageFile(file);
        //await uploadAvatar(file);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className={styles['profile-info-container']}>
      <div className={styles['info-grid']}>
        <h2 className={styles['info-heading']}>General Info</h2>
        <div className={styles['input-section']}>
          <label>
            Avatar
            <br />
            <span className={styles['mute']}>
              Drag & drop | Click to choose file
            </span>
          </label>
          <DragZone
            handleFileChange={handleFileChange}
            round={true}
            imageUrl={updatedUser.avatarUrl}
            disabled={isCurrentUserBlocked}
          />
        </div>
        <div>
          <div className={styles['input-section']}>
            <label htmlFor="email">Username</label>
            <input
              type="username"
              name="username"
              id="username"
              value={updatedUser.username}
              disabled={true}
            />
          </div>
          <div className={styles['input-section']}>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={updatedUser.firstName}
              onChange={e =>
                setUpdatedUser({ ...updatedUser, firstName: e.target.value })
              }
              disabled={isCurrentUserBlocked}
            />
          </div>
          <div className={styles['input-section']}>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={updatedUser.lastName}
              onChange={e =>
                setUpdatedUser({ ...updatedUser, lastName: e.target.value })
              }
              disabled={isCurrentUserBlocked}
            />
          </div>
          <div className={styles['input-section']}>
            <label htmlFor="bio">Bio</label>
            <textarea
              type="text"
              name="bio"
              id="bio"
              value={updatedUser.bio || ''}
              onChange={e =>
                setUpdatedUser({ ...updatedUser, bio: e.target.value })
              }
              disabled={isCurrentUserBlocked}
            />
          </div>
        </div>
        <h2 className={styles['info-heading']}>Contact Info</h2>
        <div className={styles['input-section']}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={updatedUser.email}
            disabled={true}
          />
        </div>
        <div className={styles['input-section']}>
          <label htmlFor="phone">Phone number</label>
          <PhoneInput
            value={updatedUser.phoneNumber || ''}
            onChange={value =>
              setUpdatedUser({ ...updatedUser, phoneNumber: value })
            }
            disabled={isCurrentUserBlocked}
          />
        </div>
      </div>
      <div className={styles['edit-profile-controllers']}>
        {!isCurrentUserBlocked && (
          <Button style="primary" handleClick={handleEditProfile}>
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
};

export default EditProfile;
