import React from "react";
import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

import LinkContainer from "react-router-bootstrap/LinkContainer";

import { Heart, HeartFill } from "react-bootstrap-icons";

const PokemonCard = ({ pokemon, fav, favHandler }) => {
  return (
    <Card bg="dark" text="light">
      <Card.Body>
        <Card.Header
          className="d-flex justify-content-between"
          style={{ color: "white" }}
        >
          {pokemon.name.substring(0, 1).toUpperCase() +
            pokemon.name.substring(1)}{" "}
          {fav ? (
            <HeartFill size="30" onClick={favHandler} />
          ) : (
            <Heart size="30" onClick={favHandler} />
          )}
          <LinkContainer to={`/${pokemon.name}`}>
            <Button variant="outline-secondary" size="sm">
              Details
            </Button>
          </LinkContainer>
        </Card.Header>
      </Card.Body>
      <Card.Img
        style={{ height: "15rem", padding: "2rem" }}
        variant="bottom"
        src={pokemon.sprites.other.dream_world.front_default}
      />
    </Card>
  );
};

export default PokemonCard;
