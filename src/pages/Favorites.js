import React from "react";
import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import PokemonCard from "../components/PokemonCard";

const Favorites = ({ favorites, favHandler }) => {
  const [searchInput, setSearchInput] = useState("");

  const searchHandler = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <Container
        className="justify-content-left d-flex"
        style={{ margin: "3vh" }}
      >
        <input
          style={{ width: "15vw", padding: "1vh" }}
          type="text"
          name="search"
          placeholder="search by pokemon name"
          onChange={searchHandler}
        />
      </Container>
      <Container fluid style={{ margin: "2vw", width: "96vw" }}>
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between d-flex my-5 gap-5"
        >
          {favorites
            .filter((pokemon) => {
              return pokemon.name
                .toLowerCase()
                .includes(searchInput.toLowerCase());
            })
            .map((p) => (
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
