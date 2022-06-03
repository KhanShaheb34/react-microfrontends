import { Box } from "@chakra-ui/react";
import { Card } from "../components/card.component";
import { AppRouteUi } from "../config/routes";

export const HomePage = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <Card
        image="https://www.pngall.com/wp-content/uploads/4/Rick-And-Morty-PNG-Clipart.png"
        to={AppRouteUi.Characters()}
        title="Characters"
      />
      <Card
        image="https://www.pngitem.com/pimgs/m/517-5175553_vector-portal-spiral-rick-e-morty-portal-hd.png"
        to={AppRouteUi.Locations()}
        title="Locations"
      />
    </Box>
  );
};
