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
import Spore from "../components/Spore";

import { CSS } from "@dnd-kit/utilities";

import {
  useSortable,
  SortableContext,
  // horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

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

const Test = () => {
  const [mush, setMush] = useState(-1);
  const hand = [1, 2, 3, 4, 5, 6];
  // const showMush = mush == -1 ? false : true;
  // const [showMush, setShowMush] = useState(false);
  const [activeId, setActiveId] = useState(-1);
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

    // if (delta.x == 0 && delta.y == 0) setMush(active.id);

    if (active.id === over.id) {
      console.log("active");
      console.log(active.id);
      console.log("over");
      console.log(over.id);
      setActiveId(-1);
      console.log("Dog");
      return;
    }

    // if (over.id === "selection") {
    //   if (selected !== -1) {
    //     const selPos = hand.indexOf(active.id);
    //     setGameStates((prevState) => ({
    //       ...prevState,
    //       hand: [
    //         ...prevState.hand.slice(0, selPos),
    //         selected,
    //         ...prevState.hand.slice(selPos),
    //       ],
    //     }));
    //   }

    //   setGameStates((prevState) => ({
    //     ...prevState,
    //     selected: active.id,
    //     hand: prevState.hand.filter((num) => num !== active.id),
    //   }));

    //   playCard(active.id);
    //   return;
    // }

    // setGameStates((prevState) => ({
    //   ...prevState,
    //   hand: arrayMove(
    //     prevState.hand,
    //     prevState.hand.indexOf(active.id),
    //     prevState.hand.indexOf(over.id)
    //   ),
    // }));

    // setActiveId(-1);
  };

  // const handleDragOver = (event: any) => {
  //   const { active, over } = event;
  //   if (over != null) {
  //     if (over.id === "selection") {
  //       // console.log("Selected " + active.id);
  //     }
  //   }
  // };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    // console.log(activeId);
    // console.log("DRAG START");
  };

  return (
    <div className="py-40">
      Ok so this is working
      {/* <button>debug</button> */}
      <DndContext
        sensors={sensors}
        // collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // onDragOver={handleDragOver}
      >
        <NumRow numballs={hand} active={activeId} />
        <DragOverlay>
          {/* bypass the opacity  */}
          {activeId !== -1 ? <Numball num={activeId} active={-1} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Test;
