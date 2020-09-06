import React, { useEffect } from 'react';
import Button from '@ant-design/react-native/lib/button';
import Card from '@ant-design/react-native/lib/card';
import medList, { Med } from '../../mock/medList';
import { Text, FlatList, View } from 'react-native';
import * as firebase from 'firebase';

function Home() {
  const db = firebase.firestore();
  const getDailyReport = async () => {
    const dailyReport = db.collection('daily_reports').get();
    return dailyReport;
  };
  useEffect(() => {
    getDailyReport().then((snapshot) => {
      (snapshot as any).forEach((doc: any) => {
        console.log(doc.id, '=>', doc.data());
      });
    });
  }, []);

  const renderItem = (obj: any) => {
    const item: Med = obj.item;
    return (
      <Card
        style={{
          marginTop: 10,
          marginBottom: 10,
          width: '100%',
          display: item.number > 0 ? undefined : 'none',
        }}
      >
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
