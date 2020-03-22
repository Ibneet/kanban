import React from 'react';
import AddCardScreen  from '/Users/ibneetkaur/Desktop/coding/Kanban/src/screens/AddCard.js'
import DoingScreen from './Doing'
import { createStackNavigator } from '@react-navigation/stack';

const DoingStack = createStackNavigator();

export default function DoingStackScreen() {
  return (
    <DoingStack.Navigator
    headerMode='none'
    >
      <DoingStack.Screen name="Backlog" component={DoingScreen}/>
      <DoingStack.Screen name="AddCard" component={AddCardScreen} />
    </DoingStack.Navigator>
  );
}