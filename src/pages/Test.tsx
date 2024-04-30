import { useContext } from "react";
import { GamestateContext } from "../modules/gamestate_provider";

const Test = () => {
  const { player } = useContext(GamestateContext);

  const debug = () => {
    console.log(player);
  };
  return (
    <div>
      <div>This is test page</div>
      <button onClick={debug}>Debug</button>
    </div>
  );
};

export default Test;
