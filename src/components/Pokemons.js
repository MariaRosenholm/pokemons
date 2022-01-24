import PokemonCard from "./PokemonCard";
import Loader from "./Spinner";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPokemons, setNextPokemons] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );

  const getPokemons = () => {
    axios
      .get(nextPokemons)
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        const fethches = res.data.results.map((p) =>
          axios.get(p.url).then((res) => res.data)
        );

        setNextPokemons(res.data.next);

        Promise.all(fethches).then((data) => {
          setPokemons((previousState) => [...previousState, ...data]);
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div>
      <Container fluid style={{ margin: "2vw", width: "96vw" }}>
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between d-flex my-5 gap-5"
        >
          {isLoading && <Loader />}
          {!isLoading &&
            pokemons.map((p) => <PokemonCard pokemon={p} key={p.name} />)}
        </Row>
      </Container>
      <Container className="justify-content-between d-flex my-5 ">
        {/* <Button style={{ background: "black" }} onClick={}>
          Last page
          </Button> */}
        <Button variant="primary" size="lg" onClick={getPokemons}>
          Load more...
        </Button>
      </Container>
    </div>
  );
};

export default Pokemons;
