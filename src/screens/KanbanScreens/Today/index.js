import React from 'react';
import AddCardScreen  from '/Users/ibneetkaur/Desktop/coding/Kanban/src/screens/AddCard.js'
import TodayScreen from './Today'
import { createStackNavigator } from '@react-navigation/stack';

const TodayStack = createStackNavigator();

export default function TodayStackScreen() {
  return (
    <TodayStack.Navigator
    headerMode='none'
    >
      <TodayStack.Screen name="Backlog" component={TodayScreen}/>
      <TodayStack.Screen name="AddCard" component={AddCardScreen} />
    </TodayStack.Navigator>
  );
}