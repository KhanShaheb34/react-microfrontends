import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { CharactersPage } from "./pages/characters";
import { ContinentsPage } from "./pages/continents";

function App() {
  return (
    <div className="App">
      <h1>Welcome to GOT App</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="character" element={<CharactersPage />} />
        <Route path="continent" element={<ContinentsPage />} />
      </Routes>
    </div>
  );
}

export default App;
