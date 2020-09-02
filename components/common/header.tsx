import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HeaderStyle = StyleSheet.create({
  ViewStyle: {
    height: 100,
    backgroundColor: '#1e8feb',
  },
  TextStyle: {
    textAlign: 'center',
    lineHeight: 120,
    fontSize: 30,
    color: '#fff',
  },
});

function Header() {
  return (
    <View style={HeaderStyle.ViewStyle}>
      <Text style={HeaderStyle.TextStyle}>React Native Demo</Text>
    </View>
  );
}

export default Header;
