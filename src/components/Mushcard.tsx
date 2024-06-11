import { useContext } from "react";
import { GamestateContext } from "../modules/gamestate_provider";

const Mushcard = ({ mush }: { mush: number }) => {
  const {
    gameConstants: { Mushrooms },
  } = useContext(GamestateContext);
  return (
    <div className="horz-div flex-col ">
      <div>{Mushrooms[mush].name}</div>
      <div>{"Damage: " + Mushrooms[mush].damage}</div>
      <div className="w-11/12">{Mushrooms[mush].desc}</div>
    </div>
  );
};

export default Mushcard;
