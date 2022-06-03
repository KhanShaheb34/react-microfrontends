import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Character } from "../components/character.component";
import { SideNav } from "../components/sidenav.component";
import { AppRouteUi } from "../config/routes";

export type CharacterType = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string;
};

const fetchCharacters = async () => {
  const url = "https://thronesapi.com/api/v2/Characters";
  const response = await axios.get<CharacterType[]>(url);
  return response.data;
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
          title: `${item.firstName} ${item.lastName}`,
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
