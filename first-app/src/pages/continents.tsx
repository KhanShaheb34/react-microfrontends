import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export type ContinentType = {
  id: number;
  name: string;
};

const fetchCharacters = async () => {
  const url = "https://thronesapi.com/api/v2/Continents";
  const response = await axios.get<ContinentType[]>(url);
  return response.data;
};

export const ContinentsPage = () => {
  const [continents, setContinents] = useState<ContinentType[]>([]);

  useEffect(() => {
    fetchCharacters().then(setContinents);
  }, []);

  return (
    <Box display="flex" justifyContent="space-around" flexWrap="wrap">
      {continents.map((item) => (
        <Box border="1px solid #ddd" padding={20} margin={10}>
          <Text>{item.name}</Text>
        </Box>
      ))}
    </Box>
  );
};
