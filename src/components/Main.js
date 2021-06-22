import { Box, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Navbar from './Navbar';
import PlaceCard from './PlaceCard';
import Pagination from '@material-ui/lab/Pagination';

const Main = () => {
  const [serachQuery, setSerachQuery] = useState('');
  const [placesList, setPlacesList] = useState();
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  // Populate Data
  useEffect(() => {
    // const data = [
    //   {
    //     id: 1,
    //     name: 'F9 Park',
    //     location: 'F9, Islamabad',
    //     description: 'Family Park',
    //     favorite: true,
    //   },
    //   {
    //     id: 2,
    //     name: 'Centorus Mall',
    //     location: 'F8, Islamabad',
    //     description: 'Shopping Mall',
    //     favorite: false,
    //   },
    //   {
    //     id: 3,
    //     name: 'KFC, F10 Brach',
    //     location: 'F10 Markaz, Islamabad',
    //     description: 'Fast Food',
    //     favorite: false,
    //   },
    // ];
    // setPlacesList(data);

    if (!showFavorites) {
      axios
        .get(baseUrl + 'places/', {
          params: { limit: 7, page: currentPage },
        })
        .then((res) => {
          console.log('/places', res);
          setPlacesList(res.data.places);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(baseUrl + 'places/favorites/', {
          params: { limit: 5, page: currentPage },
        })
        .then((res) => {
          console.log('places/favorites', res);
          setPlacesList(res.data.places);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log(err));
    }
  }, [showFavorites, currentPage]);

  function toggleFavoritePlace(value, id) {
    axios
      .put(baseUrl + `places/place/${id}/`, {
        favorite: value,
      })
      .then((res) => {
        console.log(`places/place/${id}/`, res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar
        serachQuery={serachQuery}
        handleSerachQuery={(e) => setSerachQuery(e.target.value)}
      />

      <Box padding={1} margin={1}>
        <Button
          variant={!showFavorites ? 'outlined' : 'text'}
          onClick={() => {
            setShowFavorites(false);
            setCurrentPage(1);
          }}
        >
          All
        </Button>
        <Button
          variant={showFavorites ? 'outlined' : 'text'}
          onClick={() => {
            setShowFavorites(true);
            setCurrentPage(1);
          }}
        >
          Favorites
        </Button>
      </Box>

      <Box padding={1} margin={1}>
        <Grid container spacing={4}>
          {/* {!placesList && 'Add Places to see here!'} */}
          {/* .filter((place) => {
                if (showFavorites && place.favorite) {
                  return place;
                } else if (!showFavorites) return place;
              }) */}
          {placesList &&
            placesList.map((place) => (
              <Grid key={place._id} item xs={12} sm={6} md={3}>
                <PlaceCard
                  // key={place._id}
                  place={place}
                  toggleFavorite={toggleFavoritePlace}
                />
              </Grid>
            ))}
        </Grid>
      </Box>

      <Grid container justify='center'>
        <Grid item>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
