import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { CharactersPage } from "./pages/characters";
import { ContinentsPage } from "./pages/continents";
import { Text } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Text fontSize="3xl" align="center" padding={10}>
        Welcome to GOT App
      </Text>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="characters" element={<CharactersPage />} />
        <Route path="continents" element={<ContinentsPage />} />
      </Routes>
    </div>
  );
}

export default App;
