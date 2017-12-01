
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { connect } from 'react-redux';
import * as models from './models';
// import { Dispatcher } from './actions';

interface StateToProps {

}

interface DispatchToProps {

}

interface OwnProps {
  findMatch: (city: models.City) => void,
}

interface State {
  selectedCity: models.City
}

type Props = OwnProps & StateToProps & DispatchToProps;

class CreateMatch extends React.Component<Props, State> {

  cities: models.City[];

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCity: 'SF'
    }
    
    this.cities = ['SF', 'LA', 'NY'];
  }

  renderLocationOptions(): JSX.Element {
    const { selectedCity } = this.state;
    return (
      <View
        style={styles.optionContainer}>
        {
          this.cities.map((city: models.City, index: number) => {
            const isSelectedCity = selectedCity === city;
            const optionColor = isSelectedCity ? '#67f686' : 'black';

            return (
              <TouchableOpacity 
                onPress={() => {
                  this.setState({
                    selectedCity: city
                  })
                }}
                key={index} 
                style={[styles.optionButton, {
                  borderColor: optionColor,
                }]}>
                <Text 
                  style={[styles.optionText, {
                    color: optionColor,
                  }]}>
                  { city }
                </Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

  renderFindMatchButton(): JSX.Element {
    const { selectedCity } = this.state;
    const { findMatch } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          findMatch(selectedCity);
        }}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          {'Create Match'}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const findMatchButton = this.renderFindMatchButton();
    const locationOptions = this.renderLocationOptions();

    return (
      <View 
        style={styles.container}>
        <Text>
          {`Where to?`}
        </Text>
        { locationOptions }
        { findMatchButton }
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
  optionContainer: {
    marginVertical: 50,
    flexDirection: 'row'
  },
  optionButton: {
    height: 70,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 15
  },
  optionText: {
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});

export default CreateMatch;