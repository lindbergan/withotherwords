import React from 'react';

import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Grid, Row} from 'react-bootstrap';
import {getWord} from '../utils/localizer';

import {initGa} from './ga';
import '../css/welcomescreen.css';
import '../css/global.css';

const isSweSelected = locale => {
  if (locale === 'sv-SE') return 'selected';
  else return '';
};

const isUsSelected = locale => {
  if (locale === 'en-US') return 'selected';
  else return '';
};

const usFlagUrl = 'icons/united-states-of-america-flag-round-icon-64.png';
const sweFlagUrl = 'icons/sweden-flag-round-icon-64.png';

const renderChooseLanguage = (locale, changeLanguage) => (
  <div className="chooseLanguage spacing">
    <h5 className="getStartedText">
      {getWord('getStartedText', locale)}
    </h5>
    <div className="centeredImages spacing">
      <img
        src={sweFlagUrl}
        className={`border-black primary ${isSweSelected(locale)}`}
        onClick={() => changeLanguage('sv-SE')}
        alt="swedish flag"
      />
      <img
        src={usFlagUrl}
        className={`border-black primary ${isUsSelected(locale)}`}
        onClick={() => changeLanguage('en-US')}
        alt="american flag"
      />
    </div>
  </div>
);

export const WelcomeScreen = ({locale, changeLanguage}) => {
  initGa();
  return (
    <Grid fluid>
      <Row>
        <h1 className="title">
          {getWord('welcomeText', locale)}
        </h1>
      </Row>
      <Row>
        { renderChooseLanguage(locale, changeLanguage) }
      </Row>
      <Row>
        <Link to="/settings" className="beginButton">
          <Button bsStyle="primary" bsSize="large">
            {getWord('startPlayingText', locale)}
          </Button>
        </Link>
      </Row>
    </Grid>);
};
