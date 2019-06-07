import React from "react";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { getWord } from "../utils/localizer";

import { Layout } from "./layout";
import { sweLocale, engLocale } from "../utils/localizer";

import "../css/welcomescreen.css";
import "../css/global.css";

const usFlagUrl = "icons/united-states-of-america-flag-round-icon-64.png";
const sweFlagUrl = "icons/sweden-flag-round-icon-64.png";

function isUsSelected(locale) {
  return locale === engLocale ? "selected" : "not-selected";
}
function isSweSelected(locale) {
  return locale === sweLocale ? "selected" : "not-selected";
}

export const WelcomeScreen = ({ locale, changeLanguage }) => {
  document.title = getWord("title-home", locale);
  return (
    <Layout>
      <h1 className="title">{getWord("welcomeText", locale)}</h1>
      <div className="button-grid-container">
        <p className="grid-item text-grid starting-description">
          {getWord("getStartedText", locale)}
        </p>
        <img
          src={sweFlagUrl}
          className={`swe-flag grid-item image-grid ${isSweSelected(locale)}`}
          onClick={() => changeLanguage(sweLocale)}
          alt="swedish flag"
        />
        <img
          src={usFlagUrl}
          className={`us-flag grid-item image-grid ${isUsSelected(locale)}`}
          onClick={() => changeLanguage(engLocale)}
          alt="american flag"
        />
      </div>
      <Button
        component={Link}
        to="/settings"
        variant="contained"
        color="primary"
        size="large"
      >
        {getWord("startPlayingText", locale)}
      </Button>
    </Layout>
  );
};
