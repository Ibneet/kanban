import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase'
import { Input, Card, Button, Icon, H1 } from 'native-base'

export default class AddCardScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      screen: 'Today',
      list:[],
      activity: "",
      backlogList: [],
      blockedList: [],
      doneList: [],
      doingList: [],
      todayList: []
    }
  }
  nav=(backlog,blocked,doing,done,today,activity)=>{
    if(backlog){
      this.sendBacklog(activity)
      this.setState({screen:'Backlog'},()=>{console.log(this.state.screen)})
      
      this.setState((state)=>{return{list: this.state.backlogList}})
      
    }
    if(blocked){
      this.setState({screen: 'Blocked'})
      this.setState({list: blockedList})
    }
    if(doing){
      this.setState({screen: 'Doing'})
      this.setState({list: doingList})
    }
    if(done){
      this.setState({screen: 'Done'})
      this.setState({list: doneList})
    }
    if(today){
      this.setState({screen: 'Today'})
      this.setState({list: todayList})
    }
    return this.state.screen
  }
  sendBacklog = (activity) => {
    var backlogListRef = firebase.database().ref('backlog_list')
    var newBacklogRef = backlogListRef.push()
    newBacklogRef.set({
      text: activity,
      time: Date.now()
    })
    this.setState({activity: ""})
  }
  
  updateBacklogList = backlogList => {
    this.setState({ backlogList: backlogList })
  }


  UNSAFE_componentWillMount(){
    var self = this
    var backlogListRef = firebase.database().ref('backlog_list')
    backlogListRef.on('value', dataSnapshot => {
      if(dataSnapshot.val()) {
        let backlogList = Object.values(dataSnapshot.val())
        self.updateBacklogList(backlogList)
      }
    })
  }

  render() {
    const backlog = this.props.route.params?.backlog ?? false;  
    const blocked = this.props.route.params?.blocked ?? false;
    const doing = this.props.route.params?.doing ?? false;     
    const done = this.props.route.params?.done ?? false;
    const today = this.props.route.params?.today ?? false;
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
        <Button full rounded icon onPress={() => {
          {this.nav(backlog,blocked,doing,done,today,this.state.activity);
          this.props.navigation.navigate(this.state.screen,this.state.list)}
        }}>
          <Icon name='arrow-forward'/>
        </Button>
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
});