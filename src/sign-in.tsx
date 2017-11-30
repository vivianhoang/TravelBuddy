
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

    return (
      <View 
        style={styles.container}>
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
          style={styles.button}>
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
    backgroundColor: '#3eb991',
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