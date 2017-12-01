
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

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
          {'Go Back'}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const resetMatchButton = this.renderResetMatchButton();

    return (
      <View 
        style={styles.container}>
        <View>
          <Text
            style={styles.title}>
            {'We could not find a match for you.'}
          </Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('./static/SadFace.png')}
            />
          </View>
        </View>
        <View 
          style={styles.keyboardSpacer}
        />
        <Text
          style={styles.message}>
          {'Wait for a match, or update your location.'}
        </Text>
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
    width: 300
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    fontSize: 30,
    fontFamily: 'Courier',
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
  },
  image: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75
  },
  button: {
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
  keyboardSpacer: {
    height: 75,
  },
});

export default PendingMatch;