import React, { Component } from 'react';
import { View, } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
          apiKey: 'AIzaSyBKLgzxUwjH5N0HITy0b1mCyVT9fYh7f-c',
          authDomain: 'authentication-436c4.firebaseapp.com',
          databaseURL: 'https://authentication-436c4.firebaseio.com',
          storageBucket: 'authentication-436c4.appspot.com',
          messagingSenderId: '277719933753'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </CardSection>
      );
      case false:
        return <LoginForm />;
      default:
        return (
          <View alignSelf='center'>
            <Spinner size="large" />
          </View>);
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Bottom Bitches Know" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
