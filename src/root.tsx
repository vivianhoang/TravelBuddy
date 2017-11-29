import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as models from './models';
import { Dispatcher } from './actions';

interface OwnProps {

}

interface StateToProps {

}

interface DispatchToProps {

}

type Props = OwnProps & StateToProps & DispatchToProps;

class Root extends React.Component<Props, {}> {
  render() {
    return (
      <View
        style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});

const mapStateToProps = (state: models.ReduxState, ownProps: OwnProps
): StateToProps => {
  return {

  }
};

const mapDispatchToProps = (dispatch: Dispatcher): DispatchToProps => {
  return {

  }
};

const RootConnected: React.ComponentClass<OwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);

export default RootConnected;