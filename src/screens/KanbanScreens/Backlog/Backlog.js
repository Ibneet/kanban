import React from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, FlatList } from 'react-native';
import { Input, Card, Button, Icon } from 'native-base'

export default class DetailsScreen extends React.Component {
  render(){ 
    const list = this.props.route.params?.list ?? []
    return (
      <KeyboardAvoidingView 
      behavior='padding'
      enabled
      style={styles.container}>
        <View style={{flex:1}}>
        <FlatList
        data={list}
        inverted
        keyExtractor={(item,index) => item.time.toString()}
        renderItem={({item}) => (
          <Card>
            <Text>{item.text}</Text>
            <Text>{item.dueDate}</Text>
            <Text>{new Date(item.time).toLocaleDateString}</Text>
          </Card>
        )}
        />
        
        </View>
        <View>
        <Button full rounded icon onPress={() => this.props.navigation.navigate('AddCard', {
          backlog: true,
        })}>
          <Text>New Card?</Text>
        </Button>
        </View>
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