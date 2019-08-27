import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  state = {};

  constructor() {
    super();

    this.state = {
      messages: [],
      author: '',
      message: ''
    };
  }

  componentDidMount() {
    const db = firebase.firestore();

    db.collection('messages').onSnapshot(querySnapshot => {
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

  handleSubmit = e => {
    e.preventDefault();

    const db = firebase.firestore();
    db.collection('messages').add({
      author: this.state.author,
      message: this.state.message,
      dateSent: new Date()
    });

    this.setState({
      author: '',
      message: ''
    });
  };

  handleAuthorChange = e => {
    this.setState({
      author: e.target.value
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
        <form>
          <input
            type="text"
            value={this.state.author}
            onChange={this.handleAuthorChange}
            placeholder="name"
          />
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleMessageChange}
            placeholder="message"
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>

        <div>
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
