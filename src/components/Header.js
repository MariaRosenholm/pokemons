import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import React from "react";

const Header = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="back"
      style={{ padding: "2rem" }}
    >
      <Container>
        <Navbar.Brand href="#home">Pokemons</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
