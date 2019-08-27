import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  state = {};

  constructor() {
    super();

    this.state = {
      messages: [],
      author: this.generateAuthorName(),
      message: ''
    };
  }

  componentDidMount() {
    const db = firebase.firestore();

    db.collection('messages')
      .orderBy('dateSent')
      .onSnapshot(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(doc => {
          const message = doc.data();
          message.id = doc.id;
          messages.push(message);
        });

        this.setState({
          messages
        });
      });
  }

  generateAuthorName() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  handleSubmit = e => {
    e.preventDefault();

    const db = firebase.firestore();
    db.collection('messages').add({
      author: this.state.author,
      message: this.state.message,
      dateSent: new Date()
    });

    this.setState({
      message: ''
    });
  };

  handleMessageChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <div className="inputs">
          <form>
            <input
              className="input-box"
              type="text"
              value={this.state.message}
              onChange={this.handleMessageChange}
              placeholder="message"
            />
            <button onClick={this.handleSubmit} className="input-button">
              Submit
            </button>
          </form>
        </div>

        <div className="messages">
          {this.state.messages.map(message => (
            <div key={message.id} className="message">
              <span>{message.author}</span>
              &nbsp;-&nbsp;
              <span>{message.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
