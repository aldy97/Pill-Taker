import React, { useEffect, useState } from 'react';
import Button from '@ant-design/react-native/lib/button';
import Card from '@ant-design/react-native/lib/card';
import { Med } from '../../mock/medList';
import { Text, FlatList, View } from 'react-native';
import * as firebase from 'firebase';

type HomeProps = {
  user: any;
};
function Home({ user }: HomeProps) {
  const db = firebase.firestore();
  const getDailyReport = async () => {
    const dailyReport = db
      .collection('daily_reports')
      .where('uid', '==', user)
      .get();
    return dailyReport;
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    getDailyReport().then((snapshot) => {
      (snapshot as any).forEach((doc: any) => {
        setData(doc.data());
      });
    });
    console.log(data);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const renderItem = (obj: any) => {
    const item: Med = obj.item;
    return (
      <Card
        style={{
          marginTop: 10,
          marginBottom: 10,
          width: '100%',
          display: item.missedCount > 0 ? undefined : 'none',
        }}
      >
        <Card.Header title={item.name} extra={<Button>Just had one</Button>} />
        <Card.Footer
          content={item.desc}
          extra={<Text>Number: {item.missedCount}</Text>}
        />
      </Card>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </View>
  );
}

export default Home;
