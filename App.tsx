import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '@ant-design/react-native/lib/button';

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

function App() {
  const [text, setText] = useState('not clicked');
  return (
    <View style={style.containerStyle}>
      <Button
        style={style.buttonStyle}
        onPress={() => {
          text === 'clicked' ? setText('not clicked') : setText('clicked');
        }}
      >
        {text}
      </Button>
    </View>
  );
}

export default App;
