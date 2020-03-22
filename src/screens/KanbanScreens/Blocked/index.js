import React from 'react';
import AddCardScreen  from '/Users/ibneetkaur/Desktop/coding/Kanban/src/screens/AddCard.js'
import BlockedScreen from './Blocked'
import { createStackNavigator } from '@react-navigation/stack';

const BlockedStack = createStackNavigator();

export default function BlockedStackScreen() {
  return (
    <BlockedStack.Navigator
    headerMode='none'
    >
      <BlockedStack.Screen name="Backlog" component={BlockedScreen}/>
      <BlockedStack.Screen name="AddCard" component={AddCardScreen} />
    </BlockedStack.Navigator>
  );
}