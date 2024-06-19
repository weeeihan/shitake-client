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
import { actions } from "../utils/utils";
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
    gameConstants: { Mushrooms },
  } = useContext(GamestateContext);
  const { setNodeRef } = useDroppable({
    id: "selection",
  });
  if (selected == -1) {
    return (
      <div
        ref={setNodeRef}
        className="w-[25rem] h-[10rem] border flex flex-col justify-center"
      >
        <div className="align-left ">Toss a spore!</div>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      className="w-[25rem] h-[10rem] border overflow-y-scroll "
    >
      <div className="text-4xl">{selected}</div>
      <div>{Mushrooms[selected].name}</div>
      <div>{Mushrooms[selected].desc}</div>
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
      console.log("active");
      console.log(active.id);
      console.log("over");
      console.log(over.id);
      setActiveId(-1);
      console.log("Dog");
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
