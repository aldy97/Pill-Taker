import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

function useProgress(user: Google.GoogleUser): number {
  const db = firebase.firestore();
  const COLLECTION: string = user.id ? user.id : '';

  const [result, setResult] = useState(0);

  const getDailyReport = async () => {
    const dailyReport = db.collection(COLLECTION).get();
    return dailyReport;
  };

  useEffect(() => {
    getDailyReport().then((snapshot) => {
      let arrayA: number[] = [];
      let arrayB: number[] = [];
      snapshot.forEach((doc) => {
        arrayA.push(doc.data().times_per_day);
        arrayB.push(doc.data().current_times_remaining);
      });
      const totalA = arrayA.length !== 0 ? arrayA.reduce((a, b) => a + b) : 0;
      const totalB = arrayB.length !== 0 ? arrayB.reduce((a, b) => a + b) : 0;
      totalA === 0
        ? setResult(0)
        : setResult(Math.floor((1 - totalB / totalA) * 100));
    });
  }, []);

  return result;
}

export default useProgress;
