import React from 'react';
import Button from '@ant-design/react-native/lib/button';
import Card from '@ant-design/react-native/lib/card';
import medList from '../../mock/medList';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const style = StyleSheet.create({
  containerStyle: {},
  buttonStyle: {
    height: 100,
    width: '100%',
  },
});

function Home() {
  return (
    <ScrollView style={style.containerStyle}>
      {medList.map((med, index) => {
        return (
          <Card style={{ marginTop: 20, width: '100%' }} key={index}>
            <Card.Header
              title={med.name}
              extra={<Button>Just had one!</Button>}
            />
            <Card.Footer
              content={med.desc}
              extra={<div>Number: {med.number}</div>}
            />
          </Card>
        );
      })}
    </ScrollView>
  );
}

export default Home;
