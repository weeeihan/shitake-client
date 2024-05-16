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
  const { setNodeRef } = useDroppable({
    id: "selection",
  });
  return (
    <div ref={setNodeRef} className="w-[25rem] h-[10rem] border">
      Selection
      <div className="text-8xl">{selected}</div>
    </div>
  );
};

const NumRow = ({
  numballs,
  activeId,
}: {
  numballs: number[];
  activeId: number;
}) => {
  return (
    <div className="flex flex-row w-screen  h-[5rem] mt-10 overflow-x-scroll scrollbar">
      <SortableContext
        items={numballs}
        strategy={horizontalListSortingStrategy}
      >
        {numballs.map((num: number, index: number) => (
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
  const [selected, setSelected] = useState<number>(-1);
  const { conn } = useContext(WebsocketContext);
  const { player, State } = useContext(GamestateContext);
  const [hand, setHand] = useState<number[]>(player.hand);

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
        setHand((hand) => [
          ...hand.slice(0, selPos),
          selected,
          ...hand.slice(selPos),
        ]);
      }

      setHand((hand) => hand.filter((num) => num !== active.id));
      setSelected(active.id);

      playCard(active.id);
      return;
    }

    setHand((hand) => {
      console.log("Not");
      const originalPos = hand.indexOf(active.id);
      const newPos = hand.indexOf(over.id);
      return arrayMove(hand, originalPos, newPos);
    });

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
        <NumRow numballs={hand} activeId={activeId} />
        <DragOverlay>
          {activeId !== -1 ? <Numball num={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default Hand;
