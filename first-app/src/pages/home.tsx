import { Box } from "@chakra-ui/react";
import { Card } from "../components/card.component";
import { AppRouteUi } from "../config/routes";

export const HomePage = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <Card
        image="https://i.pinimg.com/originals/50/cc/b2/50ccb239b7824081bf69b3596c732583.jpg"
        to={AppRouteUi.Characters()}
        title="Characters"
      />
      <Card
        image="https://i.pinimg.com/originals/71/b8/4a/71b84abdda9c8406b7e4e9153b71bc7c.jpg"
        to={AppRouteUi.Continents()}
        title="Continents"
      />
    </Box>
  );
};
