import React from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes';

function App() {
  return (
    <View>
      <Routes />
    </View>
  );
}

export default App;
AppRegistry.registerComponent('reactTutorialApp', () => App);
