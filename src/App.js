import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import * as firebase from "firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";

class App extends Component {
  state = {
    user: null
  };

  signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@example.com"
    });
    firebase.auth().signInWithPopup(provider);
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header user={this.state.user} onSignOut={this.signOut}></Header>

        <Router>
          <Route
            path="/"
            exact
            render={() =>
              this.state.user ? (
                <Home user={this.state.user}></Home>
              ) : (
                <Login onSignIn={this.signIn}></Login>
              )
            }
          />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
