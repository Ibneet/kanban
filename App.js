import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation/Navigation';
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDgZDaLgpHr3eh7zHF02E9OzM4cR7nigoc",
  authDomain: "kanban-54bfb.firebaseapp.com",
  databaseURL: "https://kanban-54bfb.firebaseio.com",
  projectId: "kanban-54bfb",
  storageBucket: "kanban-54bfb.appspot.com",
  messagingSenderId: "895763176543",
  appId: "1:895763176543:web:db1df2c0573c4b9cfa0fea",
  measurementId: "G-XXB8ZNDBC3"
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
