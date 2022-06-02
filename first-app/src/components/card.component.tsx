import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export type CardProps = {
  to: string;
  image: string;
  title: string;
};

export const Card = (props: CardProps) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      shadow="sm"
      transition="all .3s ease-in-out"
      _hover={{
        shadow: "lg",
      }}
      as={Link}
      to={props.to}
    >
      <Image src={props.image} height={300} paddingX={10} paddingY={5} />
      <Text fontSize="3xl" align="center" padding={5}>
        {props.title}
      </Text>
    </Box>
  );
};
