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
import { useContext, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { coloring, getX, getY, img, useInterval } from "../utils/utils";
import { GamestateContext } from "../modules/gamestate_provider";
import { motion } from "framer-motion";

const Deck = ({ data }: { data: number[][] }) => {
  const { gameImages } = useContext(GamestateContext);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex  max-w-[430px] w-[100vw] flex-col mt-9 justify-left space-y-[5vh] ">
        {data != null &&
          data.map((row: number[], rowNumber: number) => (
            <div
              key={rowNumber}
              className="flex flex-row -space-x-[0.1rem] items-center cursor-pointer"
              // onClick={(e) => handleRowClick(e, rowNumber)}
            >
              {row.map((num: number, cardNumber: number) => (
                <div key={cardNumber} className="relative ">
                  <div className="z-10 absolute">
                    <img
                      className="w-[15vw] max-w-[80px] drop-shadow-lg"
                      src={img(getMush(num).name)}
                      alt="Mushroom"
                      style={{ marginTop: getY(num), marginLeft: getX(num) }}
                      // onClick={(e) => handleRowClick(e, rowNumber)}
                    />
                  </div>
                  <div className=" ">
                    <img
                      src={img("hlog")}
                      alt="Horizontal Log"
                      className="w-[18vw] h-[6vh] max-w-[100px] min-h-[50px]"
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
const modalStyleLaw: Styles = {
  content: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    right: "10%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    border: "1px solid black",
  },
  overlay: {
    zIndex: 1000,
  },
};

const Played = ({ moves }: { moves: string[][] }) => {
  return (
    <div className="flex flex-wrap w-screen justify-evenly space-x-8 items-center ">
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

const getMush = (num: number) => {
  const mushrooms: any = {
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
    6: {
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
    5: {
      name: "Reishi",
      damage: 10,
      color: "red",
      desc: "Ganoderma lucidum is a species of bracket fungus, and the type species of the genus Ganoderma. It lives on deadwood, especially dead trees, and is generally considered to be a saprotroph, rather than a parasite.",
    },
  };

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
      className="relative w-11/12 h-[10rem] border border-black rounded-2xl shadow-lg overflow-y-scroll "
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
        <div>{getMush(selected).desc}</div>
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
      }}
      className="z-100 border border-black w-14 h-14 flex rounded-full shadow-lg  justify-center items-center text-[1.5rem]"
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
    <div className="flex flex-wrap mt-4 w-screen gap-x-5 gap-y-5 items-center justify-center">
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
      className=" touch-none"
      {...listeners}
      {...attributes}
    >
      <Spore n={num.toString()} />
    </div>
  );
};

const Law = () => {
  return (
    <div>
      <h1>Law of Mushroom Nature</h1>
      <div>
        i. A mushroom shall only grow on the right of the rightmost mushroom on
        a log.
      </div>
      <div>
        ii. A mushroom shall only grow next to a mushroom with a smaller weight.{" "}
      </div>
      <div>
        iii. A mushroom shall only grow next to a mushroom with the most similar
        weight.{" "}
      </div>
      <div>
        If none of the above conditions are met, the mushroom shall only grow on
        a new log.
      </div>
    </div>
  );
};

const Tutorial = () => {
  const [mush, setMush] = useState(-1);
  const [activeId, setActiveId] = useState(-1);
  const [hand, setHand] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [selected, setSelected] = useState(-1);
  const [page, setPage] = useState(1);
  const [law, setLaw] = useState(false);
  const [deck, setDeck] = useState([[19], [23], [91], [3]]);

  const Mushroom = () => {
    const goBack = (e: React.SyntheticEvent) => {
      e.preventDefault();
      setMush(-1);
    };

    if (mush == -1) {
      return;
    }
    return (
      <>
        <p className="text-center mb-5">
          (You can see the mushroom details here.)
        </p>
        <div
          onClick={goBack}
          className="flex relative border border-black rounded-2xl mx-4  flex-col justify-center items-center font-patrick tracking-wide"
        >
          <div className="absolute left-5 top-3 text-5xl font-sans">{mush}</div>
          <div className="absolute right-5 top-3 text-5xl font-sans">
            {mush}
          </div>
          <img alt="mush" src={img(getMush(mush).name)} width={150} />
          <div>{getMush(mush).name}</div>
          <div>Damage : {getMush(mush).damage}</div>
          <div className="text-center">{getMush(mush).desc}</div>
          <div className="mt-5">(Click on the card to return)</div>
        </div>
        <p className="mt-5 text-center">
          The damage is how much % of your health will be reduced after eating
          it.
        </p>
      </>
    );
  };

  const ChangingDeck = () => {
    function getDesY(p: number) {
      let vh = document.documentElement.clientHeight;
      // now space between is 5vh, and the height of the log is 6vh so total 11vh
      // thus 0.11 * vh
      return -50 - (3 - p) * 0.11 * vh;
    }

    function getDesX(p: number) {
      if (p == 0) p += 1;
      let vw = document.documentElement.clientWidth;

      // vw / 2 is the rightmost location
      // since each mushroom is 18% vw apart, vw*0.18
      // and the additional 50 is really just to offset to right
      let dMush = vw * 0.18 >= 100 ? 100 : vw * 0.18;

      return vw / 2 - dMush * (6 - p);
      // return -150 + (p - 1) * 80;
    }

    const decks = [
      [[19], [23], [91], [3]],
      [[19, 20], [23], [91], [3]],
      [[19, 20], [23, 24], [91], [3]],
      [[19, 20, 21], [23, 24], [91], [3]],
      [[19, 20, 21, 22], [23, 24], [91], [3]],
      [[19, 20, 21, 22], [23, 24, 25], [91], [3]],
      [[19, 20, 21, 22], [23, 24, 25], [91, 95], [3]],
      [[19, 20, 21, 22], [23, 24, 25], [91, 95, 100], [3]],
    ];
    const moves = [
      ["Player 1", "20", "0", "1"],
      ["Player 2", "24", "1", "1"],
      ["Player 3", "21", "0", "2"],
      ["Player 4", "22", "0", "3"],
      ["Player 5", "25", "1", "2"],
      ["Player 6", "95", "2", "1"],
      ["Player 7", "100", "2", "2"],
    ];
    const [index, setIndex] = useState(0);
    useInterval(() => {
      if (index == decks.length - 1) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    }, 1500);
    return (
      <>
        <Deck data={decks[index]} />
        {index < moves.length ? (
          <>
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
            <div>{moves[index][0]}</div>
          </>
        ) : (
          <div>
            <Spore n={"101"} />
            <div>And so on...</div>
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
    console.log(event.active.id);
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
    console.log("DRAG END");

    if (delta.x == 0 && delta.y == 0) setMush(active.id);

    if (active.id === over.id) {
      setActiveId(-1);
      return;
    }

    if (over.id === "selection") {
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

    //   setGameStates((prevState) => ({
    //     ...prevState,
    //     selected: active.id,
    //     hand: prevState.hand.filter((num) => num !== active.id),
    //   }));

    //   playCard(active.id);
    //   return;
    // }

    setActiveId(-1);
  };

  return page == 1 ? (
    <div className="flex flex-col text-center justify-center items-center h-screen">
      <Modal
        isOpen={mush !== -1}
        onRequestClose={() => setMush(-1)}
        appElement={document.getElementById("root") as HTMLElement}
        style={modalStyle}
      >
        <Mushroom />
      </Modal>

      <p className="w-[90vw] my-10">
        Welcome to Shitake, this game is about growing and eating mushrooms!
      </p>
      <p>Firstly, you have a bunch of spores. (Drag around!)</p>
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
          {activeId !== -1 ? <Numball num={activeId} active={-1} /> : null}
        </DragOverlay>
      </DndContext>
      <p className="mt-5">Each spore grows a mushroom. (Tap on a spore!)</p>
      <p className="mt-5">
        The number on the spore indicates the{" "}
        <span className="font-bold">weight</span> of the mushroom.
      </p>

      <button
        className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
        onClick={() => setPage(2)}
      >
        Next
      </button>
    </div>
  ) : page == 2 ? (
    <div className="flex flex-col text-center justify-center items-center h-screen">
      <Modal
        isOpen={mush !== -1}
        onRequestClose={() => setMush(-1)}
        appElement={document.getElementById("root") as HTMLElement}
        style={modalStyle}
      >
        <Mushroom />
      </Modal>

      <p className="w-[90vw] my-5">
        At every turn, each player must choose a spore and drag a into the{" "}
        {<span className="italic">selection</span>} box which says "Toss a
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
          {activeId !== -1 ? <Numball num={activeId} active={-1} /> : null}
        </DragOverlay>
      </DndContext>

      <p className="w-[90vw] mt-5">
        You may repeatedly change your selection by dragging another spore into
        the box. Once every player has selected a spore, a{" "}
        <span className="font-bold">5-second timer</span> will start.
      </p>

      <p className="w-[90vw] mt-5">
        This is your final 5 seconds to change your selection.
      </p>
      <div className="flex flex-row space-x-4">
        <button
          className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
          onClick={() => setPage(1)}
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
    </div>
  ) : page == 3 ? (
    <div className="flex flex-col text-center justify-center items-center h-screen">
      <Modal
        isOpen={law}
        style={modalStyleLaw}
        onRequestClose={() => setLaw(false)}
        appElement={document.getElementById("root") as HTMLElement}
      >
        <Law />
      </Modal>
      <p className="w-[90vw] my-5">
        Once the timer is up, the spores will fly to the{" "}
        <span className="italic">optimal spot</span> on the 4 logs to grow, one
        by one.
      </p>
      <Deck data={deck} />

      <p className="w-[90vw] my-5">
        The number at the end of the log is the weight of the rightmost mushroom
      </p>
      <p className="w-[90vw] my-5">
        The <span className="italic">optimal spot</span> is determined by the{" "}
        <span className="text-blue-800 underline " onClick={() => setLaw(true)}>
          Law of Mushroom Nature
        </span>
      </p>
      <div className="flex flex-row space-x-4">
        <button
          className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
          onClick={() => setPage(2)}
        >
          Back
        </button>
        <button
          className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
          onClick={() => setPage(4)}
        >
          Next
        </button>
      </div>
    </div>
  ) : page == 4 ? (
    <div className="flex flex-col text-center justify-center items-center h-screen">
      <Modal
        isOpen={law}
        style={modalStyleLaw}
        onRequestClose={() => setLaw(false)}
        appElement={document.getElementById("root") as HTMLElement}
      >
        <Law />
      </Modal>
      <p className="w-[90vw] mt-[5rem]">
        The spore with the smallest number will grow first, since it is the
        lightest
      </p>
      <ChangingDeck />

      <p className="w-[90vw] my-5">
        Followed by the spore with the next smallest number, one by one.
      </p>
      <p className="w-[90vw] my-2">
        The <span className="italic">optimal spot</span> is determined by the{" "}
        <span className="text-blue-800 underline " onClick={() => setLaw(true)}>
          Law of Mushroom Nature
        </span>
      </p>
      <div className="flex flex-row space-x-4">
        <button
          className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
          onClick={() => setPage(3)}
        >
          Back
        </button>
        <button
          className="mt-10 border-2 border-black px-8 py-2 rounded-xl shadow-lg"
          onClick={() => setPage(5)}
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <div>Last Page</div>
  );
};

export default Tutorial;
