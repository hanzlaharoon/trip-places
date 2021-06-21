import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import PlaceCard from './PlaceCard';

const Main = () => {
  const [serachQuery, setSerachQuery] = useState('');
  const [placesList, setPlacesList] = useState();

  // Populate Data
  useEffect(() => {
    const data = [
      {
        id: 1,
        name: 'F9 Park',
        location: 'F9, Islamabad',
        description: 'Family Park',
        isFavorite: true,
      },
      {
        id: 2,
        name: 'Centorus Mall',
        location: 'F8, Islamabad',
        description: 'Shopping Mall',
        isFavorite: false,
      },
      {
        id: 3,
        name: 'KFC, F10 Brach',
        location: 'F10 Markaz, Islamabad',
        description: 'Fast Food',
        isFavorite: false,
      },
    ];

    setPlacesList(data);
  }, []);

  function toggleFavorite(value, id) {
    //   Api Call
  }

  return (
    <>
      <Navbar
        serachQuery={serachQuery}
        handleSerachQuery={(e) => setSerachQuery(e.target.value)}
      />

      <Box padding={1} margin={1}></Box>

      <Box padding={1} margin={1}>
        <Grid container spacing={4}>
          {/* {!placesList && 'Add Places to see here!'} */}
          {placesList &&
            placesList.map((place) => (
              <Grid key={place.id} item xs={12} sm={6} md={3}>
                <PlaceCard place={place} toggleFavorite={toggleFavorite} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default Main;
