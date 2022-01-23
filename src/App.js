import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

function App() {
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const API = "https://pokeapi.co/api/v2/pokemon/?limit=21&offset=" + offset;

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
  }, [API, pokemons]);

  const showMorePokemons = () => {
    setOffset(offset + 21);
  };

  const showPreviousPokemons = () => {
    if (offset !== 0) {
      setOffset(offset - 21);
    }
  };

  return (
    <div className="App">
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
      <Container>
        <Row
          xs={2}
          md={4}
          className="justify-content-between d-flex my-5 gap-5"
        >
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {!isLoading &&
            pokemons.map((p) => (
              <Col>
                <Card bg="dark" text="light">
                  <Card.Body>
                    <Card.Text style={{ color: "white" }}>
                      {p.name.substring(0, 1).toUpperCase() +
                        p.name.substring(1)}
                    </Card.Text>
                  </Card.Body>
                  <Card.Img
                    style={{ height: "15rem", padding: "2rem" }}
                    variant="bottom"
                    src={p.sprites.other.dream_world.front_default}
                  />
                </Card>
              </Col>
            ))}
        </Row>
      </Container>{" "}
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
}

export default App;
