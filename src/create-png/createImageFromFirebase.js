const fs = require('fs');

const repng = require('repng');
const firebase = require('firebase');

const { Scoreboard } = require('../../components/scoreboard/Scoreboard');
const { getLastName } = require('../../store/logic');

async function createImage({ tournamentId, matchId, homeColor = '', awayColor = '' }) {
  return new Promise((resolve, reject) => {
    if (!tournamentId || !matchId) {
      reject({ ok: false, error: 'No tournamentId or/and matchId info given' });
    }

    const config = {
        apiKey: 'AIzaSyA2MGg86ObcFkwMkTfCR4FGm8wHOOpy6sU',
        authDomain: 'volleyball-score-137bd.firebaseapp.com',
        databaseURL: 'https://volleyball-score-137bd.firebaseio.com',
        projectId: 'volleyball-score-137bd',
        storageBucket: 'volleyball-score-137bd.appspot.com',
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    const ref = firebase.database().ref(`/tournament_matches/${tournamentId}/${matchId}`);
    ref.once('value', async (res) => {

      const match = res.val();
      if (!match) {
        reject({ ok: false, error: 'tournamentId  and matchId combo do not exist' });
        return;
      }
      const homeTeam = {
        points: match.pointsInCurrentSet[0],
        sets: match.setsWonByHomeTeam,
        logo: '',
        name: `${getLastName(match.h1Player)} / ${getLastName(match.h2Player)}`,
        color: homeColor || match.homeTeamColor || '#ff0000',
      };
      const awayTeam = {
        points: match.pointsInCurrentSet[1],
        sets: match.setsWonByAwayTeam,
        logo: '',
        name: `${getLastName(match.b1Player)} / ${getLastName(match.b2Player)}`,
        color: awayColor || match.awayTeamColor || '#00ffff',
      };

      const options = {
        width: 500,
        height: 200,
        cssLibrary: 'styled-components',
        puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
        props: {
          homeTeam,
          awayTeam,
          homeColor,
          awayColor,
          showLogos: false,
          showColors: true,
          isShowing: true,
        },
      };
      const stream = await repng(Scoreboard, options);

      const writeStream = fs.createWriteStream(
        `${__dirname}/../../static/score/firebase/${tournamentId}-${matchId}.png`,
      );
        writeStream.write(stream, (err) => {
          if (!err) {
            writeStream.end();
            resolve({ ok: true });
            return
          }
          writeStream.end();
          reject({ ok: false, error: err })

        })
    });
  });
}

module.exports = createImage;
