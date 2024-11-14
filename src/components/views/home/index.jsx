import BookCarousel from '../../common/bookCarousel/BookCarousel.jsx';
import './styles/index.css';
import { Typography } from '@mui/material';

export default function HomeView () {

  const exampleBooks1 = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of young Scout Finch and her father, lawyer Atticus Finch, as he defends',
    },
    {
      title: '1984',
      author: 'George Orwell',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'A dystopian novel set in a totalitarian society where "Big Brother" watches over citizens.',
    },
    {
      title: 'The Great Gatsby 2',
      author: 'F. Scott Fitzgerald',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    },
    {
      title: 'To Kill a Mockingbird 2',
      author: 'Harper Lee',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of young Scout Finch and her father, lawyer Atticus Finch, as he defends',
    },
    {
      title: '1984 2',
      author: 'George Orwell',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'A dystopian novel set in a totalitarian society where "Big Brother" watches over citizens.',
    },
  ];
  const exampleBooks2 = [
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of Elizabeth Bennet and her love-hate relationship with Mr. Darcy.',
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of Holden Caulfield, a teenager navigating the challenges of growing up.',
    },
    {
      title: 'Moby-D',
      author: 'Herman Melville',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of Captain Ahab and his obsessive...',
    },
  ];
  const exampleBooks3 = [
    {
      title: 'the Hobbit',
      author: 'J.R.R. Tolkien',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of Bilbo Baggins and his unexpected adventure with a group of dwarves.',
    },
    {
      title: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of... ',
    },
    {
      title: 'Frankenstein',
      author: 'Mary Shelley',
      cover: 'https://m.media-amazon.com/images/I/81ewpuVnBKL._AC_UF1000,1000_QL80_.jpg',
      description: 'The story of a Monster...',
    },
  ];

  return (
    <div className="home-view">
      <div className="home-category">
        <div className="section-title">
          <Typography variant="h4" align="left">Featured</Typography>
        </div>
        <BookCarousel books={exampleBooks1}/>
      </div>
      <div className="home-category">
        <div className="section-title">
          <Typography variant="h4" align="left">Sci-Fi</Typography>
        </div>
        <BookCarousel books={exampleBooks2}/>
      </div>
      <div className="home-category">
        <div className="section-title">
          <Typography variant="h4" align="left">Featured</Typography>
        </div>
        <BookCarousel books={exampleBooks3}/>
      </div>
    </div>
  );
};
