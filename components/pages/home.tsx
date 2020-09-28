import React, { useEffect, useState } from 'react';
import Button from '@ant-design/react-native/lib/button';
import Card from '@ant-design/react-native/lib/card';
import { FlatList, View, Text } from 'react-native';
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator';
import * as firebase from 'firebase';

export type medicineProps = {
  description: string;
  dose_per_time: number;
  name: string;
  time_stamp: number;
  times_per_day: number;
  uid: string;
};

type HomeProps = {
  user: any;
};
function Home({ user }: HomeProps) {
  const db = firebase.firestore();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDailyReport = async () => {
    const dailyReport = db
      .collection('medicines')
      .where('time_stamp', '>=', 1601001497285)
      .orderBy('time_stamp', 'desc')
      .get();
    return dailyReport;
  };

  const fetchData = async () => {
    getDailyReport().then((snapshot) => {
      let array: any = [];
      (snapshot as any).forEach((doc: any) => {
        array.push(doc.data());
      });
      setData(array);
    });
  };

  //change medicine consumption status
  const handleBtnPress = async (uid: string) => {
    let updatedTimePerDay: number = 0;
    db.collection('medicines')
      .doc(uid)
      .get()
      .then((snap) => {
        updatedTimePerDay = (snap.data() as any).times_per_day - 1;
        if (updatedTimePerDay <= 0) {
          updatedTimePerDay = 0;
        }
        db.collection('medicines')
          .doc(uid)
          .update({ times_per_day: updatedTimePerDay })
          .then(fetchData);
      });
  };

  useEffect(() => {
    getDailyReport().then((snapshot) => {
      let array: any = [];
      (snapshot as any).forEach((doc: any) => {
        array.push(doc.data());
        setData(array);
      });
    });
    setTimeout(() => setIsLoading(false), 500);
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
                handleBtnPress(item.uid);
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

  return isLoading ? (
    <View style={{ marginTop: 100 }}>
      <ActivityIndicator text='Loading...'></ActivityIndicator>
    </View>
  ) : (
    <View>
      <FlatList
        data={data}
        ListEmptyComponent={
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', marginTop: 100 }}>No Data</Text>
          </View>
        }
        renderItem={renderItem}
        keyExtractor={(item: any) => item.key}
      ></FlatList>
    </View>
  );
}

export default Home;
