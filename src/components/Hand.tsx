import React, { useContext, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCorners,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";

import Modal from "react-modal";
import { GamestateContext } from "../modules/gamestate_provider";
import { actions, coloring, img } from "../utils/utils";
import Spore from "./Spore";
import Mushroom from "./Mushroom";

import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  SortableContext,
  // horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { WebsocketContext } from "../modules/websocket_provider";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "10%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 1000,
  },
};

const Selection = ({ selected }: { selected: number }) => {
  const {
    gameData: { room },
    getMush,
  } = useContext(GamestateContext);

  const { setNodeRef } = useDroppable({
    id: "selection",
  });
  if (selected == -1) {
    return (
      <div
        ref={setNodeRef}
        className="w-11/12 h-3/4 rounded-2xl h-1/2 flex flex-col justify-center items-center shadow-lg"
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
      className="relative w-11/12 h-1/2 rounded-2xl shadow-lg overflow-y-scroll "
      style={{
        backgroundColor: coloring(getMush(selected).color),
      }}
    >
      <div className="absolute left-3 text-4xl">{selected}</div>
      <div className="absolute right-3 text-4xl">{selected}</div>
      <div className="flex flex-col items-center my-1 mx-2">
        <img src={img(getMush(selected).name)} width={80} />
        {/* <div className="text-4xl">{selected}</div> */}
        <div>
          {getMush(selected).name + " [" + getMush(selected).damage + "]"}
        </div>
        <div>{getMush(selected).desc}</div>
      </div>
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

const Hand = () => {
  const [mush, setMush] = useState(-1);
  const showMush = mush == -1 ? false : true;
  // const [showMush, setShowMush] = useState(false);
  const [activeId, setActiveId] = useState(-1);
  const { conn } = useContext(WebsocketContext);
  const {
    gameConstants: { State },
    gameStates: { hand, selected },
    setGameStates,
  } = useContext(GamestateContext);

  const playCard = (card: number) => {
    // console.log("Played card " + card);
    if (conn != null && card != 0) {
      conn.send(actions(State.PLAY, card));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
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
      if (selected !== -1) {
        const selPos = hand.indexOf(active.id);
        setGameStates((prevState) => ({
          ...prevState,
          hand: [
            ...prevState.hand.slice(0, selPos),
            selected,
            ...prevState.hand.slice(selPos),
          ],
        }));
      }

      setGameStates((prevState) => ({
        ...prevState,
        selected: active.id,
        hand: prevState.hand.filter((num) => num !== active.id),
      }));

      playCard(active.id);
      return;
    }

    setGameStates((prevState) => ({
      ...prevState,
      hand: arrayMove(
        prevState.hand,
        prevState.hand.indexOf(active.id),
        prevState.hand.indexOf(over.id)
      ),
    }));

    setActiveId(-1);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (over != null) {
      if (over.id === "selection") {
        // console.log("Selected " + active.id);
      }
    }
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    // console.log(activeId);
    // console.log("DRAG START");
  };

  return (
    <>
      <Modal
        isOpen={mush > 0}
        appElement={document.getElementById("root") as HTMLElement}
        style={modalStyle}
      >
        <Mushroom mush={mush} setMush={setMush} />
      </Modal>
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
          {/* bypass the opacity  */}
          {activeId !== -1 ? <Numball num={activeId} active={-1} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default Hand;
