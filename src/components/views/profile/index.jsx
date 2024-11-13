import React, { useState } from 'react';
import './profile.css';
import BookCarousel from '../../common/bookCarousel/BookCarousel.jsx';

function ProfilePage() {
  const userData = {
    profilePicUrl: 'https://example.com/profile.jpg',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    homeAddress: '123 Main St, Anytown, USA',
    age: 30,
  };

  const [showModal, setShowModal] = useState(false);
  const [bookSearch, setBookSearch] = useState('');

  const [listedBooks, setListedBooks] = useState([
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic novel set in the Jazz Age.',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A story about racial injustice in the American South.',
    },
    {
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian novel about surveillance and totalitarianism.',
    },
    {
      title: 'Moby Dick',
      author: 'Herman Melville',
      description: "The epic tale of a captain's obsession with a white whale.",
    },
  ]);

  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      description: 'A romantic novel set in 19th-century England.',
    },
    {
      title: 'Moby Dick',
      author: 'Herman Melville',
      description: "The epic tale of a captain's obsession with a white whale.",
    },
  ]);

  const [bookList, setBookList] = useState([
    { title: 'The Great Gatsby', id: 1 },
    { title: 'To Kill a Mockingbird', id: 2 },
    { title: '1984', id: 3 },
    { title: 'Pride and Prejudice', id: 4 },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [notes, setNotes] = useState('');

  const handleSearchChange = (e) => {
    setBookSearch(e.target.value);

    setBookList((prevBooks) =>
      prevBooks.filter((book) =>
        book.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setNotes('');
    setBookSearch(''); // Reset search when modal closes
  };

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src={userData.profilePicUrl}
          alt="Profile"
          className="profile-pic"
        />
        <h2>{userData.username}</h2>
        <p>{`${userData.firstName} ${userData.lastName}`}</p>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phoneNumber}</p>
        <p>Address: {userData.homeAddress}</p>
        <p>Age: {userData.age}</p>
      </div>

      {/* List New Book Button */}
      <button onClick={openModal} className="list-book-button">
        List a New Book
      </button>

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
            <h2>List a New Book</h2>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <input
              type="text"
              placeholder="Search for a book..."
              value={bookSearch}
              onChange={handleSearchChange}
              className="book-search"
            />
            <ul className="book-list">
              {bookList.map((book) => (
                <li key={book.id} onClick={() => setSelectedBook(book)}>
                  {book.title}
                </li>
              ))}
            </ul>
            {selectedBook && (
              <div>
                <h3>Selected Book: {selectedBook.title}</h3>
                <textarea
                  placeholder="Add your notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="notes-field"
                ></textarea>
                <button
                  onClick={() => {
                    console.log(
                      'Book listed:',
                      selectedBook,
                      'with notes:',
                      notes
                    );
                    closeModal();
                  }}
                >
                  Add Book to Listing
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
