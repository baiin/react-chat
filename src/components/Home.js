import React, { Component } from "react";
import "../App.css";
import * as firebase from "firebase";
import { Button, Alert, Row, Col, Image } from "react-bootstrap";

class Home extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      author: props.user.email,
      selectedRecipient: null,
      message: "",
      imageRef: "",
      newRecipient: "",
      obj: {}
    };
  }

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages() {
    const db = firebase.firestore();

    db.collection("messages")
      .where("emails", "array-contains", this.state.author)
      .orderBy("dateSent", "asc")
      .onSnapshot(querySnapshot => {
        const messages = [];
        const obj = {};
        querySnapshot.forEach(doc => {
          const message = doc.data();

          message.id = doc.id;
          message.dateSent = message.dateSent.toDate();

          messages.push(message);

          if (message.recipient === this.state.author) {
            if (obj[message.author] === undefined) {
              obj[message.author] = [message];
            } else {
              obj[message.author].push(message);
            }
          } else {
            if (obj[message.recipient] === undefined) {
              obj[message.recipient] = [message];
            } else {
              obj[message.recipient].push(message);
            }
          }
        });

        let recipients = Object.keys(obj);
        let selectedRecipient = this.state.selectedRecipient;

        if (selectedRecipient === null) {
          if (recipients !== null && recipients.length > 0) {
            selectedRecipient = recipients[0];
            this.setState({ selectedRecipient });
          }
        }

        this.setState({ obj });
        this.updatePosition();
      });
  }

  addRecipient = e => {
    const obj = this.state.obj;
    obj[this.state.newRecipient] = [];

    this.setState({
      obj,
      newRecipient: "",
      selectedRecipient: this.state.newRecipient
    });

    this.updatePosition();
  };

  handleSubmit = (e, type) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection("messages")
      .add({
        author: this.state.author,
        recipient: this.state.selectedRecipient,
        emails: [this.state.author, this.state.selectedRecipient],
        message: type === "text" ? this.state.message : this.state.imageRef,
        type,
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
      console.log(messageBody.clientHeight);
    }, 500);
  };

  handleMessageChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  onRecipientFieldChanges = e => {
    this.setState({
      newRecipient: e.target.value
    });
  };

  handleSelectRecipient = recipient => {
    this.setState({
      selectedRecipient: recipient
    });

    this.updatePosition();
  };

  triggerUpload = () => {
    document.getElementById("file-button").click();
  };

  addFile = files => {
    if (files) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${files[0].name}`);

      this.setState({ imageRef });

      imageRef.put(files[0]).then(snapshot => {
        imageRef.getDownloadURL().then(url => {
          this.setState({ imageRef: url });
          this.handleSubmit("image");
        });
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <input
          type="file"
          style={{ display: "hidden" }}
          accept="image/*"
          onChange={e => this.addFile(e.target.files)}
          id="file-button"
        ></input>
        <div className="sidebar">
          <Row noGutters={true}>
            <Col xs={9}>
              <input
                className="input-box"
                value={this.state.newRecipient}
                onChange={this.onRecipientFieldChanges}
                placeholder="new recipient"
              ></input>
            </Col>
            <Col xs={3}>
              <Button
                variant="success"
                className="input-button"
                onClick={this.addRecipient}
              >
                add
              </Button>
            </Col>
          </Row>
          <div>
            {Object.keys(this.state.obj).map(rec => (
              <Row key={rec}>
                <Col xs={12}>
                  <Button
                    variant="dark"
                    className="input-button"
                    onClick={() => this.handleSelectRecipient(rec)}
                  >
                    {rec}
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </div>

        <form>
          <Row className="inputs" noGutters={true}>
            <Col xs={8}>
              <input
                className="input-box"
                type="text"
                value={this.state.message}
                onChange={this.handleMessageChange}
                placeholder="message"
              />
            </Col>
            <Col xs={2}>
              <Button
                variant="danger"
                className="input-button"
                onClick={this.triggerUpload}
              >
                Upload
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="info"
                className="input-button"
                type="submit"
                onClick={e => this.handleSubmit(e, "text")}
              >
                submit
              </Button>
            </Col>
          </Row>
        </form>

        <div className="titlebox">
          <h3>{this.state.selectedRecipient}</h3>
        </div>

        <div className="messages" id="messages">
          <div style={{ flex: 0.8 }}>
            {this.state.obj[this.state.selectedRecipient] &&
              this.state.obj[this.state.selectedRecipient].map(message => (
                <Alert
                  key={message.id}
                  className={
                    message.author === this.state.author
                      ? "bubble right-bubble"
                      : "bubble left-bubble"
                  }
                  variant={
                    message.author === this.state.author ? "primary" : "success"
                  }
                >
                  <p>{message.author}</p>
                  {message.type === "text" ? (
                    <Alert.Heading>{message.message}</Alert.Heading>
                  ) : (
                    <Image src={message.message} fluid></Image>
                  )}

                  <small>{message.dateSent.toLocaleString()}</small>
                </Alert>
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
