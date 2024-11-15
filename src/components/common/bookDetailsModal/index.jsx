import React, { useState } from 'react';
import './BookModal.css';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';

function BookModal({
  id,
  title,
  author,
  ratings,
  description,
  userNotes,
  publishDate,
  genre,
  image,
  likes,
  onClose,
}) {
  const [successMessage, setSuccessMessage] = useState('');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleBorrowBook = () => {
    setSuccessMessage(`${title} has been added to your list!`);

    // Close the modal after 5 seconds
    setTimeout(() => {
      setSuccessMessage(''); // Clear the message
      onClose(); // Close the modal
    }, 5000);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          X
        </button>

        {/* Conditional Rendering: Success Message or Book Details */}
        {successMessage ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '0.5em' }}>
              {title} has been added to your list!
            </h2>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>{title}</h2>
              <p>by {author}</p>
            </div>
            <div className="modal-body">
              <img src={image} alt={title} className="book-image" />
              <div className="book-details">
                <p>
                  <Rating
                    name="half-rating-read"
                    defaultValue={ratings}
                    precision={0.5}
                    readOnly
                  />
                </p>
                <p>
                  <strong>Published:</strong> {formatDate(publishDate)}
                </p>
                <p>
                  <strong>Genre:</strong> {genre}
                </p>
                <p>
                  <strong>Description:</strong> {description}
                </p>
                <p>
                  <strong>User Notes:</strong> {userNotes}
                </p>

                {/* Likes Section */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <FavoriteIcon style={{ color: '#f50057' }} />
                  <p>{likes} </p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="borrow-button" onClick={handleBorrowBook}>
                {' '}
                Borrow Book
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookModal;
