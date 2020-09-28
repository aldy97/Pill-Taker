import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/pages/home';
import EditPage from './components/pages/editPage';
import Notification from './components/pages/notification';
import Settings from './components/pages/settings';
import Button from '@ant-design/react-native/lib/button';

interface RoutesProps {
  user: any;
}

const Routes = ({ user }: RoutesProps) => (
  <Router>
    <Scene key='root'>
      <Scene
        left={() => null}
        key='home'
        component={() => <Home user={user} />}
        title='Home'
        initial
      />
      <Scene
        left={() => null}
        key='edit'
        component={() => <EditPage></EditPage>}
        title='Edit Prescription'
        renderRightButton={() => (
          <Button
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
            }}
            onPress={() => {}}
          ></Button>
        )}
      />
      <Scene
        left={() => null}
        key='notification'
        component={Notification}
        title='Notification Setting'
      />
      <Scene
        left={() => null}
        key='settings'
        component={Settings}
        title='Settings'
      />
    </Scene>
  </Router>
);
export default Routes;
