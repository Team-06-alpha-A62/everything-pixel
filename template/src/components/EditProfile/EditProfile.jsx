import PropTypes from 'prop-types';
import styles from './EditProfile.module.scss';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';
import { changeUserDetails } from '../../services/users.service.js';
import Button from '../../hoc/Button/Button.jsx';

const EditProfile = ({ user, onUserUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(() => ({ ...user }));
  const navigate = useNavigate();

  useEffect(() => {
    setUpdatedUser({ ...user });
  }, [user]);

  const handleEditProfile = async () => {
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
      alert('email is required');
      return;
    }

    setIsLoading(true);

    try {
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
      }

      if (updatedUser.phoneNumber !== user.phoneNumber) {
        await changeUserDetails(
          user.username,
          'phoneNumber',
          updatedUser.phoneNumber
        );
      }

      // Call the onUserUpdate function to update the parent component's user state
      onUserUpdate(updatedUser);

      navigate('/profile/general');
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['profile-info-container']}>
      <div className={styles['info-grid']}>
        <h2 className={styles['info-heading']}>General Info</h2>
        <div className={styles['input-section']}>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={updatedUser.firstName}
            onChange={e => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
          />
        </div>
        <div className={styles['input-section']}>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={updatedUser.lastName}
            onChange={e => setUpdatedUser({ ...updatedUser, lastName: e.target.value })
            }
          />
        </div>
        <div className={styles['input-section']}>
          <label htmlFor="bio">Bio</label>
          <textarea
            type="text"
            name="bio"
            id="bio"
            value={updatedUser.bio || ''}
            onChange={e => setUpdatedUser({ ...updatedUser, bio: e.target.value })}
          />
        </div>
        <h2 className={styles['info-heading']}>Contact Info</h2>
        <div className={styles['input-section']}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={updatedUser.email}
          />
        </div>
        <div className={styles['input-section']}>
          <label htmlFor="phone">Phone number</label>
          <PhoneInput
            value={updatedUser.phone || ''}
            onChange={value => setUpdatedUser({ ...updatedUser, phone: value })}
          />
        </div>
      </div>
      <div className={styles['edit-profile-controllers']}>
        <Button style="primary" handleClick={handleEditProfile}>
          Save Changes
        </Button>
        <Button style="alert" handleClick={() => console.log('hi')}>
          Close account
        </Button>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired, // Use object as type
  onUserUpdate: PropTypes.func.isRequired,
};

export default EditProfile;
