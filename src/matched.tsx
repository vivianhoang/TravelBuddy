
import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import * as models from './models';

interface StateToProps {

}

interface DispatchToProps {

}

interface OwnProps {
  resetMatch: () => void,
  connection: models.Connection,
  username: string
}

interface State {
}

type Props = OwnProps & StateToProps & DispatchToProps;

class Matched extends React.Component<Props, State> {

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
    const { connection, username } = this.props;

    const otherUsername = Object.keys(connection.members).filter((name: string) => { 
      return name !== username;
    })[0];

    return (
      <View 
        style={styles.container}>
        <Text
          style={styles.title}>
            { `You matched with ${otherUsername} at ${connection.city}. Hooray!!` }
        </Text>          
        <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('./static/HappyFace.png')}
            />
        </View>
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
    width: 350
  },
  title: {
    justifyContent: 'center',
    fontSize: 30,
    fontFamily: 'Courier',
    textAlign: 'center',
  },
  nameInput: {
    height: 44,
    width: 200,
    borderBottomWidth: 1,
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75
  },
});

export default Matched;