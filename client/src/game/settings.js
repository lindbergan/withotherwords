import React from "react";
import { Button, Select, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

import { getWord } from "../utils/localizer";
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

const TextAndSelect = ({
  text,
  value,
  action,
  options,
  indefinite,
  locale
}) => (
  <React.Fragment>
    <p className="select-center">{text}</p>
    <Select
      value={value}
      onChange={e => action(e)}
      classes={{
        root: "select-center",
        select: "select-center",
        selectMenu: "select-center"
      }}
    >
      {renderOptions(...options)}
      {indefinite ? (
        <MenuItem value={999}>{getWord("indefinite", locale)}</MenuItem>
      ) : null}
    </Select>
  </React.Fragment>
);

export const Settings = ({
  locale,
  state,
  handleTimeLimitChange,
  handleNrTeamsChange,
  handleNrRoundsChange,
  handleNrOfPassesLimitChange
}) => {
  document.title = getWord("title-settings", locale);
  return (
    <Layout>
      <h1 className="header">{getWord("settings", locale)}</h1>
      <TextAndSelect
        text={getWord("selectTeamsText", locale)}
        value={state.nrOfTeams}
        action={handleNrTeamsChange}
        options={[2, 7, 1]}
        indefinite={false}
        locale={locale}
      />
      <TextAndSelect
        text={getWord("selectRoundsText", locale)}
        value={state.nrOfRounds}
        action={handleNrRoundsChange}
        options={[5, 20, 5]}
        indefinite={false}
        locale={locale}
      />
      <TextAndSelect
        text={getWord("selectTimeLimit", locale)}
        value={state.timeLimit}
        action={handleTimeLimitChange}
        options={[15, 60, 5]}
        indefinite={false}
        locale={locale}
      />
      <TextAndSelect
        text={getWord("selectNumberOfPasses", locale)}
        value={state.nrOfPassesLimit}
        action={handleNrOfPassesLimitChange}
        options={[0, 10, 1]}
        indefinite={true}
        locale={locale}
      />
      <div className="start-game-button">
        <Button component={Link} to="/game" variant="contained" color="primary">
          {getWord("finishedWithSettings", locale)}
        </Button>
      </div>
    </Layout>
  );
};
