import React, { useEffect, useState } from 'react';
import Button from '@ant-design/react-native/lib/button';
import * as Google from 'expo-google-app-auth';
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
  mid: string;
};

type HomeProps = {
  user: Google.GoogleUser;
};
function Home({ user }: HomeProps) {
  const db = firebase.firestore();
  const CONNECTION_NAME = 'medicine';

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDailyReport = async () => {
    const dailyReport = db
      .collection(CONNECTION_NAME)
      .where('uid', '==', user.email)
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
  const handleBtnPress = async (mid: string) => {
    let updatedTimePerDay: number = 0;
    db.collection(CONNECTION_NAME)
      .doc(mid)
      .get()
      .then((snap) => {
        updatedTimePerDay = (snap.data() as any).times_per_day - 1;
        if (updatedTimePerDay <= 0) {
          updatedTimePerDay = 0;
        }
        db.collection(CONNECTION_NAME)
          .doc(mid)
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
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const renderItem = (obj: any) => {
    const item: medicineProps = obj.item;
    return (
      <Card
        style={{
          width: '100%',
          borderRadius: 0,
          borderTopWidth: 0,
        }}
      >
        <Card.Header
          title={item.name}
          extra={
            <Button
              onPress={() => {
                handleBtnPress(item.mid);
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
            <Text style={{ textAlign: 'center', marginTop: 100 }}>
              No Medicine added
            </Text>
          </View>
        }
        renderItem={renderItem}
        keyExtractor={(item: any) => item.key}
      ></FlatList>
    </View>
  );
}

export default Home;
