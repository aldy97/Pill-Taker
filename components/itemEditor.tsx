import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ItemProps = {};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#eee',
  },
});
function ItemEditor() {
  return (
    <View style={styles.container}>
      <Text>Med name</Text>
      <Text>
        <Text style={{ ...styles.button }}>-</Text>
        <Text>Daily Number</Text>
        <Text style={{ ...styles.button }}>+</Text>
      </Text>
    </View>
  );
}

export default ItemEditor;
