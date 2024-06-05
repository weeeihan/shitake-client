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

import { GamestateContext } from "../modules/gamestate_provider";
import { actions } from "../utils/utils";

import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { WebsocketContext } from "../modules/websocket_provider";

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

const NumRow = ({ numballs }: { numballs: number[] }) => {
  return (
    <div className="flex flex-row w-screen  h-[5rem] mt-10 overflow-x-scroll scrollbar">
      <SortableContext
        items={numballs}
        strategy={horizontalListSortingStrategy}
      >
        {numballs.map((num: number) => (
          <Numball key={num} num={num} />
        ))}
      </SortableContext>
    </div>
  );
};

const Numball = ({ num }: { num: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: num });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" touch-none mx-5 w-11 h-11 shrink-0 grow-0 rounded-full bg-slate-300 "
      {...listeners}
      {...attributes}
    >
      {num}
    </div>
  );
};

const Hand = () => {
  const [activeId, setActiveId] = useState(-1);
  const { conn } = useContext(WebsocketContext);
  const {
    gameConstants: { State },
    gameStates: { hand, selected },
    setGameStates,
  } = useContext(GamestateContext);

  const playCard = (card: number) => {
    console.log("Played card " + card);
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
    const { active, over } = event;
    console.log("DRAG END");

    if (active.id === over.id) return;

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
        console.log("Selected " + active.id);
      }
    }
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    console.log("DRAG START");
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        // collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <Selection selected={selected} />
        <NumRow numballs={hand} />
        <DragOverlay>
          {activeId !== -1 ? <Numball num={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default Hand;
