import './bookCard.css';

import React, { useState } from 'react';
import propTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookModal from '../bookDetailsModal/index.jsx';
import axios from 'axios';

export default function BookCard({
  book,
  isAuthenticated,
  onClick = false,
  showConfirmReturnButton = false,
  handleConfirmReturn,
  remove = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(book.likes || 0);

  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullAuthor, setShowFullAuthor] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleCardClick = () => {
    if (!isAuthenticated) {
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 3000); // Auto-close error modal after 3 seconds
      return;
    }
    if (onClick) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLike = async () => {
    if (isLiked) return;
    try {
      const response = await axios.put(
        `http://localhost:3000/books/${book._id}/like`
      );
      if (response.status === 204) {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error('Error liking the book:', error);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/books/${book._id}`
      );
      if (response.status === 204) {
        // setShowRemoveModal(true);
        remove && remove(book._id);
      }
    } catch (error) {
      console.error('Error removing the book:', error);
    }
  };

  function truncateText(text = '', showFull, toggleShowFull, maxLength = 27) {
    if (!text) return 'No description available';
    if (showFull) {
      return (
        <>
          {text}{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              toggleShowFull();
            }}
          >
            see less
          </span>
        </>
      );
    } else {
      return text.length > maxLength ? (
        <>
          {text.slice(0, maxLength - 2)}...
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              toggleShowFull();
            }}
          >
            more
          </span>
        </>
      ) : (
        text
      );
    }
  }

  return (
    <>
      <Card
        className="book-card"
        sx={{ maxWidth: 345 }}
        onClick={handleCardClick}
      >
        <CardHeader
          title={truncateText(
            book.title,
            showFullTitle,
            () => setShowFullTitle(!showFullTitle),
            22
          )}
          subheader={truncateText(
            book.author,
            showFullAuthor,
            () => setShowFullAuthor(!showFullAuthor),
            30
          )}
        />
        <CardMedia
          component="img"
          height="250"
          image={book.image}
          alt="Book Cover"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {truncateText(
              book.description,
              showFullDescription,
              () => setShowFullDescription(!showFullDescription),
              200
            )}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like book"
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
          >
            <FavoriteIcon style={{ color: isLiked ? '#f50057' : 'grey' }} />
          </IconButton>
          <Typography variant="body2" style={{ marginLeft: '8px' }}>
            {likeCount}
          </Typography>

          {/* Conditionally render either the "Confirm Return" or "Remove" button */}

          {showConfirmReturnButton && !book.available && (
            <button
              className="confirm-return-button"
              onClick={(e) => {
                e.stopPropagation();
                handleConfirmReturn(book._id);
              }}
            >
              Confirm Return
            </button>
          )}

          {remove && book.available && (
            <button
              className="confirm-return-button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              Remove From Listing
            </button>
          )}
        </CardActions>
      </Card>

      {showErrorModal && (
        <div className="error-modal">
          <p>To see the book details, make sure you log in.</p>
        </div>
      )}

      {showRemoveModal && (
        <div className="remove-modal">
          <p>The book has been removed from your listing.</p>
          <p>Refresh the page to see it's gone.</p>
        </div>
      )}

      {/* Render BookModal when showModal is true */}
      {showModal && <BookModal book={book} onClose={closeModal} />}
    </>
  );
}

BookCard.propTypes = {
  book: propTypes.shape({
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    available: propTypes.bool,
    ratings: propTypes.number,
    userNotes: propTypes.string,
    publishDate: propTypes.string,
    genre: propTypes.string,
    likes: propTypes.number,
  }).isRequired,
  onClick: propTypes.bool,
  showConfirmReturnButton: propTypes.bool,
  handleConfirmReturn: propTypes.func,
  remove: propTypes.bool,
};
