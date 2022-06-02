import { Box, Text, Image } from "@chakra-ui/react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { CharacterType } from "../pages/characters";

export type CharacterProps = {
  allCharacters: CharacterType[];
};

export const Character = (props: CharacterProps) => {
  const { id } = useParams<{ id: string }>();
  const character = useMemo(
    () =>
      !!id ? props.allCharacters.find((c) => c.id === parseInt(id)) : undefined,
    [id, props.allCharacters]
  );

  if (!character) {
    return (
      <Box>
        <Text fontSize="2xl" color="#aaa" align="center" padding={20}>
          Character not found
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Image src={character.image} />
      <Text fontSize="2xl">{character.name}</Text>
      <Text fontSize="lg">{character.gender}</Text>
      <Text fontSize="lg">{character.location.name}</Text>
      <Text fontSize="lg">{character.species}</Text>
      <Text fontSize="lg">{character.origin.name}</Text>
      <Text fontSize="lg">{character.status}</Text>
      <Text fontSize="lg">{character.type}</Text>
    </Box>
  );
};
