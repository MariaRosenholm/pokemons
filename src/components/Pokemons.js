import PokemonCard from "./PokemonCard";
import Loader from "./Spinner";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const API = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + offset;

  useEffect(() => {
    axios.get(API).then((res) => {
      const fethches = res.data.results.map((p) =>
        axios.get(p.url).then((res) => res.data)
      );

      Promise.all(fethches).then((data) => {
        setPokemons(data);
        setIsLoading(false);
      });
    });
  }, [API]);

  const showMorePokemons = () => {
    setOffset(offset + 20);
  };

  const showPreviousPokemons = () => {
    if (offset !== 0) {
      setOffset(offset - 20);
    }
  };
  return (
    <div>
      <Container>
        <Row
          xs={2}
          md={5}
          className="justify-content-between d-flex my-5 gap-5"
        >
          {isLoading && <Loader />}
          {!isLoading &&
            pokemons.map((p) => <PokemonCard pokemon={p} key={p.name} />)}
        </Row>
      </Container>
      <Container className="justify-content-between d-flex my-5 ">
        <Button style={{ background: "black" }} onClick={showPreviousPokemons}>
          Last page
        </Button>
        <Button style={{ background: "black" }} onClick={showMorePokemons}>
          Next page
        </Button>
      </Container>
    </div>
  );
};

export default Pokemons;
