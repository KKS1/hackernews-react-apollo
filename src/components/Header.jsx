import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, NavLink, Row, Col, Button } from "reactstrap";
import { AUTH_TOKEN } from "../constants";

const Header = (props) => {
  const history = useHistory();
  const [authToken, setAuthToken] = useState(localStorage.getItem(AUTH_TOKEN));

  return (
    <div>
      <Row className="justify-content-end p-3 m-3">
        {authToken ? (
          <Button
            onClick={(e) => {
              // localStorage.removeItem(AUTH_TOKEN);
              setAuthToken(undefined);
              history.push("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              // localStorage.setItem(AUTH_TOKEN, );
              setAuthToken("abc");
              history.push("/");
            }}
          >
            Login
          </Button>
        )}
      </Row>

      <Nav tabs>
        <NavItem>
          <NavLink href="/">Feed Links List</NavLink>
        </NavItem>

        {authToken && (
          <NavItem>
            <NavLink href="/create">Create New Link</NavLink>
          </NavItem>
        )}
      </Nav>
      <hr />
    </div>
  );
};

export default Header;
