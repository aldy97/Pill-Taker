import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonStyle: {
    flex: 1,
  },
  textStyle: {
    fontSize: 13,
  },
});

function Footer() {
  return (
    <View style={styles.container}>
      <Button
        style={styles.buttonStyle}
        onPress={() => {
          Actions.home();
        }}
      >
        <Text style={styles.textStyle}>Home</Text>
      </Button>
      <Button
        style={styles.buttonStyle}
        onPress={() => {
          Actions.recent();
        }}
      >
        <Text style={styles.textStyle}>Recent</Text>
      </Button>
      <Button style={styles.buttonStyle}>
        <Text style={styles.textStyle}>Notification</Text>
      </Button>
      <Button style={styles.buttonStyle}>
        <Text style={styles.textStyle}>Settings</Text>
      </Button>
    </View>
  );
}

export default Footer;
