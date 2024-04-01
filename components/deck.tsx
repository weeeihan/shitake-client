import React from "react";
import { Button } from "./ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

type Props = {
  data: number[][];
  isChooser: boolean;
  chooseRow: (row: number) => void;
};

const Deck = (props: Props) => {
  const [data, isChooser, chooseRow] = [
    props.data,
    props.isChooser,
    props.chooseRow,
  ];
  const chooseRowHandler = (e: React.SyntheticEvent, row: number) => {
    e.preventDefault;
    chooseRow(row);
  };
  return (
    <div className="grid gap-4 ">
      {data != null &&
        data.map((row: number[], rowNumber: number) => (
          <div key={rowNumber}>
            {row.map((card: number, cardNumber: number) => (
              <span key={cardNumber}>
                {isChooser ? (
                  <Button
                    className="m-5"
                    onClick={(e) => {
                      chooseRowHandler(e, rowNumber);
                    }}
                  >
                    {card}
                  </Button>
                ) : (
                  <span className="m-5">{card}</span>
                )}
              </span>
            ))}
          </div>
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

export default Deck;
