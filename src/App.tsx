import "./App.css";
import Landing from "./pages/Landing";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Roundend from "./pages/Roundend";
import Gameend from "./pages/Gameend";
import { useContext } from "react";
import { GamestateContext } from "./modules/gamestate_provider";
import Tutorial from "./pages/Tutorial";

function App() {
  const { path } = useContext(GamestateContext);
  return (
    <div>
      {path === "/" && <Landing />}
      {path === "/lobby" && <Lobby />}
      {path === "/game" && <Game />}
      {path === "/roundend" && <Roundend />}
      {path === "/gameend" && <Gameend />}
      {path === "/tutorial" && <Tutorial />}
    </div>
  );
}

export default App;
