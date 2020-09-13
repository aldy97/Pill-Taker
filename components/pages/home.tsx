import React, { useEffect, useState } from 'react';
import Button from '@ant-design/react-native/lib/button';
import Card from '@ant-design/react-native/lib/card';
import { FlatList, View, Text } from 'react-native';
import * as firebase from 'firebase';

export type medicineProps = {
  description: string;
  dose_per_time: number;
  name: string;
  time_stamp: number;
  times_per_day: number;
};

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

  //use timeStamp as the unique id for medicine added
  const handleBtnClick = async (timeStamp: number) => {
    db.collection('medicines')
      .where('time_stamp', '==', timeStamp)
      .get()
      .then((snapshot) => {
        (snapshot as any).forEach((doc: any) => {
          console.log(doc.data);
        });
      });
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

  const renderItem = (obj: any) => {
    const item: medicineProps = obj.item;
    return (
      <Card
        style={{
          marginTop: 10,
          marginBottom: 10,
          width: '100%',
        }}
      >
        <Card.Header
          title={item.name}
          extra={
            <Button
              onPress={() => {
                handleBtnClick(item.time_stamp);
              }}
            >
              Just had {item.dose_per_time}{' '}
              {item.dose_per_time > 1 ? 'pills' : 'pill'}
            </Button>
          }
        />
        <Card.Footer
          content={item.description}
          extra={<Text>Times remaining: {item.times_per_day}</Text>}
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
