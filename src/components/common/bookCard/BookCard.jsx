import './bookCard.css';

import { useState } from 'react';
import propTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
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
  user,
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
        sx={{
          maxWidth: 345,
          boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.35)',
          margin: '3px',
          padding: '3px',
        }}
        onClick={handleCardClick}
      >
        <div className="book-card-container">
          <CardHeader
            className="book-card-title"
            titleTypographyProps={{
              variant: 'h6',
              sx: { fontSize: '1rem', fontWeight: '600' },
            }}
            subheaderTypographyProps={{
              variant: 'subtitle2',
              sx: { fontSize: '0.8rem', fontStyle: 'italic' },
            }}
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

          <div className="book-card-content">
            <CardActions disableSpacing>
              <div className="like-return">
                <div className="like-count">
                  <IconButton
                    aria-label="like book"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike();
                    }}
                  >
                    <FavoriteIcon
                      style={{ color: isLiked ? '#f50057' : 'grey' }}
                    />
                  </IconButton>
                  <Typography variant="body2" style={{ marginLeft: '8px' }}>
                    {likeCount}
                  </Typography>
                </div>

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
              </div>
            </CardActions>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <CardMedia
                className="book-cover"
                component="img"
                height="250"
                image={
                  book.image
                    ? book.image
                    : 'https://media.istockphoto.com/id/495477978/photo/open-book.jpg?s=612x612&w=0&k=20&c=vwJ6__M7CVPdjkQFUv9j2pr7QJiQ9bWW_5jXjR9TcjY='
                }
                alt="Book Cover"
              />
            </div>
            <div className="flip-card-back">
              <div className="content-container">
                <Typography variant="body2" color="text.secondary">
                  {book.description || 'No description available'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
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

      {showModal && <BookModal book={book} onClose={closeModal} user={user} />}
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
  user: propTypes.object,
};
