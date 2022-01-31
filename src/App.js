import Home from "./pages/Home";
import Pokemons from "./pages/Pokemons";
import Layout from "./components/Layout";
import PokeSingle from "./components/PokeSingle";
import Favorites from "./pages/Favorites";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);

  const getArray = JSON.parse(localStorage.getItem("favorites") || "0");

  useEffect(() => {
    if (getArray != 0) {
      setFavorites(getArray);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const favHandler = (pokemon) => {
    let item = favorites.some((item) => item.id === pokemon.id);

    if (!item) {
      setFavorites((prevState) => [...prevState, pokemon]);
    } else {
      const newArray = [...favorites];
      newArray.splice(
        newArray.findIndex((item) => item.id === pokemon.id),
        1
      );
      setFavorites(newArray);
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="favorites"
              element={
                <Favorites favHandler={favHandler} favorites={favorites} />
              }
            />
            <Route
              path="pokemons"
              element={
                <Pokemons favHandler={favHandler} favorites={favorites} />
              }
            />
            <Route path=":pokemonName" element={<PokeSingle />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
