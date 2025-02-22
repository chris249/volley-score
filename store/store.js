import { observable, action } from 'mobx';
import axios from 'axios';

class ScoreStore {
  @observable matchId;
  @observable showColors = true;
  @observable showLogos = true;
  @observable isShowing = true;

  @observable
  homeTeam = {
    sets: 0,
    points: 0,
    name: '',
    logo: '',
    color: 'green',
  };

  @observable
  awayTeam = {
    sets: 0,
    points: 0,
    name: '',
    logo: '',
    color: 'blue',
  };

  intervalId;

  constructor(matchId) {
    this.matchId = matchId;
  }

  setScoreDelay(scoreDelay) {
    this.scoreDelay = scoreDelay;
  }

  @action
  startUpdates = () => {
    this.intervalId = setInterval(this.update, 2000);
    this.update();
  };

  @action
  stopUpdates = () => {
    clearInterval(this.intervalId);
  };

  doUpdateData = (data) => {
    this.homeTeam = {
      points: data.pointsA || 0,
      sets: data.setA || 0,
      logo: data.logoA || '',
      name: data.nameA || '',
      color: data.colorA || '',
    };
    this.awayTeam = {
      points: data.pointsB || 0,
      sets: data.setB || 0,
      logo: data.logoB || '',
      name: data.nameB || '',
      color: data.colorB || '',
    };
    this.showLogos = data.showLogos;
    this.showColors = data.showColors;
    this.isShowing = data.isShowing;
  }

  update = () => {
    axios.get(`/api/scores/${this.matchId}`).then(({ data }) => {
      if (this.scoreDelay) {
        setTimeout(() => this.doUpdateData(data), this.scoreDelay * 1000);
      }
      else {
        this.doUpdateData(data);
      }
    });
  };
}

export default ScoreStore;
