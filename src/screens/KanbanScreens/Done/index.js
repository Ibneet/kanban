import React from 'react';
import AddCardScreen  from '/Users/ibneetkaur/Desktop/coding/Kanban/src/screens/AddCard.js'
import DoneScreen from './Done'
import { createStackNavigator } from '@react-navigation/stack';

const DoneStack = createStackNavigator();

export default function DoneStackScreen() {
  return (
    <DoneStack.Navigator
    headerMode='none'
    >
      <DoneStack.Screen name="Backlog" component={DoneScreen}/>
      <DoneStack.Screen name="AddCard" component={AddCardScreen} />
    </DoneStack.Navigator>
  );
}