import React, { useState, useEffect } from 'react';
import './BookModal.css';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import ReactDOM from 'react-dom';

function BookModal({ book, onClose, user }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [ownerDetails, setOwnerDetails] = useState(null);

  const {
    title,
    author,
    ratings,
    description,
    userNotes,
    publish_date,
    genre,
    image,
    likes,
    userID,
    borrowerID,
  } = book;

  useEffect(() => {
    setLikeCount(likes);
    console.log('book: ', book);
    console.log('userID: ', userID);
    // Fetch owner details
    const fetchOwnerDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${book.userID}`
        );
        setOwnerDetails(response.data);
        console.log('owner: ', ownerDetails); // Store owner details
      } catch (error) {
        console.error('Error fetching owner details:', error);
      }
    };
    fetchOwnerDetails();

    // Disable scrolling when modal opens
    document.body.classList.add('no-scroll');
    return () => {
      // Re-enable scrolling when modal closes
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const formatDate = (dateString) => {
    console.log('publishDate:', dateString); // Debugging
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const handleBorrowBook = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/books/${book._id}/lend`,
        { userID: user?._id } // Pass the borrower ID here
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

  const handleBackgroundClick = (e) => {
    // Close modal if clicked outside of .modal-content
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          X
        </button>

        {successMessage ? (
          <div className="success-message-container">
            <h2>{title} has been added to your list!</h2>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>{title}</h2>
              <p>by {author}</p>
            </div>

            <div className="modal-body">
              <div className="book-details-container">
                <img
                  src={
                    image
                      ? image
                      : 'https://media.istockphoto.com/id/495477978/photo/open-book.jpg?s=612x612&w=0&k=20&c=vwJ6__M7CVPdjkQFUv9j2pr7QJiQ9bWW_5jXjR9TcjY='
                  }
                  alt={title}
                  className="book-image"
                />

                <div className="book-details">
                  <p>
                    <strong>Published:</strong> {formatDate(publish_date)}
                  </p>
                  <p>
                    <strong>Genre:</strong> {genre}
                  </p>

                  {ownerDetails && (
                    <div className="owner-details">
                      <p>
                        <strong>Owner:</strong>{' '}
                        {`${ownerDetails.firstname} ${ownerDetails.lastname}`}
                      </p>

                      <p>
                        <strong>Preferred Contact:</strong>{' '}
                        {ownerDetails.preferred_contact === 'email'
                          ? ownerDetails.email
                          : ownerDetails.preferred_contact === 'phone'
                            ? ownerDetails.phone
                            : 'No contact information available'}
                      </p>
                    </div>
                  )}
                  <p>
                    <strong>User Notes:</strong> {userNotes}
                  </p>
                  {/* Likes Section */}
                  <div className="likes-section">
                    <FavoriteIcon
                      style={{
                        color: isLiked ? '#f50057' : 'grey',
                        cursor: 'pointer',
                      }}
                      onClick={handleLike}
                    />
                    <p>{likeCount}</p>
                  </div>

                  {/* If the book is available and the user is not the owner, show "Borrow Book" */}
                  {book.available && user._id !== userID && (
                    <button
                      className="borrow-button"
                      onClick={handleBorrowBook}
                    >
                      Borrow Book
                    </button>
                  )}
                  {/* If the book is not available and the user is not the owner nor the borrower */}
                  {!book.available &&
                    user._id !== userID &&
                    user._id !== book.borrowerID && (
                      <p className="info-text">
                        Sorry, someone is borrowing this book at the moment.
                        Check back later.
                      </p>
                    )}
                  {/* If the user is the borrower */}
                  {!book.available && user._id === book.borrowerID && (
                    <p className="info-text">
                      You are currently borrowing this book. Enjoy reading!
                    </p>
                  )}
                  {/* If the user is the owner */}
                  {user._id === userID && (
                    <p className="info-text">You are the owner of this book.</p>
                  )}
                </div>
              </div>

              <div className="book-description">
                <strong>Description:</strong> {description}
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default BookModal;
