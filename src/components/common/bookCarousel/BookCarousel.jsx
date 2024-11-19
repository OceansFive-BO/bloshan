import './bookCarousel.css';
import React from 'react';
import PropTypes from 'prop-types';
import BookCard from '../bookCard/BookCard.jsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function BookCarousel({
  books,
  onClick = false,
  showConfirmReturnButton = false,
  handleConfirmReturn,
}) {
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={30}
        slidesPerView={3}
      >
        {books.map((book, index) => {
          return (
            <SwiperSlide key={index}>
              <BookCard
                book={book}
                onClick={onClick}
                showConfirmReturnButton={showConfirmReturnButton}
                handleConfirmReturn={handleConfirmReturn}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

BookCarousel.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      available: PropTypes.bool,
    })
  ).isRequired,
  onClick: PropTypes.bool,
  showConfirmReturnButton: PropTypes.bool,
  handleConfirmReturn: PropTypes.func,
};
