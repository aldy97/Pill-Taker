import React from 'react';
import { View, StyleSheet } from 'react-native';
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
});

function Footer() {
  return (
    <View style={styles.container}>
      <Button style={styles.buttonStyle}>Section 1</Button>
      <Button style={styles.buttonStyle}>Section 2</Button>
      <Button style={styles.buttonStyle}>Section 3</Button>
      <Button style={styles.buttonStyle}>Section 4</Button>
    </View>
  );
}

export default Footer;
