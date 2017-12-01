import * as React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import * as models from './models';
import { Dispatcher, ActionType } from './actions';
import SignIn from './sign-in';
import MatchFlow from './match-flow';

interface OwnProps {

}

interface StateToProps {
  user: models.User | undefined,
  isLoading: boolean,
}

interface DispatchToProps {
  signIn: (name: string) => void,
}

type Props = OwnProps & StateToProps & DispatchToProps;

class Root extends React.Component<Props, {}> {

  renderContent(): JSX.Element {
    const { signIn, user } = this.props;

    if (!user) {
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

  renderLoader(): JSX.Element | null {
    const { isLoading } = this.props;

    if (!isLoading) {
      return null;
    }

    return (
      <View
        style={styles.loaderPage}>
        <View
          style={styles.loaderContainer}>
          <ActivityIndicator
            size={'large'}
            color={'white'}
          />
        </View>
      </View>
    )
  }

  render() {
    const content = this.renderContent();
    const loader = this.renderLoader();

    return (
      <View
        style={styles.container}>
        { content }
        { loader }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderPage: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

const mapStateToProps = (state: models.ReduxState, ownProps: OwnProps
): StateToProps => {
  const user = state.app.user;
  const isLoading = state.app.isLoading;

  return {
    user,
    isLoading,
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