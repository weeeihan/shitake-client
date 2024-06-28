import { coloring } from "../utils/utils";
import { useContext } from "react";
import { GamestateContext } from "../modules/gamestate_provider";

const Spore = ({ n }: { n: string }) => {
  const { getMush } = useContext(GamestateContext);
  let num = Number(n);
  // console.log(n);
  return (
    <div
      style={{
        backgroundColor: coloring(getMush(num).color),
      }}
      className="z-100 w-14 h-14 flex rounded-full shadow-lg  justify-center items-center text-[1.5rem]"
    >
      {num}
    </div>
  );
};

export default Spore;
