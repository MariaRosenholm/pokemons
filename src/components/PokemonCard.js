import React from "react";

import Card from "react-bootstrap/Card";

const PokemonCard = ({ pokemon }) => {
  return (
    <Card bg="dark" text="light">
      <Card.Body>
        <Card.Text style={{ color: "white" }}>
          {pokemon.name.substring(0, 1).toUpperCase() +
            pokemon.name.substring(1)}
        </Card.Text>
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
