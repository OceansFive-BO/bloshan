import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import BookCarousel from '../../common/bookCarousel/BookCarousel.jsx';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [listedBooks, setListedBooks] = useState([]);
  const userId = '67379616d10fc59229899912'; // TODO Replace with token

  const [showModal, setShowModal] = useState(false);
  const [bookSearch, setBookSearch] = useState('');

  const [bookList, setBookList] = useState([
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishDate: '1925',
      id: 1,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishDate: '1960',
      id: 2,
    },
    { title: '1984', author: 'George Orwell', publishDate: '1949', id: 3 },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publishDate: '1813',
      id: 4,
    },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const filteredBooks = bookList.filter((book) =>
    book.title.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--; // Adjust if the birthday hasn't occurred yet this year
    }
    return age;
  };

  const handleSearchChange = (e) => {
    setBookSearch(e.target.value);

    setBookList((prevBooks) =>
      prevBooks.filter((book) =>
        book.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleButtonClick = () => {
    if (!selectedBook) {
      setError('You must select a book from the list.');
      return;
    }
    console.log('Book listed:', selectedBook, 'with notes:', notes);
    closeModal();
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setNotes('');
    setBookSearch('');
    setError('');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details
        const userResponse = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUserData(userResponse.data);

        // Fetch borrowed books
        const borrowedResponse = await axios.get(
          `http://localhost:3000/users/${userId}/borrowed`
        );
        setBorrowedBooks(borrowedResponse.data);

        // Fetch lent books
        const lentResponse = await axios.get(
          `http://localhost:3000/users/${userId}/lent`
        );
        setListedBooks(lentResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>; // Show loading state while data is fetched
  }

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <img src={userData.photo_url} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2>{userData.username}</h2>
          <p className="full-name">{`${userData.firstName} ${userData.lastName}`}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Address: {userData.address}</p>
          <p>Age: {calculateAge(userData.birth_date)} </p>
          <p>Preferred Contact: {userData.preferred_contact}</p>
          <button onClick={openModal} className="list-book-button">
            List a New Book
          </button>
        </div>
      </div>

      {/* List New Book Button */}

      {/* Books Listed */}
      <div className="books-listed">
        <h3>My Listed Books</h3>
        <BookCarousel books={listedBooks} />
      </div>

      {/* Books Borrowed */}
      <div className="books-borrowed">
        <h3>Books I've Borrowed</h3>
        <BookCarousel books={borrowedBooks} />
      </div>

      {/* Modal for Adding a New Book */}
      {showModal && (
        <div className="modal">
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

            {/* Book List */}
            <ul className="book-list">
              {filteredBooks.map((book) => (
                <li key={book.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedBook?.id === book.id}
                      onChange={() =>
                        setSelectedBook(
                          selectedBook?.id === book.id ? null : book
                        )
                      }
                    />
                    <span className="book-title">
                      {book.title} - {book.author} ({book.publishDate})
                    </span>
                  </label>
                </li>
              ))}
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
