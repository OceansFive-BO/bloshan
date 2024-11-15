import './bookCard.css';

import React from 'react';
import propTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function BookCard({ book }) {
  return (
    <Card className="book-card" sx={{ maxWidth: 345 }}>
      <CardHeader title={book.title} subheader={book.author} />
      <CardMedia
        component="img"
        height="250"
        image={book.image}
        alt="Book Cover"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {book.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

BookCard.propTypes = {
  book: propTypes.shape({
    title: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    cover: propTypes.string.isRequired,
  }).isRequired,
};
