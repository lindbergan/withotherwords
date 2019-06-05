import React from "react";
import { Button, Select, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

import { getWord } from "../utils/localizer";
import { initGa } from "./ga";
import { Layout } from "./layout";

import "../css/settings.css";
import "../css/global.css";

const renderOptions = (from, to, skip) => {
  return [...Array(to + 1).keys()]
    .filter(i => i >= from && (i + from) % skip === 0)
    .map(i => (
      <MenuItem value={i} key={i}>
        {i}
      </MenuItem>
    ));
};

const Header = ({ locale }) => (
  <h1 className="header">{getWord("settings", locale)}</h1>
);

const SelectTeams = ({ locale, nrOfTeams, handleNrTeamsChange }) => (
  <div>
    <p>{getWord("selectTeamsText", locale)}</p>
    <Select
      value={nrOfTeams}
      onChange={e => handleNrTeamsChange(e)}
      classes={{
        root: "select-center",
        select: "select-center",
        selectMenu: "select-center"
      }}
    >
      {renderOptions(2, 7, 1)}
    </Select>
  </div>
);

const SelectRounds = ({ locale, nrOfRounds, handleNrRoundsChange }) => (
  <div>
    <p>{getWord("selectRoundsText", locale)}</p>
    <Select
      value={nrOfRounds}
      onChange={e => handleNrRoundsChange(e)}
      classes={{
        root: "select-center",
        select: "select-center",
        selectMenu: "select-center"
      }}
    >
      {renderOptions(5, 20, 5)}
      <MenuItem value={999}>{getWord("indefinite", locale)}</MenuItem>
    </Select>
  </div>
);

const SelectTimeLimit = ({ locale, timeLimit, handleTimeLimitChange }) => (
  <div>
    <p>{getWord("selectTimeLimit", locale)}</p>
    <Select
      value={timeLimit}
      onChange={e => handleTimeLimitChange(e)}
      classes={{
        root: "select-center",
        select: "select-center",
        selectMenu: "select-center"
      }}
    >
      {renderOptions(15, 60, 5)}
    </Select>
  </div>
);

const SelectPassesLimit = ({
  locale,
  nrOfPassesLimit,
  handleNrOfPassesLimitChange
}) => (
  <div>
    <p>{getWord("selectNumberOfPasses", locale)}</p>
    <Select
      value={nrOfPassesLimit}
      onChange={e => handleNrOfPassesLimitChange(e)}
      classes={{
        root: "select-center",
        select: "select-center",
        selectMenu: "select-center"
      }}
    >
      {renderOptions(0, 10, 1)}
      <MenuItem value={999}>{getWord("indefinite", locale)}</MenuItem>
    </Select>
  </div>
);

const StartButton = ({ locale }) => (
  <div className="start-game-button">
    <Button component={Link} to="/game" variant="contained" color="primary">
      {getWord("finishedWithSettings", locale)}
    </Button>
  </div>
);

export const Settings = ({
  locale,
  state,
  handleTimeLimitChange,
  handleNrTeamsChange,
  handleNrRoundsChange,
  handleNrOfPassesLimitChange
}) => {
  initGa();
  document.title = getWord("title-settings", locale);
  return (
    <Layout>
      <Header locale={locale} />
      <SelectTeams
        locale={locale}
        nrOfTeams={state.nrOfTeams}
        handleNrTeamsChange={handleNrTeamsChange}
      />
      <SelectRounds
        locale={locale}
        nrOfRounds={state.nrOfRounds}
        handleNrRoundsChange={handleNrRoundsChange}
      />
      <SelectTimeLimit
        locale={locale}
        timeLimit={state.timeLimit}
        handleTimeLimitChange={handleTimeLimitChange}
      />
      <SelectPassesLimit
        locale={locale}
        nrOfPassesLimit={state.nrOfPassesLimit}
        handleNrOfPassesLimitChange={handleNrOfPassesLimitChange}
      />
      <StartButton locale={locale} />
    </Layout>
  );
};
