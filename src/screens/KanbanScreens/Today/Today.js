import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'native-base'
import * as firebase from 'firebase'
import { Entypo } from '@expo/vector-icons'

export default class TodayScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      isListEmpty: false,
      uid: firebase.auth().currentUser.uid 
    }
  }

  UNSAFE_componentWillMount() {
    this.getToday()
  }

  getToday = () => {
    let self = this
    let todayRef = firebase.database().ref(`${this.state.uid}`+'/today_list')
    todayRef.on('value',dataSnapshot => {
      if(dataSnapshot.val()) {
        let todayResult = Object.values(dataSnapshot.val());
        let todayKey = Object.keys(dataSnapshot.val());

        todayKey.forEach((value, key) => {
          todayResult[key]['key'] = value;
        })
        self.setState({
          data: todayResult,
          isListEmpty: false,
        })
      }else{
        self.setState({isListEmpty: true})
      }
      self.setState({isLoading: false})
    })
  
  }

  actions = (key,activity) => {
    Alert.alert(
      'What you want to do with', `${activity}`,
      [
        {text: 'Cancel', onPress:() => console.log
        ('Cancelled pressed')
        },
        {text: 'Delete', onPress:async () => {
          this.deleteToday(key,activity)
          }
        },
        {text: 'Move', onPress:async () => {
          this.moveToday(key,activity)
          }
        }
      ],
      {cancelable: true}
    )
  }

  deleteToday = (key,activity) => {
    Alert.alert(
      'Delete this activity?',
      `${activity}`,
      [
        {text: 'Cancel', onPress:() => console.log
        ('Cancelled pressed')
        },
        {text: 'OK', onPress:async () => {
          let todayRef = firebase.database().ref(`${this.state.uid}`+'/today_list').child(key);
          await  todayRef.remove()
        }}
      ],
      {cancelable: true}
    )
  }

  moveToday = (key,activity) => {    
    let oldRef = firebase.database().ref(`${this.state.uid}`+'/today_list').child(key);
    Alert.alert(
      'Where to move activity?',
      `${activity}`,
      [
        {text: 'Done', onPress:async () => {
          let newRef = firebase.database().ref(`${this.state.uid}`+'/done_list').child(key);
          await  oldRef.once('value', function(snap)  {
            newRef.set( snap.val(), function(error) {
                 if( !error ) {  oldRef.remove(); }
                 else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
            });
          });
        }},
        {text: 'Blocked', onPress:async () => {
          let newRef = firebase.database().ref(`${this.state.uid}`+'/blocked_list').child(key);
          await  oldRef.once('value', function(snap)  {
            newRef.set( snap.val(), function(error) {
                 if( !error ) {  oldRef.remove(); }
                 else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
            });
          });
        }},
        {text: 'Doing', onPress:async () => {
          let newRef = firebase.database().ref(`${this.state.uid}`+'/doing_list').child(key);
          await  oldRef.once('value', function(snap)  {
            newRef.set( snap.val(), function(error) {
                 if( !error ) {  oldRef.remove(); }
                 else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
            });
          });
        }}
      ],
      {cancelable: true}
    )
    
  }

  render(){ 
    if(this.state.isLoading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator size='large' color='black' />
        </View>
      )
    }else if(this.state.isListEmpty){
      return(
        <View style={styles.container}>
          <Entypo style={{alignSelf:'center'}} name='plus' size={35}/>
          <Text style={{textAlign:'center'}}>No today</Text>
          <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddCard',{
              today: true,
              uid: this.state.uid
            })
          }}
          style={styles.floatButton}
          >
            <Entypo name='plus' size={35} color='white'/>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
        data={this.state.data}
        inverted
        renderItem={({item}) => (
          <Card style={styles.listItem}>
            <Text>{item.text}</Text>
            <Text>{new Date(item.time).toLocaleDateString}</Text>
            <TouchableOpacity
              onPress={() => {
              this.actions(item.key,item.text)
              }}
              style={styles.menuButton}
            >
            <Entypo name='menu' size={10} color='white'/>
            </TouchableOpacity>
          </Card>
        )}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddCard',{
              today:true,
              uid: this.state.uid
            })
          }}
          style={styles.floatButton}
          >
            <Entypo name='plus' size={35} color='white'/>
        </TouchableOpacity>
      </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    flexDirection: 'row',
    padding: 20
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
  },
  menuButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    position: 'absolute',
    bottom: 1,
    right: 1,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 20
  }
});