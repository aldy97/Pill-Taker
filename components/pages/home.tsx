import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@ant-design/react-native/lib/button';

const style = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'yellow',
  },
  buttonStyle: {
    height: 100,
    width: '100%',
  },
});

function Home() {
  const [text, setText] = useState(' hi');
  return (
    <View style={style.containerStyle}>
      <Button style={style.buttonStyle}>
        <Text>Go to footer!{text}</Text>
      </Button>
    </View>
  );
}

export default Home;
