import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignUp';
import SigninScreen from '../screens/SignIn';
import KanbanScreen from '../screens/Kanban'
import LoadingScreen from '../screens/Loading';
import { Icon } from 'native-base';
import * as firebase from 'firebase';
import { StackActions } from '@react-navigation/native';
import {  TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

class MyStack extends Component {

  componentDidMount(){
    var self = this
    firebase.auth().onAuthStateChanged(authenticate => {
      if(authenticate){
        self.setState({
          email: authenticate.email,
          name: authenticate.displayName
        })
      }else{
        self.props.navigation.dispatch(
          StackActions.replace('SingIn')
        )
      }
    })
  }

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signout"))
      .catch( error => alert(error.message) )

  }

  render(){
  return (
    <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} 
        options={{
            headerTransparent: true,
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 38
                },
                headerTitleAlign: 'center'
            }}
            />
        <Stack.Screen name="SignIn" component={SigninScreen} 
        options={{
            headerTransparent: true,
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 38
                },
                headerTitleAlign: 'center'
            }}
            />
        <Stack.Screen name="Kanban" component={KanbanScreen} 
          options={{
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity onPress={() => {this.signOutUser()}}>
               <Icon name='log-out' size={32}/>
              </TouchableOpacity>
            ),
            // headerLeft: () => (
            //   <Text>{this.state.name}</Text>
            // )
            }}
        />
        </Stack.Navigator>
  );
}
}

export default function App() {
  return (
    <MyStack />
  );
}