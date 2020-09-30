import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { handleAddBtnPress } from './components/store/ActionsCreator.js';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/pages/home';
import EditPage from './components/pages/editPage';
import Notification from './components/pages/notification';
import Settings from './components/pages/settings';
import Button from '@ant-design/react-native/lib/button';

interface RoutesProps {
  user: any;
  toogle?: any;
}

const Routes = ({ user, toogle }: RoutesProps) => {
  return (
    <Router>
      <Scene key='root'>
        <Scene
          left={() => null}
          key='home'
          component={() => <Home user={user} />}
          title='Home'
          initial
          navigationBarStyle={{ backgroundColor: '#eee' }}
        />
        <Scene
          left={() => null}
          key='edit'
          component={() => <EditPage></EditPage>}
          title='Edit Prescription'
          navigationBarStyle={{ backgroundColor: '#eee' }}
          renderRightButton={() => (
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                marginRight: 10,
                borderWidth: 1,
                borderRadius: 50,
              }}
              onPress={() => {
                toogle(true);
              }}
            >
              <View>
                <Text style={{ textAlign: 'center', lineHeight: 25 }}>+</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Scene
          left={() => null}
          key='notification'
          component={Notification}
          title='Notification Setting'
          navigationBarStyle={{ backgroundColor: '#eee' }}
        />
        <Scene
          left={() => null}
          key='settings'
          component={Settings}
          title='Settings'
          navigationBarStyle={{ backgroundColor: '#eee' }}
        />
      </Scene>
    </Router>
  );
};

const mapDispatch = (dispatch) => ({
  toogle(addModalOpen) {
    const action = handleAddBtnPress(addModalOpen);
    dispatch(action);
  },
});

export default connect(null, mapDispatch)(Routes);
