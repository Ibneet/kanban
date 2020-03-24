import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import { Input, Card, Button, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'

export default class AddCardScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      activity: ""
    }
  }
  nav=(backlog,blocked,doing,done,today,uid)=>{
    if(backlog){
      this.sendBacklog(uid)
    }
    if(blocked){
      this.sendBlocked(uid)
    }
    if(doing){
      this.sendDoing(uid)
    }
    if(done){
      this.sendDone(uid)
    }
    if(today){
      this.sendToday(uid)
    }
  }
  sendBacklog = async (uid) => {
    if(this.state.activity !== ""){
      console.log(uid)
      var backlogListRef = firebase.database().ref(`${uid}`+'/backlog_list')
      var info = {
        text: this.state.activity,
        time: Date.now()
      }
      await backlogListRef.push(info,error => {
        if(!error){
          return this.props.navigation.goBack();
        }
      })
    this.setState({activity: ""})
    }else{
      return this.props.navigation.goBack();
    }
  }

  sendBlocked = async (uid) => {
    if(this.state.activity !== ""){
      var blockedListRef = firebase.database().ref(`${uid}`+'/blocked_list')
      var info = {
        text: this.state.activity,
        time: Date.now()
      }
      await blockedListRef.push(info,error => {
        if(!error){
          return this.props.navigation.goBack();
        }
      })
    this.setState({activity: ""})
    }else{
      return this.props.navigation.goBack();
    }
  }

  sendDoing = async (uid) => {
    if(this.state.activity !== ""){
      var doingListRef = firebase.database().ref(`${uid}`+'/doing_list')
      var info = {
        text: this.state.activity,
        time: Date.now()
      }
      await doingListRef.push(info,error => {
        if(!error){
          return this.props.navigation.goBack();
        }
      })
    this.setState({activity: ""})
    }else{
      return this.props.navigation.goBack();
    }
  }

  sendDone = async (uid) => {
    if(this.state.activity !== ""){
      var doneListRef = firebase.database().ref(`${uid}`+'/done_list')
      var info = {
        text: this.state.activity,
        time: Date.now()
      }
      await doneListRef.push(info,error => {
        if(!error){
          return this.props.navigation.goBack();
        }
      })
    this.setState({activity: ""})
    }else{
      return this.props.navigation.goBack();
    }
  }

  sendToday = async (uid) => {
    if(this.state.activity !== ""){
      var todayListRef = firebase.database().ref(`${uid}`+'/today_list')
      var info = {
        text: this.state.activity,
        time: Date.now()
      }
      await todayListRef.push(info,error => {
        if(!error){
          return this.props.navigation.goBack();
        }
      })
    this.setState({activity: ""})
    }else{
      return this.props.navigation.goBack();
    }
  }

  render() {
    const backlog = this.props.route.params?.backlog ?? false;  
    const blocked = this.props.route.params?.blocked ?? false;
    const doing = this.props.route.params?.doing ?? false;     
    const done = this.props.route.params?.done ?? false;
    const today = this.props.route.params?.today ?? false;
    const uid = this.props.route.params?.uid ?? this.props.navigation.goBack();
    return (
      <KeyboardAvoidingView 
      behavior='padding'
      enabled
      style={styles.container}>
        <Input
        onChangeText={text=> {
          this.setState({activity:text})
        }}
        value={this.state.activity}
        placeholder='Enter new activity'
        />

        <TouchableOpacity
          onPress={() => {
            this.nav(backlog,blocked,doing,done,today,uid);
          }}
          style={styles.floatButton}
          >
            <Entypo name='check' size={35} color='white'/>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 100
  }
});