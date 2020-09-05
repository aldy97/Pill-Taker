import React from 'react';
import Button from '@ant-design/react-native/lib/button';
import Card from '@ant-design/react-native/lib/card';
import medList, { Med } from '../../mock/medList';
import { Text, FlatList, View } from 'react-native';

function Home() {
  const renderItem = (obj: any) => {
    const item: Med = obj.item;
    return (
      <Card style={{ marginTop: 20, width: '100%' }}>
        <Card.Header title={item.name} extra={<Button>Just had one</Button>} />
        <Card.Footer
          content={item.desc}
          extra={<Text>Number: {item.number}</Text>}
        />
      </Card>
    );
  };

  return (
    <View>
      <FlatList
        data={medList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </View>
  );
}

export default Home;
