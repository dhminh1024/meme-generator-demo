import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Meme Generator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact={true} to="/">
            Create Meme
          </Nav.Link>
          <Nav.Link as={NavLink} exact={true} to="/gallery">
            Gallery
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
