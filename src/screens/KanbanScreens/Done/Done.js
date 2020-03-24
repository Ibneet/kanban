import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'native-base'
import * as firebase from 'firebase'
import { Entypo } from '@expo/vector-icons'

export default class DoneScreen extends React.Component {

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
    this.getDone()
  }

  getDone = () => {
    let self = this
    let doneRef = firebase.database().ref(`${this.state.uid}`+'/done_list')
    doneRef.on('value',dataSnapshot => {
      if(dataSnapshot.val()) {
        let doneResult = Object.values(dataSnapshot.val());
        let doneKey = Object.keys(dataSnapshot.val());

        doneKey.forEach((value, key) => {
          doneResult[key]['key'] = value;
        })
        self.setState({
          data: doneResult,
          isListEmpty: false,
        })
      }else{
        self.setState({isListEmpty: true})
      }
      self.setState({isLoading: false})
    })
  
  }

  deleteDone = (key,activity) => {
    Alert.alert(
      'Delete this activity?',
      `${activity}`,
      [
        {text: 'Cancel', onPress:() => console.log
        ('Cancelled pressed')
        },
        {text: 'OK', onPress:async () => {
          let doneRef = firebase.database().ref(`${this.state.uid}`+'/done_list').child(key);
          await  doneRef.remove()
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
          <Text style={{textAlign:'center'}}>No done</Text>
          <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddCard',{
              done: true,
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
              this.deleteDone(item.key,item.text)
              }}
              style={styles.trashButton}
            >
            <Entypo name='trash' size={10} color='white'/>
            </TouchableOpacity>
          </Card>
        )}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddCard',{
              done:true,
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
  trashButton: {
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