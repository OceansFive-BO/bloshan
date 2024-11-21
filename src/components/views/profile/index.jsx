import { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import BookCarousel from '../../common/bookCarousel/BookCarousel.jsx';
import propTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProfilePage({ user }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [listedBooks, setListedBooks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [bookSearch, setBookSearch] = useState('');

  const [bookList, setBookList] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  if (!user) {
    return <Navigate to="/home" replace />;
  }
  console.log('user', user);
  const userId = user._id;
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // API call for fetching books by title
  useEffect(() => {
    const fetchBooksByTitle = async () => {
      if (bookSearch.length >= 3) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:3000/books/newBooks/${bookSearch}`
          );
          setBookList(response.data);
          setError('');
        } catch (err) {
          console.error('Error fetching books:', err);
          setBookList([]);
          setError('No book with that title found');
        } finally {
          setLoading(false);
        }
      } else {
        setBookList([]);
        setError('');
      }
    };

    const debounce = setTimeout(() => {
      fetchBooksByTitle();
    }, 300);

    return () => clearTimeout(debounce);
  }, [bookSearch]);

  const handleButtonClick = async () => {
    if (!selectedBook) {
      setError('You must select a book from the list.');
      return;
    }

    const bookData = {
      bookID: selectedBook.bookID,
      userID: userId,
      notes: notes,
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/books/',
        bookData
      );

      console.log('POST request:', response.data);

      if (!response.data._id) {
        throw new Error('POST request did not return an _id for the book.');
      }
      //TODO make sure the post request responce with book id
      const addedBookResponse = await axios.get(
        `http://localhost:3000/books/${response.data._id}`
      );
      console.log('GET response for added book:', addedBookResponse.data);

      setListedBooks((prevBooks) => [...prevBooks, response.data]);

      setError('');
      setSuccessMessage(
        `${selectedBook.title} has been added to your listings!`
      );

      setTimeout(() => {
        setSuccessMessage('');
        closeModal();
      }, 3000);
    } catch (error) {
      console.error('Error adding book:', error);
      setError('An error occurred while adding the book. Please try again.');
    }
  };

  const handleConfirmReturn = async (bookId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/books/${bookId}/lend`
      );
      if (response.status === 204) {
        console.log('Book return confirmed:', bookId);

        const updatedListedBooksResponse = await axios.get(
          `http://localhost:3000/users/${userId}/lending`
        );
        setListedBooks(updatedListedBooksResponse.data);
      }
    } catch (error) {
      console.error('Error confirming book return:', error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setSuccessMessage('');
    setNotes('');
    setBookSearch('');
    setBookList([]);
    setError('');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch borrowed books
        const borrowedResponse = await axios.get(
          `http://localhost:3000/users/${userId}/borrowed`
        );
        setBorrowedBooks(borrowedResponse.data);

        // Fetch lent books
        const lentResponse = await axios.get(
          `http://localhost:3000/users/${userId}/lending`
        );
        setListedBooks(lentResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [showModal]);

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  const removeBookFromListed = (bookId) => {
    setListedBooks((prevBooks) =>
      prevBooks.filter((book) => book._id !== bookId)
    );
  };

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <img src={user?.photo_url} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2>{user?.username}</h2>
          <p className="full-name">{`${user?.firstname} ${user?.lastname}`}</p>
          <p>Email: {user?.email}</p>
          <p>Phone: {user?.phone}</p>
          <p>Address: {user?.address}</p>
          <p>Age: {calculateAge(user?.birth_date)} </p>
          <p>Preferred Contact: {user?.preferred_contact}</p>
          <button onClick={openModal} className="list-book-button">
            List a New Book
          </button>
        </div>
      </div>

      {/* Books Listed */}
      <div className="books-listed">
        <h3>My Listed Books</h3>
        <BookCarousel
          books={listedBooks}
          showConfirmReturnButton={true}
          handleConfirmReturn={handleConfirmReturn}
          onClick={true}
          remove={removeBookFromListed}
          isAuthenticated={true}
          user={user}
        />
      </div>

      {/* Books Borrowed */}
      <div className="books-borrowed">
        <h3>Books I've Borrowed</h3>
        <BookCarousel
          books={borrowedBooks}
          onClick={true}
          isAuthenticated={true}
          user={user}
        />
      </div>

      {/* Modal for Adding a New Book */}
      {showModal && (
        <div className="modal" onClick={handleBackgroundClick}>
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <h2>List a New Book</h2>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search for a book title..."
              value={bookSearch}
              onChange={(e) => setBookSearch(e.target.value)}
              className="book-search"
            />

            {/* Loading Indicator */}
            {loading && <p className="success-message">Loading...</p>}

            {/* Book List */}
            <ul className="book-list">
              {bookList.map((book) => (
                <li key={book.bookID}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedBook?.bookID === book.bookID}
                      onChange={() =>
                        setSelectedBook(
                          selectedBook?.bookID === book.bookID ? null : book
                        )
                      }
                    />
                    <span className="book-title">
                      {book.title} - {book.author} (
                      {formatDate(book.publish_date)})
                    </span>
                  </label>
                </li>
              ))}
              {/* No Results Message */}
              {!loading && bookSearch.length >= 3 && bookList.length === 0 && (
                <p className="success-message">No book with that title found</p>
              )}
            </ul>

            {/* Add Notes Section */}
            <div className="add-notes">
              <textarea
                placeholder="Add your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="notes-field"
              ></textarea>
            </div>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Success Message */}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            {/* Add Button */}
            <button onClick={handleButtonClick} className="add-book-button">
              Add Book to Listing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;

ProfilePage.propTypes = {
  user: propTypes.object,
};
