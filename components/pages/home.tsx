import React, { useEffect, useState } from 'react';
import Button from '@ant-design/react-native/lib/button';
import Card from '@ant-design/react-native/lib/card';
import { Med } from '../../mock/medList';
import {   
  FlatList,
  View,
  Text,
 } from 'react-native';
import * as firebase from 'firebase';

type HomeProps = {
  user: any;
};
function Home({ user }: HomeProps) {
  const db = firebase.firestore();
  
  const getDailyReport = async () => {
    const dailyReport = db
      .collection('medicines')
      .where('time_stamp', '>=', 1599958884827)
      .orderBy('time_stamp', 'desc')
      .get();
    return dailyReport;
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getDailyReport().then((snapshot) => {
      let array: any = [];
      (snapshot as any).forEach((doc: any) => {
        array.push(doc.data());
        setData(array);
      });
    });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const renderItem = (obj: any) => {
    const item: any = obj.item;
    return (
      <Card
        style={{
          marginTop: 10,
          marginBottom: 10,
          width: '100%',
        }}
      >
        <Card.Header title={item.name} extra={<Button>Just had one</Button>} />
        <Card.Footer
          content={item.description}
          extra={<Text>Times per day: {item.times_per_day}</Text>}
        />
      </Card>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.key}
      ></FlatList>
    </View>
  );
}

export default Home;
