
import * as React from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as models from './models';
import { Dispatcher, ActionType } from './actions';
import CreateMatch from './create-match';

interface StateToProps {
  user: models.User | undefined,
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
    const { findMatch, user } = this.props;
    const username = _.get(user, ['username'], '');
    const pendingId = _.get(user, ['pendingId'], '');
    const connectionId = _.get(user, ['connectionId'], '');

    if (pendingId) {
      // return pending match page
    }

    if (connectionId) {
      // return connection page
    }

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
  const user = state.app.user;
  
  return {
    user,
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