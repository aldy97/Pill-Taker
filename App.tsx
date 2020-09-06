import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import * as firebase from 'firebase';
import Constants from 'expo-constants';

import Routes from './Routes';
import Footer from './components/common/footer';
import getEnvVars from './config';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <View style={{ height: 70 }}>
        <Footer />
      </View>
    </View>
  );
}

const env = getEnvVars();

const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_FIREBASE_DATABASE_URL,
  projectId: env?.firebase_project_id,
  storageBucket: process.env.EXPO_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_FIREBASE_MEASUREMENT_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default App;
AppRegistry.registerComponent('reactTutorialApp', () => App);
