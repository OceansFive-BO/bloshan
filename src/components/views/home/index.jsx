import BookCarousel from '../../common/bookCarousel/BookCarousel.jsx';

export default function HomeView() {

  const exampleBooks1 = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: 'https://upload.wikimedia.org/wikipedia/en/f/f7/TheGreatGatsby_1925jacket.jpeg',
      description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      cover: 'https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG',
      description: 'The story of young Scout Finch and her father, lawyer Atticus Finch, as he defends',
    },
    {
      title: '1984',
      author: 'George Orwell',
      cover: 'https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg',
      description: 'A dystopian novel set in a totalitarian society where "Big Brother" watches over citizens.',
    },
    {
      title: 'The Great Gatsby 2',
      author: 'F. Scott Fitzgerald',
      cover: 'https://upload.wikimedia.org/wikipedia/en/f/f7/TheGreatGatsby_1925jacket.jpeg',
      description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    },
    {
      title: 'To Kill a Mockingbird 2',
      author: 'Harper Lee',
      cover: 'https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG',
      description: 'The story of young Scout Finch and her father, lawyer Atticus Finch, as he defends',
    },
    {
      title: '1984 2',
      author: 'George Orwell',
      cover: 'https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg',
      description: 'A dystopian novel set in a totalitarian society where "Big Brother" watches over citizens.',
    },
  ];
  const exampleBooks2 = [
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/1/14/PrideAndPrejudiceTitlePage.jpg',
      description: 'The story of Elizabeth Bennet and her love-hate relationship with Mr. Darcy.',
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      cover: 'https://upload.wikimedia.org/wikipedia/en/3/32/Rye_catcher.jpg',
      description: 'The story of Holden Caulfield, a teenager navigating the challenges of growing up.',
    },
    {
      title: 'Moby-D',
      author: 'Herman Melville',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Herman_Melville',
      description: 'The story of Captain Ahab and his obsessive...',
    },
  ];
  const exampleBooks3 = [
    {
      title: 'the Hobbit',
      author: 'J.R.R. Tolkien',
      cover: 'https://upload.wikimedia.org/wikipedia/en/3/30/Hobbit_cover.JPG',
      description: 'The story of Bilbo Baggins and his unexpected adventure with a group of dwarves.',
    },
    {
      title: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Doriangray.jpg',
      description: 'The story of... ',
    },
    {
      title: 'Frankenstein',
      author: 'Mary Shelley',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Frankenstein_1831',
      description: 'The story of a Monster...',
    },
  ];

  return (
    <div className="home-view">
      <div className="home-category">
        <h2>Featured</h2>
        <p>Check out the most popular titles!</p>
        <BookCarousel books={exampleBooks1}/>
      </div>
      <div className="home-category">
        <h2>Sci-fi</h2>
        <BookCarousel books={exampleBooks2}/>
      </div>
      <div className="home-category">
        <h2>Sci-fi</h2>
        <BookCarousel books={exampleBooks3}/>
      </div>
    </div>
  );
};