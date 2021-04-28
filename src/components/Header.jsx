import React from "react";
import { useHistory } from "react-router";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import { AUTH_TOKEN } from "../constants";

const Header = (props) => {
  const history = useHistory();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div>
      <Row className="justify-content-end p-3 m-3">
        {authToken ? (
          <Link
            onClick={(e) => {
              localStorage.removeItem(AUTH_TOKEN);
              history.push("/");
            }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
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
