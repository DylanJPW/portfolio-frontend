import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import "./header.scss";

export const Header = () => {
  return (
    <Navbar className="header sticky-top">
      <Navbar.Brand href="/">
        My Portfolio
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about-me-section">About Me</Nav.Link>
          <Nav.Link href="#projects-section">Projects</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}