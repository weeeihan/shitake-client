import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

const Hand = (props: any) => {
  const [data, playCard] = [props.data, props.playCard];
  const playCardHandler = (e: React.SyntheticEvent, card: number) => {
    e.preventDefault;
    playCard(card);
  };
  return (
    <div className="m-4">
      {data != null &&
        data.map((card: number, index: number) => (
          <button
            onClick={(e) => {
              playCardHandler(e, card);
            }}
            key={index}
            className="m-3"
          >
            {card}
          </button>
        ))}
    </div>
    // <>

    //   {data.map((player: string, index: number) => (
    //     <div className="grid gap-0.5">
    //       <h2 className key={index}>{player}</h2>
    //     </div>
    //   ))}
    // </>
  );
};

export default Hand;
