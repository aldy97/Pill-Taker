import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Header from './components/common/header';

const Routes = () => (
  <Router>
    <Scene key='root'>
      <Scene key='home' component={Header} title='home' initial={true} />
    </Scene>
  </Router>
);
export default Routes;
