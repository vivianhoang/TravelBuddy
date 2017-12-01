import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as models from './models';
import { Dispatcher, ActionType } from './actions';
import SignIn from './sign-in';
import MatchFlow from './match-flow';

interface OwnProps {

}

interface StateToProps {
  username: string
}

interface DispatchToProps {
  signIn: (name: string) => void,
}

type Props = OwnProps & StateToProps & DispatchToProps;

class Root extends React.Component<Props, {}> {

  renderContent(): JSX.Element {
    const { signIn, username } = this.props;

    if (!username) {
      return (
        <SignIn
          signIn={(name: string) => signIn(name)}
        />
      );
    }

    return (
      <MatchFlow />
    )
  }

  render() {
    const content = this.renderContent();

    return (
      <View
        style={styles.container}>
        { content }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state: models.ReduxState, ownProps: OwnProps
): StateToProps => {
  const username = state.app.username
  return {
    username
  }
};

const mapDispatchToProps = (dispatch: Dispatcher): DispatchToProps => {
  return {
    signIn: (name: string) => dispatch({type: ActionType.SignIn, name}),
  }
};

const RootConnected: React.ComponentClass<OwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);

export default RootConnected;