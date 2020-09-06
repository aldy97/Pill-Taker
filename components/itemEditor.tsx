import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export type ItemProps = {
  name: string;
  number: number;
};
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
function ItemEditor({ name, number }: ItemProps) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{number}</Text>
    </View>
  );
}

export default ItemEditor;
