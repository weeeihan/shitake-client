import { TypeAnimation } from "react-type-animation";

const Loader = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <TypeAnimation
        sequence={[
          "Loading...",
          3000,
          "Welcome to Shitake 🍄",
          3000,
          "You look like a fungi to hang out with!",
          3000,
          "There's never too mushroom for friends!",
          3000,
          () => {},
        ]}
        repeat={Infinity}
      />
    </div>
  );
};

export default Loader;
