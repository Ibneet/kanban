import React from 'react';
import { Text, View, Button } from 'react-native';


export default function TodayScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
        title="Go to AddCard"
        onPress={() => navigation.navigate('AddCard')}
      />
      </View>
    );
}