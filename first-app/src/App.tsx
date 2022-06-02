import { Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { CharactersPage } from "./pages/characters";
import { ContinentsPage } from "./pages/continents";
import { Image } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Link to="/">
        <Image
          src="https://www.clipartkey.com/mpngs/m/267-2673659_trono-de-hierro-png-game-of-thrones-svg.png"
          height={200}
          margin="auto"
          cursor="pointer"
          marginBottom={10}
        />
      </Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="characters/*" element={<CharactersPage />} />
        <Route path="continents" element={<ContinentsPage />} />
      </Routes>
    </div>
  );
}

export default App;
