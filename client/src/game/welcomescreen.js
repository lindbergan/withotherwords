import React from 'react';

import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {getWord} from '../utils/localizer';

import {initGa} from './ga';
import {Layout} from './layout';
import {sweLocale, engLocale} from '../utils/localizer';

import '../css/welcomescreen.css';
import '../css/global.css';

const isUsSelected = locale =>
  locale === engLocale ? 'selected' : 'not-selected';
const isSweSelected = locale =>
  locale === sweLocale ? 'selected' : 'not-selected';

const usFlagUrl = 'icons/united-states-of-america-flag-round-icon-64.png';
const sweFlagUrl = 'icons/sweden-flag-round-icon-64.png';

const UsFlag = ({locale, changeLanguage}) => (
  <img
    src={usFlagUrl}
    className={`us-flag grid-item image-grid ${isUsSelected(locale)}`}
    onClick={() => changeLanguage(engLocale)}
    alt="american flag">
  </img>
);

const SweFlag = ({locale, changeLanguage}) => (
  <img
    src={sweFlagUrl}
    className={`swe-flag grid-item image-grid ${isSweSelected(locale)}`}
    onClick={() => changeLanguage(sweLocale)}
    alt="swedish flag">
  </img>
);

const GetStartedDescription = ({locale}) => (
  <p className="grid-item text-grid starting-description">
    {getWord('getStartedText', locale)}
  </p>
);

const ChooseLanguageButtons = ({locale, changeLanguage}) => (
  <div className="button-grid-container">
    <GetStartedDescription locale={locale}/>
    <SweFlag locale={locale} changeLanguage={changeLanguage}/>
    <UsFlag locale={locale} changeLanguage={changeLanguage}/>
  </div>
);

const PlayButton = ({locale}) => (
  <div>
    <Button component={Link}
      to="/settings"
      variant="contained"
      color="primary"
      size="large">
      {getWord('startPlayingText', locale)}
    </Button>
  </div>
);

const Title = ({locale}) => (
  <h1 className="title">{getWord('welcomeText', locale)}</h1>
);

export const WelcomeScreen = ({locale, changeLanguage}) => {
  initGa();
  return (
    <Layout showPhoneImage={false}>
      <Title locale={locale}/>
      <ChooseLanguageButtons locale={locale} changeLanguage={changeLanguage}/>
      <PlayButton locale={locale}/>
    </Layout>);
};
