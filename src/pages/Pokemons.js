import PokemonCard from "../components/PokemonCard";
import Loader from "../components/Spinner";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const Pokemons = ({ favHandler, favorites }) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPokemons, setNextPokemons] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
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
      <Container className="justify-content-center d-flex">
        <input
          style={{ width: "15vw", padding: "1vh" }}
          type="text"
          name="search"
          placeholder="search by pokemon name"
          // onChange={this.searchHandler}
        />
      </Container>
      <Container fluid style={{ margin: "2vw", width: "96vw" }}>
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between d-flex my-5 gap-5"
        >
          {isLoading && <Loader />}
          {!isLoading &&
            pokemons.map((p) => (
              <PokemonCard
                fav={favorites.some((item) => item.name == p.name)}
                pokemon={p}
                key={p.name}
                favHandler={() => favHandler(p)}
              />
            ))}
        </Row>
      </Container>
      <Container className="justify-content-center d-flex">
        <Button variant="dark" size="lg" onClick={getPokemons}>
          Load more...
        </Button>
      </Container>
    </div>
  );
};

export default Pokemons;
