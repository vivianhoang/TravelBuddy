import * as Firebase from 'firebase';
import * as models from '../models';

export interface UserServiceDelegate {
  updateUser: (params: {user: models.User}) => void,
  setConnection: (params: {connection: models.Connection}) => void,
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

    // Declaring the callback for the subscription
    const eventTrigger = (snapshot: Firebase.database.DataSnapshot) => {
      const user: models.User = snapshot.val();

      if (user.connectionId) {
        // Grab connection info
        const fbConnectionPath = `connections/${user.connectionId}`;
        db.ref(fbConnectionPath).once('value', (snapshot: Firebase.database.DataSnapshot) => {
          const connection: models.Connection = snapshot.val();
          delegate.setConnection({connection});

          // Do something with user
          delegate.updateUser({user});
        });
      } else {
        // Do something with user. This is repeated because delegate.updateUser is being called too quickly when there is a connectionId
        delegate.updateUser({user});
      }
    };
    if (!this.unsubscribeFromUser) {
      const fbUserPath = `users/${username}`;
      // creates the initial subscription, which only occurs once as long as unsubscripedFromusers is not defined
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
      this.unsubscribeFromUser = undefined;
    }
  }
}