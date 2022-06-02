import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export type ResponseType = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: LocationType[];
};

export type LocationType = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

const fetchCharacters = async () => {
  const url = "https://rickandmortyapi.com/api/location";
  const response = await axios.get<ResponseType>(url);
  return response.data?.results;
};

export const LocationsPage = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);

  useEffect(() => {
    fetchCharacters().then(setLocations);
  }, []);

  return (
    <Box display="flex" justifyContent="space-around" flexWrap="wrap">
      {locations.map((item) => (
        <Box border="1px solid #ddd" padding={10} margin={10}>
          <Text>{item.name}</Text>
          <Text>{item.type}</Text>
          <Text>{item.dimension}</Text>
        </Box>
      ))}
    </Box>
  );
};
