import Spore from "./Spore";

const Played = ({ moves }: { moves: string[][] }) => {
  return (
    <div className="flex flex-wrap max-w-[400px]  justify-center items-center ">
      {moves.map((p, index) => (
        <div
          key={index}
          className="flex flex-col space-y-1 justify-center mx-2 my-2 items-center w-[80px]"
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
