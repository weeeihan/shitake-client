import React, { useState } from "react";
import { useCountdown } from "../utils/utils";

type Props = {
  onCountdownEnd: () => void;
};

const Countdown = ({ onCountdownEnd }: Props) => {
  let countdown = useCountdown(3, onCountdownEnd);

  return (
    <>
      <div>Revealling in...</div>
      <div>{countdown}</div>
      <button> Reset Timer</button>
    </>
  );
};

export default Countdown;
