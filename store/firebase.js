import { observable, action } from 'mobx';
import firebase from 'firebase';
import {
  getHomeTeamPoints,
  getAwayTeamPoints,
  getHomeTeamSets,
  getAwayTeamSets,
  getHomeTeamColor,
  getAwayTeamColor,
  getHomeTeamLastNameString,
  getAwayTeamLastNameString,
  getLastName,
} from './logic';

class FirebaseStore {
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
    color: '#ff0000',
  };

  @observable
  awayTeam = {
    sets: 0,
    points: 0,
    name: '',
    logo: '',
    color: '#00ffff',
  };

  constructor(tournamentId, matchId, homeColor, awayColor) {
    this.tournamentId = tournamentId;
    this.matchId = matchId;
    this.homeColor = homeColor;
    this.awayColor = awayColor;
    if (!firebase.apps.length) {
      firebase.initializeApp(this.config);
    }
  }

  @action
  stopUpdates = () => {
    // TODO: Implement firebase unsubscribe
  };

  config = {
    apiKey: 'AIzaSyA2MGg86ObcFkwMkTfCR4FGm8wHOOpy6sU',
    authDomain: 'volleyball-score-137bd.firebaseapp.com',
    databaseURL: 'https://volleyball-score-137bd.firebaseio.com',
    projectId: 'volleyball-score-137bd',
    storageBucket: 'volleyball-score-137bd.appspot.com',
  };

  @action
  startUpdates = () => {
    const ref = firebase.database().ref(`/tournament_matches/${this.tournamentId}/${this.matchId}`);
    ref.on('value', (res) => {
      const match = res.val();
      if (!('isFinished' in match)) {
        return;
      }

      this.homeTeam = {
        points: match.pointsInCurrentSet[0],
        sets: match.setsWonByHomeTeam,
        logo: '',
        name: `${getLastName(match.h1Player)} / ${getLastName(match.h2Player)}`,
        color: this.homeColor || match.homeTeamColor || '#ff0000',
      };
      this.awayTeam = {
        points: match.pointsInCurrentSet[1],
        sets: match.setsWonByAwayTeam,
        logo: '',
        name: `${getLastName(match.b1Player)} / ${getLastName(match.b2Player)}`,
        color: this.awayColor || match.awayTeamColor || '#00ffff',
      };
      this.showLogos = false;
      this.showColors = true;
      this.isShowing = true;
    });
  };
}

export default FirebaseStore;
