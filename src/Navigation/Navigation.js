import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import SignupScreen from '../screens/SignUp';
import SigninScreen from '../screens/SignIn';
import HomeScreen from '../screens/Home'
import LoadingScreen from '../screens/Loading'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} 
        options={{
            headerTransparent: true,
            // headerBackground: () => (
                //   <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill} />
                // ),
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 38
                },
            }}
            />
        <Stack.Screen name="SignIn" component={SigninScreen} 
        options={{
            headerTransparent: true,
            // headerBackground: () => (
                //   <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill} />
                // ),
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 38
                },
            }}
            />
        <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
  );
}

export default function App() {
  return (
    <MyStack />
  );
}