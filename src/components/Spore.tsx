const Spore = ({ n }: { n: string }) => {
  let num = Number(n);
  // console.log(n);
  return (
    <div className="z-100 w-14 h-14 flex rounded-full bg-slate-300 justify-center items-center border-2 border-black text-[1.5rem]">
      {num}
    </div>
  );
};

export default Spore;
