import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import PokemonCard from "../components/PokemonCard";

const Favorites = ({ favorites, favHandler }) => {
  return (
    <div>
      <Container fluid style={{ margin: "2vw", width: "96vw" }}>
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between d-flex my-5 gap-5"
        >
          {favorites.map((p) => (
            <PokemonCard
              pokemon={p}
              key={p.name}
              favHandler={() => favHandler(p)}
              fav={favorites.some((item) => item.name == p.name)}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Favorites;
