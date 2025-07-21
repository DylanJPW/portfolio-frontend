import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import "./header.scss";

export const Header = () => {
  return (
    <Navbar className="header">
      <Navbar.Brand href="/">
        My Portfolio
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About Me</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}