import React from "react";
import { Navbar, Button } from "react-bootstrap";

const Header = props => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Navbar.Brand>react-chat</Navbar.Brand>
      {props.user && (
        <Button variant="danger" onClick={props.onSignOut}>
          signout
        </Button>
      )}
    </Navbar>
  );
};

export default Header;
