import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation/Navigation';
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "***************",
  authDomain: "************",
  databaseURL: "************",
  projectId: "************",
  storageBucket: "************",
  messagingSenderId: "************",
  appId: "************",
  measurementId: "************"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
