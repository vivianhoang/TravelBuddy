import * as Firebase from 'firebase';
import * as models from '../models';

export interface MatchStatusServiceDelegate {
  updateMatchStatus: (params: {matchStatus: models.MatchStatus}) => void,
  firebaseApp: Firebase.app.App,
}

export class MatchStatusService {

  delegate?: MatchStatusServiceDelegate;
  username?: string;
  unsubscribeFromUser?: (() => void);

  configure(params: {delegate: MatchStatusServiceDelegate}) {
    const { delegate } = params;
    if (!delegate) {
      throw new Error('User service delegate must be defined!');
    }
    this.delegate = delegate;
  }

  setUp() {
    if (!this.delegate) {
      throw new Error('User service delegate must be defined!');
    }
    if (!this.username) {
      throw new Error('Username must be defined!');
    }
    if (this.unsubscribeFromUser) {
      throw new Error('Must unsubscribe from user service!');
    }

    const delegate = this.delegate;
    const username = this.username;
    const db = delegate.firebaseApp.database();
    const eventTrigger = (snapshot: Firebase.database.DataSnapshot) => {
      const matchStatus: models.MatchStatus = snapshot.val();
      // Do something with user
      delegate.updateMatchStatus({matchStatus});
    };
    if (!this.unsubscribeFromUser) {
      const fbMatchStatusPath = `matchStatus/${username}`;
      db.ref(fbMatchStatusPath).on('value', eventTrigger);
      this.unsubscribeFromUser = () => {
        db.ref(fbMatchStatusPath).off('value', eventTrigger);
      };
    }
  }

  tearDown() {
    this.username = undefined;
    if (this.unsubscribeFromUser) {
      this.unsubscribeFromUser();
    }
  }
}