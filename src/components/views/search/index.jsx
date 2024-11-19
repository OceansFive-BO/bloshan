import { useEffect, useState } from 'react';
import BookCard from '../../common/bookCard/BookCard';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import styled from '@mui/system/styled';
import propTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './styles/SearchView.css';

export default function SearchView ({ searchString }) {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/books?title=${searchString}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [setBooks, searchString]);

  if (!books.length) {
    return (
      <Box className="search-view" sx={{ flexGrow: 1, pl: 10, height: "1000px" }}>
        <Typography variant="h4" gutterBottom>
          No books found
        </Typography>
      </Box>
    );
  }
  return (
    <Box className="search-view" sx={{ flexGrow: 1, pl: 10 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {books.map((book, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4 }}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

SearchView.propTypes = {
  searchString: propTypes.string,
};