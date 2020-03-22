import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BacklogStackScreen from './KanbanScreens/Backlog/index';
import TodayStackScreen from './KanbanScreens/Today/index';
import DoingStackScreen from './KanbanScreens/Doing/index';
import BlockedStackScreen from './KanbanScreens/Blocked/index';
import DoneStackScreen from './KanbanScreens/Done/index';

const Tab = createMaterialTopTabNavigator();

export default function KanbanScreen() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Backlog" component={BacklogStackScreen} />
        <Tab.Screen name="Today" component={TodayStackScreen} />
        <Tab.Screen name="Doing" component={DoingStackScreen} />
        <Tab.Screen name="Blocked" component={BlockedStackScreen} />
        <Tab.Screen name="Done" component={DoneStackScreen} />
      </Tab.Navigator>
  );
}


