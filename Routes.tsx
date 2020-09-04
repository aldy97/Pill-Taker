import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Header from './components/common/header';
import Footer from './components/common/footer';

const Routes = () => (
  <Router>
    <Scene key='root'>
      <Scene key='home' component={Header} title='home' initial={true} />
      <Scene key='footer' component={Footer} title='footer' />
    </Scene>
  </Router>
);
export default Routes;
