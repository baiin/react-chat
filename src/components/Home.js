import React, { Component } from "react";
import "../App.css";
import * as firebase from "firebase";
import { Button, Alert, Row, Col } from "react-bootstrap";

class Home extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      author: props.user.displayName,
      message: ""
    };
  }

  componentDidMount() {
    const db = firebase.firestore();

    db.collection("messages")
      .orderBy("dateSent")
      .onSnapshot(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(doc => {
          const message = doc.data();
          message.id = doc.id;
          message.dateSent = message.dateSent.toDate();
          messages.push(message);
        });

        this.setState({
          messages
        });

        this.updatePosition();
      });
  }

  generateAuthorName() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  handleSubmit = e => {
    e.preventDefault();

    const db = firebase.firestore();
    db.collection("messages")
      .add({
        author: this.state.author,
        message: this.state.message,
        dateSent: new Date()
      })
      .then(() => {
        this.setState({
          message: ""
        });

        this.updatePosition();
      });
  };

  updatePosition = () => {
    window.setTimeout(function() {
      const messageBody = document.getElementById("messages");
      messageBody.scrollTop =
        messageBody.scrollHeight - messageBody.clientHeight;
    }, 500);
  };

  handleMessageChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Row className="inputs" noGutters={true}>
            <Col xs={10}>
              <input
                className="input-box"
                type="text"
                value={this.state.message}
                onChange={this.handleMessageChange}
                placeholder="message"
              />
            </Col>
            <Col xs={2}>
              <Button variant="info" className="input-button" type="submit">
                submit
              </Button>
            </Col>
          </Row>
        </form>

        <div className="messages" id="messages">
          {this.state.messages.map(message => (
            <Alert
              key={message.id}
              className={
                message.author === this.state.author
                  ? "bubble right-bubble"
                  : "bubble left-bubble"
              }
              variant={
                message.author === this.state.author ? "success" : "danger"
              }
            >
              <p>{message.author}</p>
              <Alert.Heading>{message.message}</Alert.Heading>
              <small>{message.dateSent.toLocaleString()}</small>
            </Alert>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
