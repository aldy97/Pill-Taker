import React, { useState } from 'react';
import { Button, Text, StyleSheet, StatusBar, View } from 'react-native';

import Constants from 'expo-constants';

const App = () => {
  const styleTypes: any = ['default', 'dark-content', 'light-content'];
  const [visibleStatusBar, setVisibleStatusBar] = useState(false);
  const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);

  const changeVisibilityStatusBar = () => {
    setVisibleStatusBar(!visibleStatusBar);
  };

  const changeStyleStatusBar = () => {
    const styleId = styleTypes.indexOf(styleStatusBar) + 1;

    if (styleId === styleTypes.length) {
      return setStyleStatusBar(styleTypes[0]);
    }
    return setStyleStatusBar(styleTypes[styleId]);
  };

  return (
    <View style={{ ...styles.container, backgroundColor: 'yellow' }}>
      <View>
        <Text style={styles.textStyle}>StatusBar Style: {styleStatusBar}</Text>
        <Text style={styles.textStyle}>
          StatusBar Visibility: {!visibleStatusBar ? 'Visible' : 'Hidden'}
        </Text>
      </View>
      <StatusBar backgroundColor='blue' barStyle={styleStatusBar} />
      <StatusBar hidden={visibleStatusBar} />
      <View style={styles.buttonContainer}>
        <Button
          title='Toggle StatusBar'
          onPress={() => changeVisibilityStatusBar()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Change StatusBar Style'
          onPress={() => changeStyleStatusBar()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  buttonContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
});

export default App;
