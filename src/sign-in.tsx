
import * as React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

interface OwnProps {
  signIn: (name: string) => void
}

interface State {
  name: string,
}

type Props = OwnProps;

export default class SignIn extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  render() {
    const { name } = this.state;
    const { signIn } = this.props
    const buttonColor = !name ? "#d3e2dd": "#3eb991"

    return (
      <View 
        style={styles.container}>
        <View>
          <Text 
            style={styles.title}
            >
              {'Travel Buddy'}
          </Text>
        </View>
        <TextInput
          style={styles.nameInput}
          value={name}
          placeholder={'Enter your name...'}
          onChange={(e) => {
            const text = e.nativeEvent.text;
            this.setState({
              name: text,
            });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            signIn(name);
          }}
          style={[styles.button, {
            backgroundColor: buttonColor
          }]}>
          <Text
            style={styles.buttonText}>
            {'Sign In'}
          </Text>
        </TouchableOpacity>
        <View 
          style={styles.keyboardSpacer}
        />
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
  title: {
    fontWeight: '800',
    fontFamily: 'Courier',
    fontSize: 30
  },
  nameInput: {
    height: 44,
    width: 200,
    borderBottomWidth: 1,
    marginTop: 75
  },
  keyboardSpacer: {
    height: 300,
  },
  button: {
    height: 50,
    width: 200,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
});