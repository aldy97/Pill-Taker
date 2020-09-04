import React from 'react';
import { View } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import { Actions } from 'react-native-router-flux';

function Footer() {
  return (
    <View style={{ alignItems: 'center' }}>
      <Button
        style={{
          marginTop: 100,
          height: 100,
          width: 300,
        }}
        onPress={() => {
          Actions.home();
        }}
      >
        This is footer
      </Button>
    </View>
  );
}

export default Footer;
