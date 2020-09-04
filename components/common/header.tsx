import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import { Actions } from 'react-native-router-flux';

const style = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: 100,
    height: 100,
    width: 300,
  },
});

function Header() {
  return (
    <View style={style.containerStyle}>
      <Button style={style.buttonStyle}>
        <Text>Go to footer</Text>
      </Button>
    </View>
  );
}

export default Header;
