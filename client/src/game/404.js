import React from 'react';
import {Grid} from 'react-bootstrap';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

export const ErrorPage = () => (
  <Grid>
    <h1>Whoops!</h1>
    <Link to="/">
      <Button variant="contained" color="primary">Click to go back!</Button>
    </Link>
  </Grid>
);
