import React from "react";
import { Button } from "react-bootstrap";

const Login = props => {
  return (
    <div className="login">
      <Button variant="success" onClick={props.onSignIn}>
        Sign-in with Google
      </Button>
    </div>
  );
};

export default Login;
