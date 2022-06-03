import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Character } from "../components/character.component";
import { SideNav } from "../components/sidenav.component";
import { AppRouteUi } from "../config/routes";

export type ResponseType = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: CharacterType[];
};

export type CharacterType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

const fetchCharacters = async () => {
  const url = "https://rickandmortyapi.com/api/character";
  const response = await axios.get<ResponseType>(url);
  return response.data?.results;
};

export const CharactersPage = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    fetchCharacters().then(setCharacters);
  }, []);

  return (
    <Box display="flex">
      <SideNav
        items={characters.map((item) => ({
          title: `${item.name}`,
          to: AppRouteUi.Character(item.id),
        }))}
      />

      <Box>
        <Routes>
          <Route
            path="/"
            element={
              <Text fontSize="2xl" color="#aaa" align="center" padding={20}>
                Select a character to view details
              </Text>
            }
          />
          <Route
            path="/:id"
            element={<Character allCharacters={characters} />}
          />
        </Routes>
      </Box>
    </Box>
  );
};
