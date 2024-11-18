import React, { useState } from 'react';
import './BookModal.css';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

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
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/books/${id}/like`
      );
      if (response.status === 204) {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error('Error liking the book:', error);
    }
  };

  const handleBorrowBook = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/books/${id}/lend`
      );
      if (response.status === 204) {
        setSuccessMessage(`${title} has been added to your list!`);

        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 5000);
      }
    } catch (error) {
      console.error('Error borrowing the book:', error);
    }
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
            <h2>{title} has been added to your list!</h2>
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
                  <FavoriteIcon
                    style={{
                      color: isLiked ? '#f50057' : 'grey',
                      cursor: 'pointer',
                    }}
                    onClick={handleLike}
                  />
                  <p>{likeCount}</p>
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
