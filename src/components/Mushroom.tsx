import React from "react";
import { useContext } from "react";
import { GamestateContext } from "../modules/gamestate_provider";

const Mushroom = ({
  mush,
  setMush,
}: {
  mush: number;
  setMush: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { getMush } = useContext(GamestateContext);
  const goBack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMush(-1);
  };

  if (mush == -1) {
    return;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <img alt="mush" src={`/images/${getMush(mush).name}.png`} width={150} />
      <div>
        {getMush(mush).name} {"["}
        {mush}
        {"]"}
      </div>
      <div>Damage : {getMush(mush).damage}</div>
      <div>{getMush(mush).desc}</div>
      <div>
        <button onClick={goBack}>Back</button>
      </div>
    </div>
  );
};

export default Mushroom;
