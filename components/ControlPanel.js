import React, { PropTypes } from 'react';
import TeamControl from './TeamControl';
import classNames from 'classnames';
import styled from 'styled-components';
import CheckBox from './form/CheckBox';
import Notification from './Notification';
import { Scoreboard } from './scoreboard/Scoreboard';

const SuperCheckBox = styled(CheckBox)`
  margin: 4px;
`;

function ControlPanel(props) {
  return (
    <div>
      <section className="section is-medium container">
        <h1 className="title is-1">Volleyball Scoreboard</h1>
        <Notification>
          Please insert a match code of your choice.
          Remember it for later if you want to come back to the same game.<br />
          If you pick something common, like "123", chances are high someone else i going to do the same.<br />
          <strong>Example</strong>: "dragvoll-court-1".
        </Notification>
        <label className="label" htmlFor="matchId">Match Code</label>
        <p className="control">
          <input
            type="text"
            className="input is-large"
            onChange={props.onMatchIdChange}
            placeholder="Match Code"
            id="matchId"
          />
        </p>
        { props.matchId.length > 2 &&
          <div>
            <label className="label" htmlFor="scoreLink">OBS Link</label>
            <p className="control">
              <input
                type="text"
                className="input is-large"
                placeholder="OBS Link"
                id="scoreLink"
                readOnly
                value={`${window.location.href}scoreboard?matchId=${props.matchId}`}
              />
            </p>
          </div>
        }
      </section>
      { props.matchId.length > 2 &&
        <div>
          <section id="buttonList" className="section container is-flex-wrap">
            <button className="button is-large is-danger margin-4" onClick={props.onResetClick}>Reset points</button>
            <button className="button is-large is-info margin-4" onClick={props.onFlipClick}>Flip teams</button>
            <SuperCheckBox
              checked={props.showLogos}
              label="Team logos"
              onCheck={props.onLogoCheck}
            />
            <SuperCheckBox
              checked={props.showColors}
              label="Shirt colors"
              onCheck={props.onColorCheck}
            />
          </section>
          <section className="section container">
            <h3 className="title is-3">Preview</h3>
            <Scoreboard
              homeTeam={{
                points: props.pointsA,
                sets: props.setA,
                name: props.nameA,
                color: props.colorA,
                logo: props.logoA,
              }}
              awayTeam={{
                points: props.pointsB,
                sets: props.setB,
                name: props.nameB,
                color: props.colorB,
                logo: props.logoB,
              }}
              showLogos={props.showLogos}
              showColors={props.showColors}
            />
          </section>
          <section id="controlPanel" className="section container">
            <div className={classNames('columns', 'is-mobile', { 'is-reversed': props.isFlipped })}>
              <TeamControl
                nameLabel="Home Team"
                name={props.nameA}
                onNameChange={props.onNameAChange}
                points={props.pointsA}
                sets={props.setA}
                incrementPoints={() => props.onIncrement('pointsA')}
                decrementPoints={() => props.onDecrement('pointsA')}
                incrementSets={() => props.onIncrement('setA')}
                decrementSets={() => props.onDecrement('setA')}
                onLogoChange={props.onLogoAChange}
                onColorChange={props.onColorAChange}
                logo={props.logoA}
                color={props.colorA}
                isFlipped={!props.isFlipped}
                isGreen={false}
                showLogos={props.showLogos}
                showColor={props.showColors}
              />
              <TeamControl
                nameLabel="Away Team"
                name={props.nameB}
                onNameChange={props.onNameBChange}
                points={props.pointsB}
                sets={props.setB}
                incrementPoints={() => props.onIncrement('pointsB')}
                decrementPoints={() => props.onDecrement('pointsB')}
                incrementSets={() => props.onIncrement('setB')}
                decrementSets={() => props.onDecrement('setB')}
                onLogoChange={props.onLogoBChange}
                onColorChange={props.onColorBChange}
                logo={props.logoB}
                color={props.colorB}
                isFlipped={props.isFlipped}
                isGreen
                showLogos={props.showLogos}
                showColor={props.showColors}
              />
            </div>
          </section>
        </div>
      }
      </div>
  );
}

ControlPanel.propTypes = {
  onMatchIdChange: PropTypes.func,
  onNameAChange: PropTypes.func,
  onNameBChange: PropTypes.func,
  onLogoAChange: PropTypes.func,
  onLogoBChange: PropTypes.func,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onResetClick: PropTypes.func,
  onLogoCheck: PropTypes.func,
  onColorCheck: PropTypes.func,
  onFlipClick: PropTypes.func.isRequired,
  matchId: PropTypes.string,
  pointsA: PropTypes.number,
  pointsB: PropTypes.number,
  setA: PropTypes.number,
  setB: PropTypes.number,
  nameA: PropTypes.string,
  nameB: PropTypes.string,
  logoA: PropTypes.string,
  logoB: PropTypes.string,
  colorA: PropTypes.string,
  colorB: PropTypes.string,
  isFlipped: PropTypes.bool,
  showLogos: PropTypes.bool,
  showColors: PropTypes.bool,
};

export default ControlPanel;
