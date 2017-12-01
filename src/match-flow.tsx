
import * as React from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import * as models from './models';
import { Dispatcher, ActionType } from './actions';
import CreateMatch from './create-match';

interface StateToProps {
  username: string,
}

interface DispatchToProps {
  findMatch: (params: {name: string, city: models.City}) => void,
}

interface OwnProps {
}

interface State {
}

type Props = OwnProps & StateToProps & DispatchToProps;

class MatchFlow extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { findMatch, username } = this.props;

    return (
      <CreateMatch 
        findMatch={(city: models.City) => {
          findMatch({city, name: username});
        }}
      />
    )
  }
}

const mapStateToProps = (state: models.ReduxState, ownProps: OwnProps
): StateToProps => {
  const username = state.app.username;
  
  return {
    username,
  }
};

const mapDispatchToProps = (dispatch: Dispatcher): DispatchToProps => {
  return {
    findMatch: (params: {name: string, city: models.City}) => {
      dispatch({type: ActionType.FindMatch, name: params.name, city: params.city})
    }
  }
};

const MatchFlowConnected: React.ComponentClass<OwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchFlow);

export default MatchFlowConnected;