import React from 'react';
import AddCardScreen  from '/Users/ibneetkaur/Desktop/coding/Kanban/src/screens/AddCard.js'
import BacklogScreen from './Backlog'
import { createStackNavigator } from '@react-navigation/stack';

const BacklogStack = createStackNavigator();

export default function BacklogStackScreen() {
  return (
    <BacklogStack.Navigator
    headerMode='none'
    >
      <BacklogStack.Screen name="Backlog" component={BacklogScreen}/>
      <BacklogStack.Screen name="AddCard" component={AddCardScreen} />
    </BacklogStack.Navigator>
  );
}