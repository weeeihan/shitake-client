import Spore from "./Spore";

const Played = ({ moves }: { moves: string[][] }) => {
  return (
    <div className="flex flex-wrap w-screen justify-center space-x-8 items-center ">
      {moves.map((p, index) => (
        <div
          key={index}
          className="flex flex-col space-y-1 justify-center items-center"
        >
          <div>{p[0]}</div>
          <Spore n={p[1]} />
        </div>
        // <div key={index}>
        // </div>
      ))}
    </div>
  );
};

export default Played;
