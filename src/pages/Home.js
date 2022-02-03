import React from "react";

import "../App.css";

import Nav from "react-bootstrap/Nav";
import LinkContainer from "react-router-bootstrap/LinkContainer";

const Home = () => {
  return (
    <div className="hero">
      <LinkContainer to="pokemons">
        <Nav.Link href="pokemons">
          <h1>Poke</h1>
          <h2>App</h2>
        </Nav.Link>
      </LinkContainer>
    </div>
  );
};

export default Home;
