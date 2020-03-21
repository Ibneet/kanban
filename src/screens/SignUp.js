import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Form, Item, Input, Label } from 'native-base';
import * as firebase from 'firebase'
import { StackActions } from '@react-navigation/native';

export default class SignupScreen extends Component {

  constructor(props){
      super(props);
      this.state = {
          email: "",
          password: "",
          name:"",
      }
  }

  signupUser = (name, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( authenticate => {
        return authenticate.user
          .updateProfile({
            displayName: name
          })
          .then( () => {
            this.props.navigation.dispatch(
              StackActions.replace('Home')
          )
          })
      })
      .catch( error => {
        alert(error.message)
      }
      )
  }

  render(){
      return (
          <ImageBackground source = {require('../assets/back.jpg')} style={styles.container}>
              <ScrollView style={styles.inner}>
            <KeyboardAvoidingView behavior='position' enabled>
                <Form style={styles.form}>
                  <Item floatingLabel>
                      <Label>Name</Label>
                      <Input
                      autoCorrect={false}
                      autoCapitalize='none'
                      keyboardType='default'
                      onChangeText={name => {this.setState({name})}}
                      />
                  </Item>
                  <Item floatingLabel>
                      <Label>Email</Label>
                      <Input
                      autoCorrect={false}
                      autoCapitalize='none'
                      keyboardType='email-address'
                      onChangeText={email => {this.setState({email})}}
                      />
                  </Item>
                  <Item floatingLabel>
                      <Label>Password</Label>
                      <Input
                      secureTextEntry={true}
                      autoCorrect={false}
                      autoCapitalize='none'
                      keyboardType='default'
                      onChangeText={password => {this.setState({password})}}
                      />
                  </Item>
                </Form>
                <Button
                onPress={() => this.signupUser(
                  this.state.name,
                  this.state.email,
                  this.state.password
                )}
                rounded
                style={styles.button}
                >
                <Text>Signup</Text>
            </Button>
            </KeyboardAvoidingView>
            <View style={styles.foot}>
                <Text>OR</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignIn')}}>
                    <Text>Already having an account!</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
          </ImageBackground>
        );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
      height: '35%',
      width: '68%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      position: 'absolute'
    //   alignItems: 'center',
    //   justifyContent: 'center',
     
  },
  button: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 20
  },
  form: {
      padding: 20,
      width: '100%'
  },
  foot: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20 
  }
});
