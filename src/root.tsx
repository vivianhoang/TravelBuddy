import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as models from './models';
import { Dispatcher, ActionType } from './actions';

interface OwnProps {

}

interface StateToProps {

}

interface DispatchToProps {
  createOffer: (params: {name: string}) => void,
}

type Props = OwnProps & StateToProps & DispatchToProps;

class Root extends React.Component<Props, {}> {

  render() {
    const { createOffer } = this.props;

    return (
      <View
        style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            createOffer({name: 'vivian'});
          }}
          style={styles.button}>
          <Text
            style={styles.buttonText}>
            { 'CREATE OFFER' }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: '#3eb991',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
});

const mapStateToProps = (state: models.ReduxState, ownProps: OwnProps
): StateToProps => {
  return {

  }
};

const mapDispatchToProps = (dispatch: Dispatcher): DispatchToProps => {
  return {
    createOffer: (params: {name: string}) => dispatch({type: ActionType.CreateOffer, name: params.name}),
  }
};

const RootConnected: React.ComponentClass<OwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);

export default RootConnected;