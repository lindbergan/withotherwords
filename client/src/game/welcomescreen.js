import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Button, Snackbar, IconButton } from "@material-ui/core";
import { Info as InfoIcon, MoreVert } from "@material-ui/icons";
import { getWord } from "../utils/localizer";

import classNames from "classnames";

import { Layout } from "./layout";
import { sweLocale, engLocale } from "../utils/localizer";

import "../css/welcomescreen.css";
import "../css/global.css";

const usFlagUrl = "icons/united-states-of-america-flag-round-icon-64.png";
const sweFlagUrl = "icons/sweden-flag-round-icon-64.png";

const ShareIcon = () =>
  isIOS ? (
    <img
      className="shareIcon"
      src="icons/addtohomescreen.png"
      alt="Add to home screen!"
    />
  ) : (
    <MoreVert />
  );

function isAndroid() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android/i.test(userAgent);
}

function isIOS() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
}

function eitherAndroidOrIOS() {
  return isAndroid() || isIOS();
}

export class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { appSnackbarIsOpen: false, infoSnackbarIsOpen: false };
  }

  componentDidMount() {
    const showAppSnackbar =
      !window.matchMedia("(display-mode: fullscreen)").matches &&
      eitherAndroidOrIOS();
    if (showAppSnackbar) {
      this.timeIn = setTimeout(
        () => this.setState({ appSnackbarIsOpen: true }),
        500
      );
      this.timeOut = setTimeout(
        () => this.setState({ appSnackbarIsOpen: false }),
        5000
      );
    }
    // this.infoSnackbarTimeIn = setTimeout(
    //   () => this.setState({ infoSnackbarIsOpen: true }),
    //   showAppSnackbar ? 5500 : 500
    // );
    // this.infoSnackbarTimeOut = setTimeout(
    //   () => this.setState({ infoSnackbarIsOpen: false }),
    //   showAppSnackbar ? 5500 + 5000 : 5000
    // );
  }

  componentWillUnmount() {
    clearTimeout(this.timeIn);
    clearTimeout(this.timeOut);
    clearTimeout(this.infoSnackbarTimeIn);
    clearTimeout(this.infoSnackbarTimeOut);
  }

  render() {
    const { locale, changeLanguage } = this.props;
    document.title = getWord("title-home", locale);
    return (
      <React.Fragment>
        <Layout>
          <h1 className="title">{getWord("welcomeText", locale)}</h1>
          <div className="button-grid-container">
            <p className="grid-item text-grid starting-description">
              {getWord("getStartedText", locale)}
            </p>
            <img
              src={sweFlagUrl}
              className={classNames("swe-flag", "grid-item", "image-grid", {
                selected: locale === sweLocale,
                notSelected: locale !== sweLocale,
              })}
              onClick={() => changeLanguage(sweLocale)}
              alt="swedish flag"
            />
            <img
              src={usFlagUrl}
              className={classNames("us-flag grid-item image-grid", {
                selected: locale === engLocale,
                notSelected: locale !== engLocale,
              })}
              onClick={() => changeLanguage(engLocale)}
              alt="american flag"
            />
          </div>
          <Button
            component={Link}
            to="/settings"
            variant="contained"
            color="primary"
            size="large">
            {getWord("startPlayingText", locale)}
          </Button>
        </Layout>
        <Snackbar
          classes={{
            root: "snackbar",
          }}
          message={
            <span className="snackbar-span">
              <InfoIcon />
              <span>{getWord("add2HomeScreen", locale)}</span>
            </span>
          }
          open={this.state.appSnackbarIsOpen}
          action={[
            <IconButton key="info" aria-label="Info" color="inherit">
              <ShareIcon />
            </IconButton>,
          ]}
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.whenwasit.online?from=medandraord">
          <Snackbar
            classes={{
              root: "snackbar",
            }}
            message={
              <span className="snackbar-span">
                <InfoIcon />
                <span>{getWord("whenwasit", locale)}</span>
              </span>
            }
            open={this.state.infoSnackbarIsOpen}
          />
        </a>
      </React.Fragment>
    );
  }
}
