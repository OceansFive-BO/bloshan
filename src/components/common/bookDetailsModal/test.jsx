import React, { useState } from 'react';
import BookModal from './index.jsx';

function HomeView() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const book = {
    id: '673802a1ba6a2d66786589c5',
    title: 'JavaScript Essentials',
    author: 'John Doe',
    ratings: 4.5,
    description: "A beginner's guide to JavaScript",
    userNotes: 'Useful for front-end development',
    publishDate: '2020-01-01',
    genre: 'Programming',
    image:
      'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
    likes: 12,
  };

  const openModal = () => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  return (
    <div>
      <button onClick={openModal}>Open Book Modal</button>
      {showModal && selectedBook && (
        <BookModal {...selectedBook} onClose={closeModal} />
      )}
    </div>
  );
}

export default HomeView;
