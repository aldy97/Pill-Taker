import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import Routes from './Routes';
import Footer from './components/common/footer';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <View style={{ height: 70 }}>
        <Footer />
      </View>
    </View>
  );
}

export default App;
AppRegistry.registerComponent('reactTutorialApp', () => App);
