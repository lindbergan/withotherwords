import React from 'react';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

export const ErrorPage = () => (
  <div>
    <h1>Whoops!</h1>
    <Link to="/">
      <Button variant="contained" color="primary">Click to go back!</Button>
    </Link>
  </div>
);
