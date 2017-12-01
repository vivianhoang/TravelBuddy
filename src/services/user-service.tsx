import * as Firebase from 'firebase';
import * as models from '../models';

export interface UserServiceDelegate {
  updateUser: (params: {user: models.User}) => void,
  firebaseApp: Firebase.app.App,
}

export class UserService {

  delegate?: UserServiceDelegate;
  username?: string;
  unsubscribeFromUser?: (() => void);

  configure(params: {delegate: UserServiceDelegate}) {
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
      const user: models.User = snapshot.val();
      // Do something with user
      delegate.updateUser({user});
    };
    if (!this.unsubscribeFromUser) {
      const fbUserPath = `users/${username}`;
      db.ref(fbUserPath).on('value', eventTrigger);
      this.unsubscribeFromUser = () => {
        db.ref(fbUserPath).off('value', eventTrigger);
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