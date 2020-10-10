import React, { useEffect, useState } from 'react';
import MedDetail from './medDetail';
import Button from '@ant-design/react-native/lib/button';
import Provider from '@ant-design/react-native/lib/provider';
import moment from 'moment';
import * as Google from 'expo-google-app-auth';
import Card from '@ant-design/react-native/lib/card';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { AppleAuthenticationCredential } from 'expo-apple-authentication';

export type medicineProps = {
  description: string;
  dose_per_time: number;
  name: string;
  time_created: string;
  time_updated: string;
  times_per_day: number;
  current_times_remaining: number;
  mid: string;
};

type HomeProps = {
  user: Google.GoogleUser | AppleAuthenticationCredential;
  addModalOpen?: any;
};

function Home({ user, addModalOpen }: HomeProps) {
  const db = firebase.firestore();
  const COLLECTION = user.id ? user.id : '';

  const [data, setData] = useState([]);

  const getDailyReport = async () => {
    const dailyReport = db.collection(COLLECTION).get();
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
  const handleConsumePillsBtnPress = async (mid: string) => {
    let updatedTimePerDay: number = 0;
    db.collection(COLLECTION)
      .doc(mid)
      .get()
      .then((snap) => {
        updatedTimePerDay =
          (snap.data() as medicineProps).current_times_remaining - 1;
        if (updatedTimePerDay <= 0) {
          updatedTimePerDay = 0;
        }
        db.collection(COLLECTION)
          .doc(mid)
          .update({
            current_times_remaining: updatedTimePerDay,
          })
          .then(fetchData);
      });
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const resetTimesRemaining = (item: medicineProps): void => {
    if (item.time_updated !== moment().format('YYYY-MM-DD')) {
      db.collection(COLLECTION)
        .doc(item.mid)
        .update({
          time_updated: moment().format('YYYY-MM-DD'),
          current_times_remaining: item.times_per_day,
        })
        .then(fetchData);
    }
  };

  const renderItem = (obj: any) => {
    const item: medicineProps = obj.item;
    resetTimesRemaining(item);
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
              disabled={item.current_times_remaining === 0}
              type='primary'
              onPress={() => {
                handleConsumePillsBtnPress(item.mid);
              }}
            >
              Just had {item.dose_per_time}{' '}
              {item.dose_per_time > 1 ? 'pills' : 'pill'}
            </Button>
          }
        />
        <Card.Footer
          content={item.description}
          extra={<Text>Times remaining: {item.current_times_remaining}</Text>}
        />
      </Card>
    );
  };

  return !addModalOpen ? (
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
  ) : (
    <MedDetail user={user}></MedDetail>
  );
}

const mapState = (state: any) => {
  return {
    addModalOpen: state.getIn(['reducer', 'addModalOpen']),
  };
};

export default connect(
  mapState,
  null
)(({ user, addModalOpen }: HomeProps) => (
  <Provider>
    <Home user={user} addModalOpen={addModalOpen}></Home>
  </Provider>
));
