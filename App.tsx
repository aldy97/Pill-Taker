import React from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes';
import Footer from './components/common/footer';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <Footer />
    </View>
  );
}

export default App;
AppRegistry.registerComponent('reactTutorialApp', () => App);
