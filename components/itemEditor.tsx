import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export type ItemProps = {
  name: string;
  number: number;
  medicine: any;
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
function ItemEditor({ medicine, name, number }: ItemProps) {
  return (
    <View style={styles.container}>
      <Text>{medicine.name}</Text>
      <Text>{medicine.number}</Text>
    </View>
  );
}

export default ItemEditor;
