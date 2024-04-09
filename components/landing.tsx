import mush1 from "./images/mush1.png";
import styles from "./landing.module.css";
import Image from "next/image";

type Props = {
  name: string;
  roomID: string;
  setName: (name: string) => void;
  setRoomID: (roomID: string) => void;
  joinCreate: string;
  joinRoomHandler: (e: React.SyntheticEvent) => void;
  createRoomHandler: (e: React.SyntheticEvent) => void;
};

const Landing = ({
  name,
  roomID,
  setName,
  setRoomID,
  joinCreate,
  joinRoomHandler,
  createRoomHandler,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Image className="drop-shadow-lg" alt="Mush1" src={mush1} />
      </div>
      <div className="text-7xl font-rubik">SHITAKE</div>
      <div className="text-2xl font-reenie">A number game by Han.</div>
      <div className="pt-20">Name</div>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="outline border mt-2 w-60 py-0.5 rounded-md text-center drop-shadow-lg text-gray-700 leading-tight"
      />
      <div className="pt-3 font-klee">Room code</div>
      <input
        onChange={(e) => setRoomID(e.target.value)}
        value={roomID}
        className="outline border mt-2 w-60 py-0.5 rounded-md text-center drop-shadow-lg text-gray-700 leading-tight"
      />
      <button
        className="font-klee bg-black text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md"
        onClick={(e) => {
          joinCreate == "Join Room" ? joinRoomHandler(e) : createRoomHandler(e);
        }}
      >
        {joinCreate}
      </button>
    </div>
  );
};

export default Landing;
