import { Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { CharactersPage } from "./pages/characters";
import { LocationsPage } from "./pages/locations";
import { Image } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Link to="/">
        <Image
          src="https://1000logos.net/wp-content/uploads/2022/03/Rick-and-Morty.png"
          height={200}
          margin="auto"
          cursor="pointer"
          marginBottom={10}
        />
      </Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="characters/*" element={<CharactersPage />} />
        <Route path="locations" element={<LocationsPage />} />
      </Routes>
    </div>
  );
}

export default App;
