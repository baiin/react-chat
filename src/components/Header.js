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
      <Navbar.Brand>react-chat v2</Navbar.Brand>
      {props.user && (
        <span>
          {props.user.photoURL && (
            <img
              src={props.user.photoURL}
              alt="profile"
              height="35px"
              style={{ marginRight: "10px", borderRadius: "20px" }}
            />
          )}
          <Button variant="danger" onClick={props.onSignOut}>
            signout
          </Button>
        </span>
      )}
    </Navbar>
  );
};

export default Header;
