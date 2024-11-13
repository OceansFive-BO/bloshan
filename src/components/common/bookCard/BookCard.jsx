import './bookCard.css';

import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function BookCard() {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="Book Title"
        subheader="Author"
      />
      <CardMedia
        component="img"
        height="250"
        image="src/assets/headshot.jpg"
        alt="Book Cover"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Author
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description
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