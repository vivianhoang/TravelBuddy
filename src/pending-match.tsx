
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { connect } from 'react-redux';
// import * as models from './models';
// import { Dispatcher } from './actions';

interface StateToProps {

}

interface DispatchToProps {

}

interface OwnProps {
  resetMatch: () => void,
}

interface State {
}

type Props = OwnProps & StateToProps & DispatchToProps;

class PendingMatch extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  renderResetMatchButton(): JSX.Element {
    const { resetMatch } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          resetMatch();
        }}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          {'Reset Match'}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const resetMatchButton = this.renderResetMatchButton();

    return (
      <View 
        style={styles.container}>
        { resetMatchButton }
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
  button: {
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
});

export default PendingMatch;