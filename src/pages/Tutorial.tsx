import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import Modal, { Styles } from "react-modal";
import { useContext, useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  coloring,
  getTotalDamge,
  getX,
  getY,
  img,
  useInterval,
} from "../utils/utils";
import { motion } from "framer-motion";
import { Room } from "../utils/struct";
import Draggable from "react-draggable";
import { GamestateContext } from "../modules/gamestate_provider";
import { DraggableData } from "react-rnd";

const testRoom: Room = {
  ...({} as Room),
  mushrooms: {
    0: {
      name: "Shiitake",
      damage: 1,
      desc: "something special",
      color: "brown",
    },
  },
  played: "",
  chooser: "",
  id: "8888",
  deck: [[1], [2], [3], [4]],
  players: [
    {
      name: "Your name",
      hp: 100,
      ready: false,
      isBot: false,
    },
    {
      name: "player2",
      hp: 67,
      ready: true,
      isBot: false,
    },
    {
      name: "player3",
      hp: 89,
      ready: false,
      isBot: false,
    },
    {
      name: "player4",
      hp: 30,
      ready: false,
      isBot: false,
    },
    {
      name: "player5",
      hp: 67,
      ready: true,
      isBot: false,
    },
    {
      name: "leiloumou",
      hp: 89,
      ready: false,
      isBot: false,
    },
    {
      name: "player7",
      hp: 80,
      ready: false,
      isBot: false,
    },
    {
      name: "player8",
      hp: 67,
      ready: true,
      isBot: false,
    },
    {
      name: "player9",
      hp: 89,
      ready: false,
      isBot: false,
    },
    {
      name: "player10",
      hp: 100,
      ready: false,
      isBot: false,
    },
  ],
};

const modalStyle: Styles = {
  content: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    right: "10%",
    bottom: "auto",
    height: "100%",
    transform: "translate(-50%, -50%)",
    border: "none",
    width: "100%",
    // borderRadius: "20px",
    // border: "1px solid black",
  },
  overlay: {
    zIndex: 1000,
  },
};

const mushrooms: any = {
  0: {
    name: "Shiitake",
    damage: 1,
    color: "brown",
    desc: "Lentinula edodes is a species of edible mushroom native to East Asia, which is cultivated and consumed in many Asian countries. It is considered a medicinal mushroom in some forms of traditional medicine.",
  },
  1: {
    name: "Shiitake",
    damage: 1,
    color: "brown",
    desc: "Lentinula edodes is a species of edible mushroom native to East Asia, which is cultivated and consumed in many Asian countries. It is considered a medicinal mushroom in some forms of traditional medicine.",
  },

  9: {
    name: "Enoki",
    damage: 2,
    color: "white",
    desc: "Flammulina filiformis is a species of edible agaric in the family Physalacriaceae. It is widely cultivated in East Asia, and well known for its role in Japanese and Chinese cuisine.",
  },
  20: {
    name: "Enoki",
    damage: 2,
    color: "white",
    desc: "Flammulina filiformis is a species of edible agaric in the family Physalacriaceae. It is widely cultivated in East Asia, and well known for its role in Japanese and Chinese cuisine.",
  },
  6: {
    name: "Oyster",
    damage: 4,
    color: "brown",
    desc: "Pleurotus ostreatus, the oyster mushroom, is a common edible mushroom. It was first cultivated in Germany as a subsistence measure during World War I and is now grown commercially around the world for food.",
  },
  25: {
    name: "Oyster",
    damage: 4,
    color: "brown",
    desc: "Pleurotus ostreatus, the oyster mushroom, is a common edible mushroom. It was first cultivated in Germany as a subsistence measure during World War I and is now grown commercially around the world for food.",
  },
  2: {
    name: "Lion's Mane",
    damage: 8,
    color: "white",
    desc: "Hericium erinaceus is a species of tooth fungus in the family Hericiaceae. It is native to North America, Europe, and Asia. It can be mistaken for other species of Hericium, all popular edibles, which grow across the same range.",
  },
  3: {
    name: "Lion's Mane",
    damage: 8,
    color: "white",
    desc: "Hericium erinaceus is a species of tooth fungus in the family Hericiaceae. It is native to North America, Europe, and Asia. It can be mistaken for other species of Hericium, all popular edibles, which grow across the same range.",
  },
  5: {
    name: "Reishi",
    damage: 10,
    color: "red",
    desc: "Ganoderma lucidum is a species of bracket fungus, and the type species of the genus Ganoderma. It lives on deadwood, especially dead trees, and is generally considered to be a saprotroph, rather than a parasite.",
  },
  91: {
    name: "Reishi",
    damage: 10,
    color: "red",
    desc: "Ganoderma lucidum is a species of bracket fungus, and the type species of the genus Ganoderma. It lives on deadwood, especially dead trees, and is generally considered to be a saprotroph, rather than a parasite.",
  },
  28: {
    name: "Chanterelle",
    damage: 15,
    desc: "Cantharellus cibarius, commonly known as the chanterelle, golden chanterelle or girolle, is a fungus. It is probably the best known species of the genus Cantharellus, if not the entire family of Cantharellaceae.",
    color: "yellow",
  },
};

const getMush = (num: number) => {
  if (mushrooms[num] == undefined) {
    return mushrooms[1];
  }
  return mushrooms[num];
};

const Selection = ({ selected }: { selected: number }) => {
  const { setNodeRef } = useDroppable({
    id: "selection",
  });
  if (selected == -1) {
    return (
      <div
        ref={setNodeRef}
        className="w-11/12 border border-black rounded-2xl h-[10rem] flex flex-col justify-center items-center shadow-lg"
        style={{
          backgroundColor: coloring("brown"),
        }}
      >
        <div>Toss a spore!</div>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      className="relative w-11/12 h-[10rem] border border-black rounded-2xl shadow-lg overflow-y-scroll"
      style={{
        backgroundColor: coloring(getMush(selected).color),
      }}
    >
      <div className="absolute left-3 text-3xl">{selected}</div>
      <div className="absolute right-3 text-4xl">{selected}</div>
      <div className="flex flex-col items-center my-1 mx-2 font-patrick tracking-wide">
        <img src={img(getMush(selected).name)} width={80} />
        {/* <div className="text-4xl">{selected}</div> */}
        <div>{getMush(selected).name}</div>
        <div>{"Damage: " + getMush(selected).damage}</div>
        <div className="text-center">{getMush(selected).desc}</div>
      </div>
    </div>
  );
};

const Spore = ({ n }: { n: string }) => {
  let num = Number(n);
  // console.log(n);
  return (
    <div
      style={{
        backgroundColor: coloring(getMush(num).color),
        zIndex: 100,
      }}
      className=" border border-black w-14 h-14 flex rounded-full shadow-lg  justify-center items-center text-[1.5rem]"
    >
      {num}
    </div>
  );
};

const NumRow = ({
  numballs,
  active,
}: {
  numballs: number[];
  active: number;
}) => {
  return (
    <div className="flex justify-center flex-wrap mt-4 gap-3 mx-2 ">
      <SortableContext items={numballs} strategy={rectSortingStrategy}>
        {numballs.map((num: number) => (
          <Numball key={num} num={num} active={active} />
        ))}
      </SortableContext>
    </div>
  );
};

const Numball = ({ num, active }: { num: number; active: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: num,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: active === num ? 0 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" touch-none cursor-grab"
      {...listeners}
      {...attributes}
    >
      <Spore n={num.toString()} />
    </div>
  );
};

function health(hp: number) {
  if (hp > 70) {
    return "healthy";
  }
  if (hp > 40) {
    return "decent";
  }
  return "warning";
}
const Tutorial = () => {
  let room = testRoom;
  const [mush, setMush] = useState(-1);
  const [dmg, setDmg] = useState(0);
  const [activeId, setActiveId] = useState(-1);
  const [hand, setHand] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [selected, setSelected] = useState(-1);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);
  const [row, setRow] = useState(-1);
  const nodeRef = useRef(null);
  const [showHand, setShowHand] = useState(false);
  const [startpos, setStartpos] = useState<number[]>([]);
  const divRef = useRef<any>();
  const { navigate } = useContext(GamestateContext);

  const deck = [[19], [23], [91], [3]];
  const deckTwo = [[19, 20, 21, 22], [28, 29], [91, 95, 100], [3]];
  const decksOne = [
    [[19], [23], [91], [3]],
    [[19, 20], [23], [91], [3]],
    [[19, 20], [23, 24], [91], [3]],
    [[19, 20, 21], [23, 24], [91], [3]],
    [[19, 20, 21, 22], [23, 24], [91], [3]],
    [[19, 20, 21, 22], [23, 24, 25], [91], [3]],
    [[19, 20, 21, 22], [23, 24, 25], [91, 95], [3]],
    [[19, 20, 21, 22], [23, 24, 25], [91, 95, 100], [3]],
  ];
  const decksTwo = [
    [[19, 20, 21, 22], [23, 24, 25], [91, 95, 100], [3]],
    [[19, 20, 21, 22], [23, 24, 25, 26], [91, 95, 100], [3]],
    [[19, 20, 21, 22], [23, 24, 25, 26, 27], [91, 95, 100], [3]],
    [[19, 20, 21, 22], [28], [91, 95, 100], [3]],
    [[19, 20, 21, 22], [28, 29], [91, 95, 100], [3]],
  ];
  const movesOne = [
    ["Player 1", "20", "0", "1"],
    ["Player 2", "24", "1", "1"],
    ["Player 3", "21", "0", "2"],
    ["Player 4", "22", "0", "3"],
    ["Player 5", "25", "1", "2"],
    ["Player 6", "95", "2", "1"],
    ["Player 7", "100", "2", "2"],
  ];
  const movesTwo = [
    ["Player 1", "26", "1", "3"],
    ["Player 2", "27", "1", "4"],
    ["Player 3", "28", "1", "1"],
    ["Player 3", "29", "1", "1"],
  ];
  const Mushroom = () => {
    const goBack = (e: React.SyntheticEvent) => {
      e.preventDefault();
      setMush(-1);
    };

    if (mush == -1) {
      return;
    }
    return (
      <div className="flex flex-col items-center ">
        <p className="text-center mb-5">
          (You can see the mushroom details here.)
        </p>
        <div
          onClick={goBack}
          className="flex relative max-w-[400px] border border-black rounded-2xl mx-4  flex-col justify-center items-center font-patrick tracking-wide "
        >
          <div className="absolute left-5 top-3 text-5xl font-sans">{mush}</div>
          <div className="absolute right-5 top-3 text-5xl font-sans">
            {mush}
          </div>
          <img alt="mush" src={img(getMush(mush).name)} width={150} />
          <div>{getMush(mush).name}</div>
          <div>Damage : {getMush(mush).damage}</div>
          <div className="text-center mx-5">{getMush(mush).desc}</div>
          <div className="mt-5">(Click on the card to return)</div>
        </div>
        <p className="mt-5 text-center">
          The damage is how much % of your health will be reduced after eating
          it.
        </p>
      </div>
    );
  };

  const decksThree = () => {
    let newDeck = [...deckTwo];
    newDeck[row] = [1];
    return [deckTwo, newDeck];
  };

  const Deck = ({ data }: { data: number[][] }) => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex  max-w-[430px] w-[100vw] flex-col mt-9 justify-left space-y-[40px] ">
          {data != null &&
            data.map((row: number[], rowNumber: number) => (
              <div
                key={rowNumber}
                className="flex flex-row -space-x-[0.1rem] items-center cursor-pointer"
                onClick={() => setRow(rowNumber)}
              >
                {row.map((num: number, cardNumber: number) => (
                  <div key={cardNumber} className="relative ">
                    <div className="z-10 absolute ">
                      <img
                        className="w-[15vw] max-w-[60px] drop-shadow-lg"
                        src={img(getMush(num).name)}
                        alt="Mushroom"
                        style={{ marginTop: getY(num), marginLeft: getX(num) }}
                      />
                    </div>
                    <div className="">
                      <img
                        ref={divRef}
                        src={img("hlog")}
                        alt="Horizontal Log"
                        className="w-[18vw] h-[6vh] max-w-[72px] min-h-[50px]"

                        // onClick={(e: any) => handleRowClick(e, rowNumber)}
                      />
                    </div>
                  </div>
                ))}
                <div className="ml-4 text-[1.5rem]">
                  <span className="text-white text-[1rem]">{"m"}</span>
                  {row[row.length - 1]}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const ChangingDeck = ({
    decks,
    moves,
  }: {
    decks: number[][][];
    moves: string[][];
  }) => {
    // console.log(moves);
    function getDesY(p: number) {
      // now space between is 5vh, and the height of the log is 6vh so total 11vh
      // thus 0.11 * vh
      // console.log("Y: ", -50 - (3 - p) * 0.11 * vh);
      return -60 - (3 - p) * 90;
    }

    function getDesX(p: number) {
      // Width of the log
      if (p == 0) p += 1;
      let vw = document.documentElement.clientWidth;

      // clamp viewport
      if (vw > 400) {
        vw = 400;
      }
      let width = 0.18 * vw;

      // console.log("vw: ", vw);
      // console.log("divRef: ", divRef.current?.clientWidth);
      // console.log("width: ", width);
      // - (vw/2 - 0.5*width) is initial position. vw/2 is leftmost, we go right by 0.5 of the log width
      // Then we move down the log in increments of width
      // console.log("X: ", -(vw / 2 - 0.5 * width) + (p - 1) * width);
      return -(vw / 2 - 0.5 * width) + (p - 1) * width;
    }

    // console.log(moves);
    const [index, setIndex] = useState(0);
    useInterval(() => {
      // console.log(index);
      if (index == decks.length - 1) {
        setIndex(0);
        testRoom.players[0].hp += dmg;
      } else {
        testRoom.players[0].hp -= dmg;
        setIndex((prev) => prev + 1);
        // console.log("here?");
        // setRoom((prev) => ({
        //   ...prev,
        //   players: newplayers,
        // }));
      }
    }, 1500);
    return (
      <>
        <div className="relative z-1">
          <Deck data={decks[index]} />
        </div>
        {index < moves.length ? (
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              key={index}
              variants={{
                one: {
                  opacity: 0,
                  transition: { delay: 1 },
                },
                two: {
                  opacity: 1,

                  // transition: { duration: 1 },
                },
                three: {
                  y: getDesY(Number(moves[index][2])),
                  x: getDesX(Number(moves[index][3])),
                  transition: { delay: 0.5, duration: 0.8 },
                },
                four: {
                  scale: 0,
                  transition: { delay: 1, duration: 0.8 },
                },
              }}
              animate={["one", "two", "three", "four"]}
            >
              <Spore n={moves[index][1]} />
            </motion.div>
            <div className="text-center">{moves[index][0]}</div>
          </div>
        ) : (
          <>
            <Spore n={"101"} />
            <div className="text-center">And so on...</div>
          </>
        )}
        {page == 7 && (
          <div className="w-11/12 mt-4 max-h-[15vh] bg-white border border-black flex flex-col rounded-2xl shadow-xl ">
            <div className="my-4 mx-4 overflow-y-auto">
              {room.players.map((player, index) => (
                <div key={index} className="mt-1 font-patrick tracking-wide">
                  <div className="-mb-1">
                    {player.name +
                      "   (" +
                      player.hp +
                      "/100) " +
                      (player.ready ? "🍄" : "") +
                      (player.hp < 0 ? "💀" : "")}
                  </div>

                  <progress
                    max={100}
                    value={player.hp >= 0 ? player.hp : 0}
                    className={health(player.hp)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    // console.log(event.active.id);
    if (page == 1 && !next) {
      setNext(true);
    }
    // console.log("DRAG START");
  };

  const handleDragOver = (event: any) => {
    const { over } = event;
    if (over != null) {
      if (over.id === "selection") {
        // console.log("Selected " + active.id);
      }
    }
  };

  const handleDragEnd = (event: any) => {
    // console.log(event);
    const { active, over, delta } = event;
    // console.log("DRAG END");

    if (delta.x == 0 && delta.y == 0) setMush(active.id);

    if (active.id === over.id) {
      setActiveId(-1);
      return;
    }

    if (over.id === "selection") {
      if (page == 2 && !next) {
        setNext(true);
      }

      if (selected !== -1) {
        const selPos = hand.indexOf(active.id);
        setHand((prevState) => [
          ...prevState.slice(0, selPos),
          selected,
          ...prevState.slice(selPos),
        ]);
      }

      setSelected(active.id);
      setHand((prevState) => prevState.filter((num) => num !== active.id));
    }

    setHand((prev) =>
      arrayMove(prev, prev.indexOf(active.id), prev.indexOf(over.id))
    );

    setActiveId(-1);
  };

  const handleTouchStart = (data: DraggableData) => {
    setStartpos([data.x, data.y]);
  };

  const handleTouchEnd = (data: DraggableData) => {
    const endpos = [data.x, data.y];

    // console.log(delta);

    const distance = Math.sqrt(
      Math.pow(endpos[0] - startpos[0], 2) +
        Math.pow(endpos[1] - startpos[1], 2)
    );
    if (distance < 5) {
      setShowHand((prev) => !prev);
      // console.log("click");
    }
  };

  if (row !== -1 && page == 6) {
    // console.log(row);
    return (
      <div className="flex flex-col items-center w-screen">
        <div className="  w-max-[400px]">
          <div className="mt-10 mb-4 text-center ">
            <div className=" shadow-lg rounded-2xl border border-black">
              <p className="mt-4 mx-2">
                {" "}
                Now you can see the damage of the mushrooms on this row.
              </p>
              <p className=" mt-2 mb-4 w-[90vw] text-center ">
                (You may also click on the rows at any time of the game to see
                these info!)
              </p>
            </div>
          </div>
          <div className="flex flex-col  justify-left ">
            <div>
              {deckTwo[row].map((num: number, index: number) => (
                <div key={index} className="flex flex-row items-center ">
                  <img
                    src={img(getMush(num).name)}
                    width={80}
                    alt="player mushrooms!"
                    className={" drop-shadow-lg cursor-pointer "}
                  />
                  <div className="font-patrick tracking-wide">
                    {"["}
                    {num}
                    {"]"} {getMush(num).name}, {"("}Damage:{" "}
                    {getMush(num).damage}%{")"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="font-patrick text-2xl mt-10 tracking-wide flex justify-center">
            Total damage: {getTotalDamge(deckTwo[row], mushrooms)}%
          </div>
          <div className="flex flex-row justify-center mt-10">
            <span
              className="cursor-pointer text-3xl font-patrick tracking-wide"
              onClick={() => {
                setPage(7);
                setDmg(getTotalDamge(deckTwo[row], mushrooms));
              }}
            >
              🍽 EAT!
            </span>
            <span className="text-3xl font-patrick tracking-wide mx-10">|</span>
            <span
              className="cursor-pointer text-3xl font-patrick tracking-wide"
              onClick={() => setRow(-1)}
            >
              Nope.🚫
            </span>
          </div>
          <div className="border border-black rounded-2xl mt-6 shadow-lg">
            <p className="w-[90vw] text-center mt-4">
              If you want to check out the other rows, press "Nope." (tip: the
              lower the damage the better 🤫)
            </p>
            <p className="w-[90vw] text-center mt-2 mb-4">
              If you're ready to eat, you know what to do!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-screen flex flex-col items-center justify-center">
      <div className="max-w-[400px]">
        {page == 1 ? (
          <div className=" flex flex-col text-center justify-center items-center ">
            <Modal
              isOpen={mush !== -1}
              onRequestClose={() => setMush(-1)}
              appElement={document.getElementById("root") as HTMLElement}
              style={modalStyle}
            >
              <Mushroom />
            </Modal>

            <p className="w-[90vw] mt-10">
              Welcome to Shitake, this game is about growing and eating
              mushrooms! <br /> (and not dying 🫢)
            </p>
            <p>
              Firstly, you have a bunch of spores. <br /> (Drag around!)
            </p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            >
              {/* <Selection selected={selected} /> */}

              <NumRow numballs={hand} active={activeId} />
              <DragOverlay>
                {activeId !== -1 ? (
                  <Numball num={activeId} active={-1} />
                ) : null}
              </DragOverlay>
            </DndContext>
            <p>
              Each spore grows a mushroom. <br /> (Tap on a spore!)
            </p>
            <p>
              The number on the spore indicates the{" "}
              <span className="font-bold">weight</span> of the mushroom.
            </p>
            <p>There are no repeating numbers in a round.</p>
            {next ? (
              <button
                className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                onClick={() => {
                  setPage(2);
                  setNext(false);
                  setSelected(-1);
                  setHand([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                }}
              >
                Next
              </button>
            ) : (
              <div className="relative flex flex-col items-center">
                <button className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg opacity-50">
                  Next
                </button>
                <p className="absolute opacity-50 w-[20rem]  text-center">
                  {" "}
                  Drag the spores!
                </p>
              </div>
            )}
          </div>
        ) : page == 2 ? (
          <div className="flex flex-col items-center text-center ">
            <Modal
              isOpen={mush !== -1}
              onRequestClose={() => setMush(-1)}
              appElement={document.getElementById("root") as HTMLElement}
              style={modalStyle}
            >
              <Mushroom />
            </Modal>

            <p className="mb-4">
              At every turn, each player <span className="font-bold">must</span>{" "}
              choose a spore and drag into the{" "}
              {<span className="italic">selection box</span>} which says "Toss a
              spore!"
            </p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            >
              <Selection selected={selected} />

              <NumRow numballs={hand} active={activeId} />
              <DragOverlay>
                {activeId !== -1 ? (
                  <Numball num={activeId} active={-1} />
                ) : null}
              </DragOverlay>
            </DndContext>

            <p className="w-[90vw] mt-5">
              You may repeatedly change your selection by dragging another spore
              into the box. Once every player has selected, a{" "}
              <span className="font-bold">5-second timer</span> will start.
            </p>

            <p className="w-[90vw] mt-5">
              It is your final 5 seconds to change your selection.
            </p>
            {next ? (
              <div className="flex flex-row space-x-4">
                <button
                  className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                  onClick={() => {
                    setPage(1);
                    setHand([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    setNext(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                  onClick={() => setPage(3)}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center opacity-50">
                <div className="flex flex-row space-x-4  relative">
                  <button className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg">
                    Back
                  </button>
                  <button className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg">
                    Next
                  </button>
                </div>
                <p className="absolute w-[90vw]">
                  Toss a spore into the selection box!
                </p>
              </div>
            )}
          </div>
        ) : page == 3 ? (
          <div className="flex flex-col text-center  items-center">
            <p className="w-[90vw] ">
              Once the timer is up, the spores will{" "}
              <span className="italic">fly</span> to 1 of the 4 logs to grow,
              one by one.
            </p>
            <Deck data={deck} />

            <p className="w-[90vw] ">
              The number at the end of the log is the weight of the rightmost
              mushroom
            </p>
            <p className="w-[90vw] ">
              The spore will only grow next to a{" "}
              <span className="font-bold">lighter</span> mushroom with the{" "}
              <span className="font-bold"> most similar weight </span>
            </p>
            <div className="flex flex-row space-x-4 ">
              <button
                className="border-2 border-black px-8 py-2 mt-10 rounded-xl shadow-lg"
                onClick={() => setPage(2)}
              >
                Back
              </button>
              <button
                className="border-2 border-black px-8 py-2 mt-10 rounded-xl shadow-lg"
                onClick={() => setPage(4)}
              >
                Next
              </button>
            </div>
          </div>
        ) : page == 4 ? (
          <div className="flex flex-col text-center items-center ">
            <p className="w-[90vw]">
              The spore with the smallest number will grow first, since it is
              the lightest
            </p>
            <ChangingDeck decks={decksOne} moves={movesOne} />

            <p className="w-[90vw] my-5">
              Followed by the spore with the next smallest number, one by one.
            </p>

            <div className="flex flex-row space-x-4 ">
              <button
                className=" border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                onClick={() => setPage(3)}
              >
                Back
              </button>
              <button
                className=" border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                onClick={() => setPage(5)}
              >
                Next
              </button>
            </div>
          </div>
        ) : page == 5 ? (
          <div className="flex flex-col text-center items-center">
            <p className="w-[90vw] ">
              However, the log is only long enough to grow 5 mushrooms.
            </p>
            <ChangingDeck decks={decksTwo} moves={movesTwo} />

            <p className="w-[90vw] my-5">
              Thus, Player 3 (with spore 28) must eat the whole row of mushroom
              to grow one on that row
            </p>

            <div className="flex flex-row space-x-4">
              <button
                className=" border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                onClick={() => setPage(4)}
              >
                Back
              </button>
              <button
                className=" border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                onClick={() => setPage(6)}
              >
                Next
              </button>
            </div>
          </div>
        ) : page == 6 ? (
          <div className="flex flex-col text-center items-center ">
            <p className="w-[90vw] ">
              If your spore is lighter than the rightmost mushroom of every
              row...
            </p>
            <Deck data={deckTwo} />

            <Spore n={"1"} />
            <div>Your name</div>
            <p className="w-[90vw] my-5">
              You must choose a row to eat and grow your spore on that row.
              (Click a row and eat!)
            </p>

            <div className="flex flex-row space-x-4">
              <button
                className=" border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                onClick={() => setPage(5)}
              >
                Back
              </button>
              <button
                className=" border-2 border-black px-8 py-2 rounded-xl shadow-lg opacity-50"
                // onClick={() => setPage(7)}
              >
                Next
              </button>
            </div>
          </div>
        ) : page == 7 ? (
          <div className="flex flex-col text-center items-center ">
            <ChangingDeck
              decks={decksThree()}
              moves={[["Your name", "1", row.toString(), "1"]]}
            />
            <p className="mt-5">
              Here you can see a dashboard which shows the health of every
              player! You can see your health is reduced after eating the row
              you picked.
            </p>

            <div className="flex flex-row space-x-4 my-4">
              <button
                className=" border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                onClick={() => {
                  setRow(-1);
                  setPage(6);
                }}
              >
                Back
              </button>
              <button
                className=" border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                onClick={() => setPage(8)}
              >
                Next
              </button>
            </div>
          </div>
        ) : page == 8 ? (
          <div className="flex flex-col items-center">
            <Draggable
              nodeRef={nodeRef}
              onStart={(_, data) => handleTouchStart(data)}
              onStop={(_, data) => handleTouchEnd(data)}
            >
              {/* Testing */}
              <div
                ref={nodeRef}
                style={{
                  width: 50,
                  height: 50,
                  background: `url(${img("bagClose")})`,
                  backgroundSize: "cover",
                }}
              ></div>
              {/* <img src={img("bagClose")} alt="bag" width={60} /> */}
            </Draggable>

            <div className="flex flex-col items-center ">
              <p className="text-center w-[90vw]">
                This is your spore bag! Tap this to switch between your spores
                and the dashboard.{" "}
              </p>
              <p className="text-center w-[90vw]">
                You can drag it and place it wherever you want on the screen!
              </p>
              {showHand && (
                <div className="flex flex-col mt-4 items-center">
                  {/* <Selection selected={selected} /> */}

                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                  >
                    <Selection selected={selected} />

                    <NumRow numballs={hand} active={activeId} />
                    <DragOverlay>
                      {activeId !== -1 ? (
                        <Numball num={activeId} active={-1} />
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                </div>
              )}
              {!showHand && (
                <div className="mt-4 mx-10 max-h-[300px] bg-white border border-black flex flex-col rounded-2xl shadow-xl ">
                  <div className="w-[300px] my-4 mx-4 overflow-y-auto">
                    {room.players.map((player, index) => (
                      <div
                        key={index}
                        className="mt-1 font-patrick tracking-wide"
                      >
                        <div className="-mb-1">
                          {player.name +
                            "   (" +
                            player.hp +
                            "/100) " +
                            (player.ready ? "🍄" : "") +
                            (player.hp < 0 ? "💀" : "")}
                        </div>

                        <progress
                          max={100}
                          value={player.hp >= 0 ? player.hp : 0}
                          className={health(player.hp)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-center mt-6 ">
                After you finished the spores, the round ends. If one or more
                person died, the game ends. Else, the next round begins{" "}
                <br></br>
                <br />
                (The health is carried to the next round, so if you're left with
                1%, you will start a new round with 1%).
              </p>
              <p className="text-center ">
                Now you should be all ready to play the game!
              </p>
              <button
                className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
                onClick={() => navigate("/")}
              >
                Let's goooooo 🎉
              </button>
            </div>
          </div>
        ) : (
          <div>Last Page</div>
        )}
        <p className="ml-5 mt-20 text-blue-800" onClick={() => navigate("/")}>
          ↩ Aite I got this!
        </p>
      </div>
    </div>
  );
};

export default Tutorial;
