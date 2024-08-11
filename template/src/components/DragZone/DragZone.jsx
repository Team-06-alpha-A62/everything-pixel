import PropTypes from 'prop-types';
import styles from './DragZone.module.scss';
import { useState } from 'react';

const DragZone = ({
  handleFileChange,
  width = 100,
  height = 100,
  round = false,
  imageUrl = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragging(true);
    console.log(isDragging);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const event = { target: { files: [file] } }; // simulating a real event structure
      handleFileChange(event);
    }
  };

  return (
    <>
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        className={styles['drag-zone']}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => handleFileChange(e)}
        />
        <label
          htmlFor="image"
          id="file-label"
          style={{ borderRadius: `${round ? 50 : 10}px` }}
          className={`${styles['input-element']} ${
            isDragging ? 'dragging' : ''
          }`}
        >
          {imageUrl ? (
            <div
              style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                backgroundSize: 'cover', // Ensure the background image covers the label
                backgroundPosition: 'center', // Center the background image
                borderRadius: `${round ? 50 : 10}px`,
              }}
              alt="Image Preview"
            ></div>
          ) : (
            <span>{round ? '+' : 'Drag & drop | Click to choose file'}</span>
          )}
        </label>
      </div>
    </>
  );
};

DragZone.propTypes = {
  handleFileChange: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  round: PropTypes.bool,
  imageUrl: PropTypes.string,
};

export default DragZone;
