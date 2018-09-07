import React from 'react';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Layout} from './layout';

import '../css/404.css';

export const ErrorPage = () => (
  <Layout>
    <h1 className="h1-404">Whoops!</h1>
    <Link to="/" className="a-404">
      <Button
        variant="contained"
        style={{
          fontSize: 30,
          padding: 5,
          width: 100,
        }}
        color="primary">←
      </Button>
    </Link>
  </Layout>
);
