import React from 'react';
import BookCard from '../../common/bookCard/BookCard';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    borderColor: '#444d58',
  }),
}));

export default function SearchView() {

  const exampleBooks1 = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of young Scout Finch and her father, lawyer Atticus Finch, as he defends',
    },
    {
      title: '1984',
      author: 'George Orwell',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'A dystopian novel set in a totalitarian society where "Big Brother" watches over citizens.',
    },
    {
      title: 'The Great Gatsby 2',
      author: 'F. Scott Fitzgerald',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    },
    {
      title: 'To Kill a Mockingbird 2',
      author: 'Harper Lee',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of young Scout Finch and her father, lawyer Atticus Finch, as he defends',
    },
    {
      title: '1984 2',
      author: 'George Orwell',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'A dystopian novel set in a totalitarian society where "Big Brother" watches over citizens.',
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of Elizabeth Bennet and her love-hate relationship with Mr. Darcy.',
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of Holden Caulfield, a teenager navigating the challenges of growing up.',
    },
    {
      title: 'Moby-D',
      author: 'Herman Melville',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of Captain Ahab and his obsessive...',
    },
    {
      title: 'the Hobbit',
      author: 'J.R.R. Tolkien',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of Bilbo Baggins and his unexpected adventure with a group of dwarves.',
    },
    {
      title: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of... ',
    },
    {
      title: 'Frankenstein',
      author: 'Mary Shelley',
      image: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of a Monster...',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, pl: 10 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {exampleBooks1.map((book, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4 }}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};