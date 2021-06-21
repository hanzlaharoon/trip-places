import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PlaceCard = ({
  place: { id, name, location, description, isFavorite },
  toggleFavorite,
}) => {
  const classes = useStyles();
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {location}
          </Typography>
          <Typography variant='body2' component='p'>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={() => toggleFavorite(isFavorite)}>
            {isFavorite ? 'Remove Favorite' : 'Add to Favorite'}
          </Button>
          <IconButton
            aria-label='add to favorites'
            onClick={() => toggleFavorite(isFavorite, id)}
          >
            <FavoriteIcon color={isFavorite ? 'secondary' : 'disabled'} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default PlaceCard;
