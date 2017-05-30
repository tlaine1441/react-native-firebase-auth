import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, CardSection, Spinner } from './common';
import LoginForm from './LoginForm';

class Home extends Component {
   constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount() {
    var self = this;
    const { currentUser } = firebase.auth();
    sendMessage = () => {
       console.log('sendMessage.');
       const { currentUser } = firebase.auth();
       var updates = {};
       updates[`users/${currentUser.uid}/`] =
        {'test': ["1",2,5]}
       firebase.database().ref().update(updates);
       // this.setState({ newMessage: '' });
     }
      firebase.database().ref().child('users').child(`${currentUser.uid}`).child('test').on('value', function(snapshot) {
          console.log(snapshot.val());
          let value = snapshot.val();
          self.setState({value: value});

       });
  }


 

  render() {
    return (
      <View style={{marginTop: 200}}>
      <Text>{this.state.value}</Text>
        <CardSection>
          <Button onPress={() => sendMessage()}>
            Send
          </Button>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </CardSection>
      </View>
    );
  }
}

export default Home;
