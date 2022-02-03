import React from "react";
import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import Loader from "./Spinner";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PokeSingle = () => {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { pokemonName } = useParams();

  let navigate = useNavigate();

  const getPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setPokemon(res.data);
        setIsLoading(false);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <Container className="justify-content-center">
          <Row className="justify-content-center">
            <Col xs lg="2">
              <h1>
                {pokemon.name.substring(0, 1).toUpperCase() +
                  pokemon.name.substring(1)}
              </h1>
              <p> Base experience: {pokemon.base_experience} </p>
              <p> Height: {pokemon.height} </p>
              <p> Weight: {pokemon.weight} </p>
              <ul>
                Type(s):
                {pokemon.types.map((type) => (
                  <li>{type.type.name}</li>
                ))}
              </ul>
            </Col>
            <Col xs lg="2">
              <img
                alt="pokemon"
                src={pokemon.sprites.other.dream_world.front_default}
              ></img>
            </Col>
          </Row>
          <Button onClick={() => navigate(-1)} variant="dark">
            Back to Pokemons
          </Button>
        </Container>
      )}
    </div>
  );
};

export default PokeSingle;
