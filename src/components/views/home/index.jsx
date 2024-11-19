import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import BookCarousel from '../../common/bookCarousel/BookCarousel.jsx';
import './styles/index.css';
import { Typography } from '@mui/material';
import axios from 'axios';

export default function HomeView ({ isAuthenticated }) {

  const [bookSet1, setBookSet1] = useState([]);
  const [bookSet2, setBookSet2] = useState([]);
  const [bookSet3, setBookSet3] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/books/genre/fiction`)
      .then((response) => {
        setBookSet1(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:3000/books/genre/science`)
      .then((response) => {
        setBookSet2(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:3000/books/genre/art`)
      .then((response) => {
        setBookSet3(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="home-view">
      <div className="home-category">
        {bookSet1.length && (
          <>
            <div className="section-title">
              <Typography variant="h4" align="left">Fiction</Typography>
            </div>
            <BookCarousel onClick={true} books={bookSet1} />
          </>
        )}
      </div>
      <div className="home-category">
        {bookSet2.length && (
          <>
            <div className="section-title">
              <Typography variant="h4" align="left">Science</Typography>
            </div>
            <BookCarousel onClick={true} books={bookSet2} />
          </>
        )}
      </div>
      <div className="home-category">
        {bookSet3.length && (
          <>
            <div className="section-title">
              <Typography variant="h4" align="left">Art</Typography>
            </div>
            <BookCarousel onClick={true} books={bookSet3} />
          </>
        )}
      </div>
    </div>
  );
};

HomeView.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
};