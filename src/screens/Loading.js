import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { StackActions } from '@react-navigation/native';

export default class LoadingScreen extends Component {
    
    componentDidMount() {
        var self = this
        firebase.auth().onAuthStateChanged( (authenticate) => {
            if(authenticate) {
                self.props.navigation.dispatch(
                    StackActions.replace('Kanban')
                )
            }else{
                self.props.navigation.dispatch(
                    StackActions.replace('SignIn')
                )
            }
        })
    }
render() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large'/>
        </View>
      );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  }
});
