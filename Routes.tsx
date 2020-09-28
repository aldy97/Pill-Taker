import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/pages/home';
import EditPage from './components/pages/editPage';
import Notification from './components/pages/notification';
import Settings from './components/pages/settings';
import { View } from 'react-native';

interface RoutesProps {
  user: any;
}

const Routes = ({ user }: RoutesProps) => (
  <Router>
    <Scene key='root'>
      <Scene
        back
        key='home'
        component={() => <Home user={user} />}
        title='Home'
        initial
      />
      <Scene
        back
        key='edit'
        component={() => <EditPage></EditPage>}
        title='Edit Prescription'
      />
      <Scene
        back
        key='notification'
        component={Notification}
        title='Notification Setting'
      />
      <Scene back key='settings' component={Settings} title='Settings' />
    </Scene>
  </Router>
);
export default Routes;
