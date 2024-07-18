import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
// import Test from "./pages/Test";
import Roundend from "./pages/Roundend";
import Gameend from "./pages/Gameend";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/roundend" element={<Roundend />} />
        <Route path="/gameend" element={<Gameend />} />
      </Routes>
    </>
  );
}

export default App;
