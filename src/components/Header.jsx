import React from "react";
import { useHistory } from "react-router";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const Header = (props) => {
  const history = useHistory();

  return (
    <div>
      <Nav>
        <NavItem>
          <NavLink href="/">Feed Links List</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/create">Create New Link</NavLink>
        </NavItem>
      </Nav>
      <hr />
    </div>
  );
};

export default Header;
