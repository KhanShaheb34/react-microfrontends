import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { CharactersPage } from "./pages/characters";
import { LocationsPage } from "./pages/locations";
import { ChakraProvider, Image } from "@chakra-ui/react";
import { AppRouteUi } from "./config/routes";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <div className="App">
          <Link to={AppRouteUi.Root}>
            <Image
              src="https://1000logos.net/wp-content/uploads/2022/03/Rick-and-Morty.png"
              height={200}
              margin="auto"
              cursor="pointer"
              marginBottom={10}
            />
          </Link>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={AppRouteUi.Root} replace />}
            />
            <Route path={AppRouteUi.Root} element={<HomePage />} />
            <Route
              path={`${AppRouteUi.Characters()}/*`}
              element={<CharactersPage />}
            />
            <Route
              path={`${AppRouteUi.Locations()}/*`}
              element={<LocationsPage />}
            />
          </Routes>
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
