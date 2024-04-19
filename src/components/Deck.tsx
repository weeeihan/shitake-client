import React from "react";
import * as images from "../assets/images/images";

type Props = {
  data: number[][];
  isChooser: boolean;
  chooseRow: (row: number) => void;
};

const Deck = ({ data, isChooser, chooseRow }: Props) => {
  const chooseRowHandler = (e: React.SyntheticEvent, row: number) => {
    e.preventDefault;
    chooseRow(row);
  };
  return (
    <>
      {isChooser ? (
        <div>Chooser Stuff</div>
      ) : (
        <div>
          <div className="grid gap-4 ">
            {data != null &&
              data.map((row: number[], rowNumber: number) => (
                <div key={rowNumber} className="flex my-[1rem]">
                  {row.map((card: number, cardNumber: number) => (
                    <div key={cardNumber} className="relative">
                      <img src={images.hLog} alt="Horizontal Log" width={80} />
                      <img
                        className="absolute z-10"
                        src={images.mush2}
                        alt="Mushroom"
                        width={50}
                        style={{ marginTop: -70 }}
                      />
                    </div>
                  ))}
                  <div className="ml-1">{row[row.length - 1]}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Deck;
