
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import * as models from './models';
import { Dispatcher } from './actions';

interface StateToProps {

}

interface DispatchToProps {

}

interface OwnProps {
}

interface State {
}

type Props = OwnProps & StateToProps & DispatchToProps;

class Matched extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {

    return (
      <View 
        style={styles.container}>
        {`Where to?`}
        <TouchableOpacity
          onPress={() => {
          }}
          style={styles.button}>
          <Text
            style={styles.buttonText}>
            {'Create Match'}
          </Text>
        </TouchableOpacity>
        {/* <View 
          style={styles.keyboardSpacer}
        /> */}
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
  nameInput: {
    height: 44,
    width: 200,
    borderBottomWidth: 1,
  },
  keyboardSpacer: {
    height: 300,
  },
  button: {
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
});

export default Matched;