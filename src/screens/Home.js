import React from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
        <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  }
});
