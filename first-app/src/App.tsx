import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home";
import { CharactersPage } from "./pages/characters";
import { ContinentsPage } from "./pages/continents";
import { Image, ChakraProvider } from "@chakra-ui/react";
import { AppRouteUi } from "./config/routes";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <div className="App">
          <Link to={AppRouteUi.Root}>
            <Image
              src="https://www.clipartkey.com/mpngs/m/267-2673659_trono-de-hierro-png-game-of-thrones-svg.png"
              height={200}
              margin="auto"
              cursor="pointer"
              marginBottom={10}
            />
          </Link>
          <Routes>
            <Route path={AppRouteUi.Root} element={<HomePage />} />
            <Route
              path={`${AppRouteUi.Characters()}/*`}
              element={<CharactersPage />}
            />
            <Route
              path={`${AppRouteUi.Continents()}/*`}
              element={<ContinentsPage />}
            />
          </Routes>
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
