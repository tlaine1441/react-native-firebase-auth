import React, { Component } from 'react';
import { View, } from 'react-native';
import firebase from 'firebase';
import { Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
          apiKey: "AIzaSyA9W-y3LEHDnkWyGZ_ynmnWkLS2XiD0t9I",
          authDomain: "obsidian-a9f75.firebaseapp.com",
          databaseURL: "https://obsidian-a9f75.firebaseio.com", 
          storageBucket: "obsidian-a9f75.appspot.com",
          messagingSenderId: "38380095952"
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
        <Home />
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
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
