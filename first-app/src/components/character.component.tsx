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
      <Image src={character.imageUrl} />
      <Text fontSize="2xl">{character.fullName}</Text>
      <Text fontSize="lg">{character.title}</Text>
      <Text fontSize="lg">{character.family}</Text>
    </Box>
  );
};
