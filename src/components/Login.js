import React from "react";
import GoogleButton from "react-google-button";

const Login = props => {
  const { onSignIn } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "40px"
      }}
    >
      <GoogleButton onClick={onSignIn} />
    </div>
  );
};

export default Login;
