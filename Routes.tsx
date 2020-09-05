import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/pages/home';
import Recent from './components/pages/edit';
import Notification from './components/pages/notification';

const Routes = () => (
  <Router>
    <Scene key='root'>
      <Scene key='home' component={Home} title='Home' initial={true} />
      <Scene key='edit' component={Recent} title='Edit Prescription' />
      <Scene
        key='notification'
        component={Notification}
        title='Notification Setting'
      />
    </Scene>
  </Router>
);
export default Routes;
