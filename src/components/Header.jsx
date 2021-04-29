import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, NavLink, Row, Col, Button } from "reactstrap";
import AppContext from "../AppContext";
import { AUTH_TOKEN } from "../constants";

const Header = (props) => {
  const history = useHistory();
  const { appState, setAppState } = useContext(AppContext);
  const { token } = appState;

  return (
    <div>
      <Row className="justify-content-end p-3 m-3">
        {token ? (
          <Button
            onClick={(e) => {
              setAppState({ ...appState, token: undefined });
              history.push("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </Row>

      <Nav tabs>
        <NavItem>
          <NavLink href="/">Feed Links List</NavLink>
        </NavItem>

        {token && (
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
