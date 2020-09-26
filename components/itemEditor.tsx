import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 25,
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
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
function ItemEditor({ medicine }: any) {
  return (
    <View style={styles.container}>
      <Text>{medicine.name}</Text>
    </View>
  );
}

export default ItemEditor;
