/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import * as appService from './services/app-service';
import Root from './root';

export const sharedAppService = appService.createAppService();

export default class App extends React.Component<{}> {
  render() {
    return (
      <Provider
        store={sharedAppService.reduxStore}>
        <Root />
      </Provider>
    );
  }
}
