import React from 'react';
import Button from '@ant-design/react-native/lib/button';
import Card from '@ant-design/react-native/lib/card';
import medList, { Med } from '../../mock/medList';
import { Text, FlatList } from 'react-native';

function Home() {
  const renderItem = ({ med }: Med) => (
    <Card style={{ marginTop: 20, width: '100%' }}>
      <Card.Header title={med.name} extra={<Button>Just had one</Button>} />
      <Card.Footer
        content={med.desc}
        extra={<Text>Number: {med.number}</Text>}
      />
    </Card>
  );

  return (
    <FlatList
      data={medList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    ></FlatList>
  );
}

export default Home;
