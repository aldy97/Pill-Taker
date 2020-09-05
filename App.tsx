import React, { useState } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import Routes from './Routes';
import Footer from './components/common/footer';

function App() {
  const [selected, setSelected] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <View style={{ height: 50 }}>
        <Footer selected={selected} setSelected={setSelected} />
      </View>
    </View>
  );
}

export default App;
AppRegistry.registerComponent('reactTutorialApp', () => App);
